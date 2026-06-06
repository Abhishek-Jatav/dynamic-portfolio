"use client";

import { useState } from "react";
import { submitContact } from "../../lib/api/contact/submitContact";
import toast from "react-hot-toast";
import { Mail, User, Phone, MessageSquare, Send } from "lucide-react";

export default function SubmitContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      await submitContact(form);

      toast.success("Message sent! I'll get back to you soon 🎉");
      setForm({ name: "", email: "", phone: "", message: "" });
    } catch (err: any) {
      toast.error(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="glass-card rounded-3xl p-8 sm:p-10 lg:p-12"
      style={{ background: "var(--bg-card)" }}
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name + Email row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <PremiumInputField
            label="Name"
            type="text"
            value={form.name}
            onChange={(val) => setForm({ ...form, name: val })}
            icon={<User size={15} />}
            placeholder="Your full name"
          />
          <PremiumInputField
            label="Email"
            type="email"
            value={form.email}
            onChange={(val) => setForm({ ...form, email: val })}
            icon={<Mail size={15} />}
            placeholder="you@example.com"
          />
        </div>

        {/* Phone */}
        <PremiumInputField
          label="Phone"
          type="text"
          value={form.phone}
          onChange={(val) => setForm({ ...form, phone: val })}
          icon={<Phone size={15} />}
          placeholder="+91 00000 00000"
        />

        {/* Message */}
        <div className="space-y-2">
          <label
            className="flex items-center gap-2 text-sm font-medium"
            style={{ color: "var(--text-secondary)", fontFamily: "var(--font-body)" }}
          >
            <span style={{ color: "var(--accent)" }}>
              <MessageSquare size={15} />
            </span>
            Message <span className="text-red-500">*</span>
          </label>

          <textarea
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            required
            rows={6}
            placeholder="Tell me about your project or idea..."
            className="premium-input resize-none"
            style={{ lineHeight: 1.7 }}
          />
        </div>

        {/* Submit */}
        <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
          <button
            type="submit"
            disabled={loading}
            className="btn-primary flex items-center gap-2 w-full sm:w-auto justify-center"
            style={{ opacity: loading ? 0.65 : 1, cursor: loading ? "not-allowed" : "pointer" }}
          >
            {loading ? (
              <>
                <span
                  className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"
                />
                Sending...
              </>
            ) : (
              <>
                <Send size={15} />
                Send Message
              </>
            )}
          </button>

          <p
            className="text-xs text-center sm:text-left"
            style={{ color: "var(--text-muted)" }}
          >
            I'll respond within 24–48 hours.
          </p>
        </div>
      </form>
    </div>
  );
}

function PremiumInputField({
  label,
  type,
  value,
  onChange,
  icon,
  placeholder,
}: {
  label: string;
  type: string;
  value: string;
  onChange: (val: string) => void;
  icon?: React.ReactNode;
  placeholder?: string;
}) {
  return (
    <div className="space-y-2">
      <label
        className="flex items-center gap-2 text-sm font-medium"
        style={{ color: "var(--text-secondary)", fontFamily: "var(--font-body)" }}
      >
        {icon && <span style={{ color: "var(--accent)" }}>{icon}</span>}
        {label} <span className="text-red-500">*</span>
      </label>

      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required
        placeholder={placeholder}
        className="premium-input"
      />
    </div>
  );
}
