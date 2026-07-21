import React from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";

import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Journey from "@/components/Journey";
import Contact from "@/components/Contact";
import AudioToggle from "@/components/AudioToggle";
import SmoothScroll from "@/components/SmoothScroll";
import Footer from "@/components/Footer";

const Home = () => {
  return (
    <SmoothScroll>
      <div
        id="top"
        className="relative min-h-screen text-white"
        data-testid="portfolio-root"
      >
        <Nav />
        <main className="relative z-10">
          <Hero />
          <About />
          <Projects />
          <Journey />
          <Contact />
        </main>
        <Footer />
        <AudioToggle />
        <div className="grain" aria-hidden />
        <Toaster
          position="top-center"
          theme="dark"
          toastOptions={{
            style: {
              background: "rgba(13,13,17,0.9)",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "#fff",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "13px",
              backdropFilter: "blur(12px)",
            },
          }}
        />
      </div>
    </SmoothScroll>
  );
};

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
