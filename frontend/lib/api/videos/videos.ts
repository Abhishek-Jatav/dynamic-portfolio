import { BACKEND_URL } from "../../env";
import { Video, CreateVideoPayload } from "../../types/video";

const BASE_URL = `${BACKEND_URL}/videos`;

async function handleResponse(res: Response) {
  const data = await res.json().catch(() => null);

  if (!res.ok) {
    throw new Error(data?.message || "Something went wrong");
  }

  return data;
}

// GET ALL
export async function getAllVideos(): Promise<Video[]> {
  const res = await fetch(BASE_URL, {
    credentials: "include",
  });
  return handleResponse(res);
}

// ✅ GET FEATURED VIDEO (HOME)
export async function getFeaturedVideo(): Promise<Video> {
  const res = await fetch(`${BASE_URL}/featured/home`, {
    credentials: "include",
  });
  return handleResponse(res);
}

// GET ONE
export async function getVideoById(id: string): Promise<Video> {
  const res = await fetch(`${BASE_URL}/${id}`, {
    credentials: "include",
  });
  return handleResponse(res);
}

// CREATE
export async function createVideo(payload: CreateVideoPayload): Promise<Video> {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    credentials: "include",
  });
  return handleResponse(res);
}

// DELETE
export async function deleteVideo(id: string): Promise<void> {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
    credentials: "include",
  });
  await handleResponse(res);
}
