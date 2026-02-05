"use client";

import { useEffect, useState } from "react";
import TruckLoader from "./common/TruckLoader";

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
        gap: "16px",
        textAlign: "center",
      }}>
      {/* 1️⃣ Truck Loader */}
      <TruckLoader />

      {/* 2️⃣ Connecting text (text fixed, dots animate) */}
      <div style={{ fontSize: "18px", fontWeight: 500 }}>
        🔌 Connecting to backend
        <span style={{ display: "inline-block", width: "24px" }}>{dots}</span>
      </div>

      {/* 3️⃣ Helper text */}
      <div style={{ fontSize: "14px", opacity: 0.7 }}>
        Backend is on Render so usually it takes 10–15 seconds
      </div>
    </div>
  );
}
