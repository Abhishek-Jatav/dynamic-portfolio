"use client";

import LinkedInButton from "./LinkedIn";
import InstagramButton from "./Instagram";

export default function SocialHandlesColumn() {
  return (
    <div className="p-6 border rounded-2xl shadow-lg bg-white dark:bg-gray-900">
      <h2 className="text-2xl font-bold text-center mb-6">Social Handles</h2>

      <div className="flex justify-center items-center gap-6">
        <LinkedInButton />
        <InstagramButton />
      </div>
    </div>
  );
}
