import { BACKEND_URL } from "../../env";
import { CreateContactDto } from "../../types/contact";

export async function submitContact(data: CreateContactDto) {
  const res = await fetch(`${BACKEND_URL}/contact`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Failed to submit message");
  }

  return res.json();
}
