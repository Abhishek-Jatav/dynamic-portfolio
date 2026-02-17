"use client";

import { useState } from "react";
import { submitContact } from "../../lib/api/contact/submitContact";

export default function SubmitContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      await submitContact(form);
      setSuccess("Message submitted successfully! ✅");
      setForm({ name: "", email: "", phone: "", message: "" });
    } catch (err: any) {
      alert(err.message);
    }

    setLoading(false);
  }

  return (
    <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-xl border p-6 sm:p-10 transition-all duration-300 hover:shadow-2xl">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name + Email Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
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
          <label className="block text-sm font-medium mb-2">
            Message <span className="text-red-500">*</span>
          </label>
          <textarea
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            required
            rows={5}
            className="w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 dark:focus:ring-indigo-800 transition"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full sm:w-auto sm:px-10 rounded-xl bg-indigo-600 text-white py-3 font-semibold hover:bg-indigo-500 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed">
          {loading ? "Sending..." : "Send Message"}
        </button>

        {/* Success Message */}
        {success && (
          <div className="text-green-600 text-sm bg-green-50 dark:bg-green-900/30 p-3 rounded-lg">
            {success}
          </div>
        )}
      </form>
    </div>
  );
}

/* Reusable Input Component */
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
    <div>
      <label className="block text-sm font-medium mb-2">
        {label} <span className="text-red-500">*</span>
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required
        className="w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 dark:focus:ring-indigo-800 transition"
      />
    </div>
  );
}
