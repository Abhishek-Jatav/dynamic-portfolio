const isDev = process.env.NODE_ENV === "development";

export const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL ||
  (isDev
    ? process.env.NEXT_PUBLIC_LOCAL_BACKEND_URL
    : process.env.NEXT_PUBLIC_PROD_BACKEND_URL);
