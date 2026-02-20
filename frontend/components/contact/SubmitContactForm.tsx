"use client";

import { useState } from "react";
import { submitContact } from "../../lib/api/contact/submitContact";
import toast from "react-hot-toast";

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

      toast.success("Message submitted successfully! 🎉", {
        style: {
          background: "#16a34a",
          color: "#fff",
        },
      });

      setForm({ name: "", email: "", phone: "", message: "" });
    } catch (err: any) {
      toast.error(err.message || "Something went wrong ❌", {
        style: {
          background: "#dc2626",
          color: "#fff",
        },
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative backdrop-blur-xl bg-white/70 dark:bg-gray-900/70 border border-white/20 dark:border-gray-700 rounded-3xl shadow-2xl p-6 sm:p-10 lg:p-14 transition-all duration-500 hover:shadow-indigo-500/20">
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Name + Email */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField
            label="Name"
            type="text"
            value={form.name}
            onChange={(val: string) => setForm({ ...form, name: val })}
          />

          <InputField
            label="Email"
            type="email"
            value={form.email}
            onChange={(val: string) => setForm({ ...form, email: val })}
          />
        </div>

        {/* Phone */}
        <InputField
          label="Phone"
          type="text"
          value={form.phone}
          onChange={(val: string) => setForm({ ...form, phone: val })}
        />

        {/* Message */}
        <div>
          <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
            Message <span className="text-red-500">*</span>
          </label>

          <textarea
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            required
            rows={6}
            className="w-full rounded-2xl border border-gray-300 dark:border-gray-700 bg-white/60 dark:bg-gray-800/60 px-4 py-4 text-sm sm:text-base outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20 dark:focus:ring-indigo-500/30 transition-all duration-300"
          />
        </div>

        {/* Button */}
        <div className="flex justify-center md:justify-start">
          <button
            type="submit"
            disabled={loading}
            className="relative inline-flex items-center justify-center px-8 py-3 sm:px-10 sm:py-4 rounded-2xl font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-60 disabled:cursor-not-allowed w-full md:w-auto">
            {loading ? "Sending..." : "Send Message"}
          </button>
        </div>
      </form>
    </div>
  );
}

/* Premium Input Component */
function InputField({
  label,
  type,
  value,
  onChange,
}: {
  label: string;
  type: string;
  value: string;
  onChange: (val: string) => void;
}) {
  return (
    <div className="group">
      <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
        {label} <span className="text-red-500">*</span>
      </label>

      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required
        className="w-full rounded-2xl border border-gray-300 dark:border-gray-700 bg-white/60 dark:bg-gray-800/60 px-4 py-3 sm:py-4 text-sm sm:text-base outline-none transition-all duration-300 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20 dark:focus:ring-indigo-500/30 group-hover:shadow-md"
      />
    </div>
  );
}
