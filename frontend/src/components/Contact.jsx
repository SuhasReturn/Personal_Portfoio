import React, { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Send, Mail, Github, Linkedin, Twitter, Loader2 } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";

const BACKEND = process.env.REACT_APP_BACKEND_URL;

const schema = z.object({
  name: z.string().min(2, "Name is too short").max(120),
  email: z.string().email("Enter a valid email"),
  subject: z.string().min(2, "Subject required").max(200),
  message: z.string().min(10, "Message needs a little more").max(4000),
});

export default function Contact() {
  const [submitting, setSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    mode: "onBlur",
  });

  const onSubmit = async (data) => {
    setSubmitting(true);
    try {
      const res = await axios.post(`${BACKEND}/api/contact`, data);
      toast.success(res.data.message || "Message sent!", {
        description: "I'll get back to you shortly.",
      });
      reset();
    } catch (e) {
      const msg =
        e?.response?.data?.detail?.[0]?.msg ||
        e?.response?.data?.detail ||
        "Something broke. Try again in a moment.";
      toast.error("Failed to send", { description: String(msg) });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      data-testid="contact-section"
      className="relative w-full px-6 md:px-16 py-32"
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10">
        <div className="md:col-span-5">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <p className="font-mono text-xs uppercase tracking-[0.4em] text-[#FF00FF] mb-4">
              /03 — Get In Touch
            </p>
            <h2 className="font-display text-5xl md:text-6xl font-black tracking-tighter mb-6 leading-[0.95]">
              Let&apos;s build<br />
              <span className="text-[#39FF14]">something</span>
              <br />
              <span className="text-white/40">unreasonable.</span>
            </h2>
            <p className="text-white/60 leading-relaxed mb-8">
              Working on a product that needs an obsessive collaborator? I&apos;m open
              to freelance, full-time, and mad-scientist experiments.
            </p>

            <div className="space-y-3">
              <ContactLine
                icon={Mail}
                href="mailto:suhaskattimanisk@gmail.com"
                label="suhaskattimanisk@gmail.com"
                testId="contact-email"
              />
              <ContactLine
                icon={Github}
                href="https://github.com/SuhasReturn"
                label="github.com/SuhasReturn"
                testId="contact-github"
              />
              <ContactLine
                icon={Linkedin}
                href="https://www.linkedin.com/in/suhas-sk/"
                label="linkedin.com/in/suhas-sk"
                testId="contact-linkedin"
              />
              <ContactLine
                icon={Twitter}
                href="https://x.com/SuhasSk256993"
                label="@SuhasSk256993"
                testId="contact-twitter"
              />
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="md:col-span-7 glass rounded-3xl p-8 md:p-10"
        >
          <form
            noValidate
            onSubmit={handleSubmit(onSubmit)}
            data-testid="contact-form"
            className="space-y-6"
          >
            <Field label="Name" error={errors.name?.message}>
              <input
                type="text"
                className="neon-input"
                placeholder="Your name"
                autoComplete="name"
                data-testid="contact-input-name"
                {...register("name")}
              />
            </Field>
            <Field label="Email" error={errors.email?.message}>
              <input
                type="email"
                className="neon-input"
                placeholder="you@domain.com"
                autoComplete="email"
                data-testid="contact-input-email"
                {...register("email")}
              />
            </Field>
            <Field label="Subject" error={errors.subject?.message}>
              <input
                type="text"
                className="neon-input"
                placeholder="What's this about?"
                data-testid="contact-input-subject"
                {...register("subject")}
              />
            </Field>
            <Field label="Message" error={errors.message?.message}>
              <textarea
                rows={5}
                className="neon-input resize-none"
                placeholder="Tell me about the idea, timeline, or just say hi..."
                data-testid="contact-input-message"
                {...register("message")}
              />
            </Field>

            <button
              type="submit"
              disabled={submitting}
              data-testid="contact-submit"
              className="group relative w-full md:w-auto inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#39FF14] text-[#0d0d11] font-mono uppercase tracking-widest text-sm font-bold hover:shadow-[0_0_40px_rgba(57,255,20,0.6)] disabled:opacity-60 disabled:cursor-not-allowed"
              style={{ transition: "box-shadow 0.3s ease, transform 0.2s ease" }}
            >
              {submitting ? (
                <>
                  <Loader2 className="animate-spin" size={16} />
                  Transmitting...
                </>
              ) : (
                <>
                  Send Transmission
                  <Send size={16} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}

function Field({ label, error, children }) {
  return (
    <div>
      <label className="block font-mono text-[10px] uppercase tracking-[0.3em] text-white/50 mb-2">
        {label}
      </label>
      {children}
      {error && (
        <p
          className="mt-2 text-[11px] font-mono text-[#FF00FF]"
          data-testid={`error-${label.toLowerCase()}`}
        >
          {error}
        </p>
      )}
    </div>
  );
}

function ContactLine({ icon: Icon, href, label, testId }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      data-testid={testId}
      className="flex items-center gap-3 text-white/70 hover:text-[#39FF14] transition-colors group"
    >
      <span className="glass w-9 h-9 rounded-full flex items-center justify-center group-hover:border-[#39FF14]/60">
        <Icon size={14} />
      </span>
      <span className="font-mono text-sm">{label}</span>
    </a>
  );
}
