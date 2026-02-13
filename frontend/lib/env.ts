const isDev = process.env.NODE_ENV === "development";

export const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL ||
  (isDev ? process.env.BACKEND_URL : process.env.PROD_BACKEND_URL);

export const FRONTEND_URL =
  process.env.NEXT_PUBLIC_FRONTEND_URL ||
  (isDev ? process.env.FRONTEND_URL : process.env.PROD_FRONTEND_URL);
