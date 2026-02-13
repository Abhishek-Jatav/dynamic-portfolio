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
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
      <input
        placeholder="Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        className="border p-2 w-full"
        required
      />

      <input
        placeholder="Email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        className="border p-2 w-full"
        required
      />

      <input
        placeholder="Phone"
        value={form.phone}
        onChange={(e) => setForm({ ...form, phone: e.target.value })}
        className="border p-2 w-full"
        required
      />

      <textarea
        placeholder="Message"
        value={form.message}
        onChange={(e) => setForm({ ...form, message: e.target.value })}
        className="border p-2 w-full"
        required
      />

      <button
        type="submit"
        disabled={loading}
        className="bg-black text-white px-4 py-2">
        {loading ? "Sending..." : "Send"}
      </button>

      {success && <p className="text-green-600">{success}</p>}
    </form>
  );
}
