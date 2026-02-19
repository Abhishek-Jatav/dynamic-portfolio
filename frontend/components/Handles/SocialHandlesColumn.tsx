"use client";

import LinkedInButton from "./LinkedIn";
import InstagramButton from "./Instagram";

export default function SocialHandlesColumn() {
  return (
    <div className="h-full w-full overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.35)] p-6 sm:p-7 transition-all duration-300 hover:-translate-y-1 hover:bg-white/[0.07]">
      <div className="flex items-start justify-between gap-4 min-w-0">
        <div className="min-w-0">
          <h2 className="text-xl sm:text-2xl font-semibold text-white tracking-tight">
            Social
          </h2>
          <p className="text-sm text-white/60 mt-1 truncate">
            Find me everywhere
          </p>
        </div>

        <div className="shrink-0 px-3 py-1 rounded-full bg-white/10 text-xs text-white/70 border border-white/10">
          Links
        </div>
      </div>

      {/* stacked always (prevents overlap) */}
      <div className="mt-7 flex flex-col gap-4">
        <LinkedInButton />
        <InstagramButton />
      </div>
    </div>
  );
}
