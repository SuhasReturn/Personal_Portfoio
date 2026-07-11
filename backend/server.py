from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
import asyncio
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone

try:
    import resend  # type: ignore
except ImportError:  # pragma: no cover
    resend = None


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / ".env")

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
)
logger = logging.getLogger(__name__)

# MongoDB connection
mongo_url = os.environ["MONGO_URL"]
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ["DB_NAME"]]

# Resend setup
RESEND_API_KEY = os.environ.get("RESEND_API_KEY", "").strip()
SENDER_EMAIL = os.environ.get("SENDER_EMAIL", "onboarding@resend.dev")
OWNER_EMAIL = os.environ.get("OWNER_EMAIL", "suhaskattimanisk@gmail.com")
if RESEND_API_KEY and resend is not None:
    resend.api_key = RESEND_API_KEY

app = FastAPI()
api_router = APIRouter(prefix="/api")


# ---------- Models ----------
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class StatusCheckCreate(BaseModel):
    client_name: str


class ContactCreate(BaseModel):
    name: str = Field(min_length=1, max_length=120)
    email: EmailStr
    subject: str = Field(min_length=1, max_length=200)
    message: str = Field(min_length=1, max_length=4000)


class ContactMessage(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: EmailStr
    subject: str
    message: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    email_sent: bool = False


class Project(BaseModel):
    id: str
    name: str
    description: str
    language: Optional[str] = None
    html_url: str
    homepage: Optional[str] = None
    stars: int = 0
    tags: List[str] = []
    accent: str = "primary"  # primary=green, accent=pink, secondary=purple


# ---------- Curated project data (based on SuhasReturn GitHub) ----------
PROJECTS_DATA: List[Project] = [
    Project(
        id="flowcell",
        name="FlowCell",
        description="A modern TypeScript-powered visual flow orchestration tool for building and testing interconnected data pipelines with real-time execution and inspection.",
        language="TypeScript",
        html_url="https://github.com/SuhasReturn/FlowCell",
        homepage="https://flow-cell.vercel.app",
        stars=1,
        tags=["TypeScript", "React", "Automation"],
        accent="primary",
    ),
    Project(
        id="moneymap",
        name="MoneyMap",
        description="Personal finance visualization app that maps spending patterns across categories with interactive charts and smart budgeting insights.",
        language="JavaScript",
        html_url="https://github.com/SuhasReturn/MoneyMap",
        homepage="https://money-map-six-mauve.vercel.app",
        stars=1,
        tags=["JavaScript", "Finance", "Dashboard"],
        accent="accent",
    ),
    Project(
        id="fakeimage",
        name="Fake Image Detection",
        description="MATLAB research project detecting AI-generated and manipulated imagery using frequency-domain analysis and forensic pixel signatures.",
        language="MATLAB",
        html_url="https://github.com/SuhasReturn/Fake-Image-Detection",
        stars=1,
        tags=["Research", "Computer Vision", "MATLAB"],
        accent="secondary",
    ),
    Project(
        id="leetcode",
        name="LeetCode Solutions",
        description="Curated archive of algorithmic problem solutions in Java — data structures, dynamic programming, graph theory, and interview-grade patterns.",
        language="Java",
        html_url="https://github.com/SuhasReturn/Leetcode",
        stars=1,
        tags=["Java", "DSA", "Algorithms"],
        accent="primary",
    ),
]


# ---------- Helpers ----------
async def send_notification_email(payload: ContactCreate) -> bool:
    if not RESEND_API_KEY or resend is None:
        return False
    html = f"""
    <div style="font-family:Arial,sans-serif;background:#0d0d11;color:#fff;padding:24px;">
      <h2 style="color:#39FF14;margin:0 0 12px;">New Portfolio Contact</h2>
      <p style="margin:0 0 8px;"><strong>From:</strong> {payload.name} &lt;{payload.email}&gt;</p>
      <p style="margin:0 0 8px;"><strong>Subject:</strong> {payload.subject}</p>
      <hr style="border-color:#7B2CBF;margin:16px 0;" />
      <p style="white-space:pre-wrap;line-height:1.6;">{payload.message}</p>
    </div>
    """
    params = {
        "from": SENDER_EMAIL,
        "to": [OWNER_EMAIL],
        "subject": f"[Portfolio] {payload.subject}",
        "html": html,
        "reply_to": payload.email,
    }
    try:
        await asyncio.to_thread(resend.Emails.send, params)
        return True
    except Exception as e:  # pragma: no cover
        logger.error(f"Resend send failed: {e}")
        return False


# ---------- Routes ----------
@api_router.get("/")
async def root():
    return {"message": "Portfolio API online"}


@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_obj = StatusCheck(**input.model_dump())
    doc = status_obj.model_dump()
    doc["timestamp"] = doc["timestamp"].isoformat()
    await db.status_checks.insert_one(doc)
    return status_obj


@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    for check in status_checks:
        if isinstance(check["timestamp"], str):
            check["timestamp"] = datetime.fromisoformat(check["timestamp"])
    return status_checks


@api_router.get("/projects", response_model=List[Project])
async def list_projects():
    return PROJECTS_DATA


@api_router.post("/contact")
async def submit_contact(payload: ContactCreate):
    # Attempt email send
    sent = await send_notification_email(payload)
    record = ContactMessage(**payload.model_dump(), email_sent=sent)
    doc = record.model_dump()
    doc["timestamp"] = doc["timestamp"].isoformat()
    await db.contact_messages.insert_one(doc)
    return {
        "status": "success",
        "id": record.id,
        "email_delivered": sent,
        "message": "Thanks — your message landed. I'll reply soon.",
    }


@api_router.get("/contact/messages")
async def list_contact_messages():
    msgs = await db.contact_messages.find({}, {"_id": 0}).sort("timestamp", -1).to_list(200)
    return msgs


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get("CORS_ORIGINS", "*").split(","),
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
