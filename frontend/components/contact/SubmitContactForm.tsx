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
      setSuccess("Message submitted successfully!");
      setForm({ name: "", email: "", phone: "", message: "" });
    } catch (err: any) {
      alert(err.message);
    }

    setLoading(false);
  }

  return (
    <div className="w-full">
      <div className="w-full bg-indigo-50 rounded-lg shadow-lg flex flex-col justify-between p-6">
        <form onSubmit={handleSubmit} className="text-indigo-500">
          <fieldset className="border-4 border-dotted border-indigo-500 p-6 rounded-lg">
            <legend className="px-2 italic -mx-2">Contact Me</legend>

            {/* Name */}
            <label className="text-xs font-bold after:content-['*'] after:text-red-400">
              Name
            </label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
              className="w-full rounded-md border border-gray-400 bg-white px-3 py-2 mb-3 mt-1 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition"
            />

            {/* Email */}
            <label className="text-xs font-bold after:content-['*'] after:text-red-400">
              Email
            </label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
              className="w-full rounded-md border border-gray-400 bg-white px-3 py-2 mb-3 mt-1 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition"
            />

            {/* Phone */}
            <label className="text-xs font-bold after:content-['*'] after:text-red-400">
              Phone
            </label>
            <input
              type="text"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              required
              className="w-full rounded-md border border-gray-400 bg-white px-3 py-2 mb-3 mt-1 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition"
            />

            {/* Message */}
            <label className="text-xs font-bold after:content-['*'] after:text-red-400">
              Message
            </label>
            <textarea
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              required
              rows={5}
              className="w-full rounded-md border border-gray-400 bg-white px-3 py-2 mb-4 mt-1 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition"
            />

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded bg-indigo-500 text-indigo-50 p-3 font-bold hover:bg-indigo-400 transition">
              {loading ? "Sending..." : "Send Message"}
            </button>

            {/* Success Message */}
            {success && (
              <p className="text-green-600 text-xs mt-3">{success}</p>
            )}
          </fieldset>
        </form>
      </div>
    </div>
  );
}
