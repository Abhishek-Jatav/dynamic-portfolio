"use client";

import { useEffect, useState } from "react";

export default function Connecting() {
  const [dots, setDots] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length < 3 ? prev + "." : ""));
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "18px",
        gap: "10px",
        textAlign: "center",
      }}>
      <div>🔌 Connecting to backend{dots}</div>

      <div style={{ fontSize: "14px", opacity: 0.7 }}>
        Backend is on Render so usually it takes 10–15 seconds
      </div>
    </div>
  );
}
