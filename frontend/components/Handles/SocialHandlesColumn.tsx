"use client";

import LinkedInButton from "./LinkedIn";
import InstagramButton from "./Instagram";

export default function SocialHandlesColumn() {
  return (
    <div className="p-6 rounded-2xl shadow-lg border bg-white dark:bg-gray-900 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col justify-between">
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-center">
          Social Handles
        </h2>

        <div className="flex justify-center items-center gap-6 mt-8 flex-wrap">
          <LinkedInButton />
          <InstagramButton />
        </div>
      </div>
    </div>
  );
}
