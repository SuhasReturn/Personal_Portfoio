import React, { useState } from "react";
import { motion } from "framer-motion";
import { Send, Mail, Github, Linkedin, Twitter, Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function Contact() {
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!formData.name || formData.name.length < 2) errs.name = "Name is too short";
    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      errs.email = "Enter a valid email";
    if (!formData.subject || formData.subject.length < 2) errs.subject = "Subject required";
    if (!formData.message || formData.message.length < 10)
      errs.message = "Message needs a little more";
    return errs;
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (errors[e.target.name]) {
      setErrors((prev) => ({ ...prev, [e.target.name]: undefined }));
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setSubmitting(true);
    // Simulate sending — open mailto as fallback
    try {
      const mailtoLink = `mailto:suhaskattimanisk@gmail.com?subject=${encodeURIComponent(
        formData.subject
      )}&body=${encodeURIComponent(
        `From: ${formData.name} (${formData.email})\n\n${formData.message}`
      )}`;
      window.open(mailtoLink, "_blank");
      toast.success("Thanks — your message landed. I'll reply soon.");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch {
      toast.error("Something broke. Try again in a moment.");
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
            <p className="font-mono text-xs uppercase tracking-[0.4em] text-[#39FF14] mb-4">
              /04 — Get In Touch
            </p>
            <h2 className="font-display text-5xl md:text-6xl font-black tracking-tighter mb-6 leading-[0.95]">
              Let&apos;s build<br />
              <span className="text-white/40">something</span>
              <br />
              <span className="text-[#39FF14]">unreasonable.</span>
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
            onSubmit={onSubmit}
            data-testid="contact-form"
            className="space-y-6"
          >
            <Field label="Name" error={errors.name}>
              <input
                type="text"
                name="name"
                className="neon-input"
                placeholder="Your name"
                autoComplete="name"
                data-testid="contact-input-name"
                value={formData.name}
                onChange={handleChange}
              />
            </Field>
            <Field label="Email" error={errors.email}>
              <input
                type="email"
                name="email"
                className="neon-input"
                placeholder="you@domain.com"
                autoComplete="email"
                data-testid="contact-input-email"
                value={formData.email}
                onChange={handleChange}
              />
            </Field>
            <Field label="Subject" error={errors.subject}>
              <input
                type="text"
                name="subject"
                className="neon-input"
                placeholder="What's this about?"
                data-testid="contact-input-subject"
                value={formData.subject}
                onChange={handleChange}
              />
            </Field>
            <Field label="Message" error={errors.message}>
              <textarea
                rows={5}
                name="message"
                className="neon-input resize-none"
                placeholder="Tell me about the idea, timeline, or just say hi..."
                data-testid="contact-input-message"
                value={formData.message}
                onChange={handleChange}
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
