import { BACKEND_URL } from "../../env";

export type SubmitContactPayload = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

export async function submitContact(payload: SubmitContactPayload) {
  const res = await fetch(`${BACKEND_URL}/contact`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Failed to submit message");
  }

  return res.json();
}
