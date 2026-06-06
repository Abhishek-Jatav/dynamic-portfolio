"use client";

import LinkedInButton from "./LinkedIn";
import InstagramButton from "./Instagram";

export default function SocialHandlesColumn() {
  return (
    <div
      className="h-full w-full glass-card rounded-3xl p-6 sm:p-7 stat-card-border-top"
      style={{ background: "var(--bg-card)" }}
    >
      <div className="flex items-center justify-between mb-7">
        <div>
          <h2
            className="text-lg font-bold"
            style={{ fontFamily: "var(--font-display)", color: "var(--text-primary)" }}
          >
            Social
          </h2>
          <p
            className="text-sm mt-0.5"
            style={{ color: "var(--text-muted)" }}
          >
            Find me everywhere
          </p>
        </div>

        <span
          className="px-3 py-1 rounded-full text-[10px] font-semibold"
          style={{
            background: "var(--accent-glow)",
            border: "1px solid var(--accent)",
            color: "var(--accent)",
            fontFamily: "var(--font-mono)",
          }}
        >
          Links
        </span>
      </div>

      <div className="flex flex-col gap-4">
        <LinkedInButton />
        <InstagramButton />
      </div>
    </div>
  );
}
