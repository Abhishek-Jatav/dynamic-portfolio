const isDev = process.env.NODE_ENV === "development";

export const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL ||
  (isDev
    ? "http://localhost:3000"
    : "https://dynamic-portfolio-backend-d6lt.onrender.com");
