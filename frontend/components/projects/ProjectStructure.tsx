"use client";

import { useState } from "react";
import type { Folder } from "@/lib/types/project";

export default function ProjectStructure({ folders }: { folders: Folder[] }) {
  const [open, setOpen] = useState(false);

  if (!folders?.length) return null;

  return (
    <div className="mt-6">
      {/* Trigger */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-4 py-2 text-sm rounded-lg bg-gray-100 dark:bg-gray-800 shadow hover:scale-[1.02] transition">
        📂 Project Structure
        <span className="text-xs">{open ? "▲" : "▼"}</span>
      </button>

      {/* Dropdown */}
      <div
        className={`mt-3 overflow-hidden transition-all duration-300 ${
          open ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        }`}>
        <div className="bg-white dark:bg-black border dark:border-gray-800 rounded-xl shadow-lg p-4 text-sm space-y-1">
          {folders.map((folder, i) => (
            <div key={i}>
              <p className="font-medium">📁 {folder.name}</p>

              {folder.files.map((file, j) => (
                <p key={j} className="pl-4 text-gray-600 dark:text-gray-400">
                  📄 {file}
                </p>
              ))}

              {folder.subFolders.map((sub, k) => (
                <div key={k} className="pl-4">
                  <p className="font-medium">📂 {sub.name}</p>

                  {sub.files.map((sf, s) => (
                    <p
                      key={s}
                      className="pl-4 text-gray-600 dark:text-gray-400">
                      📄 {sf}
                    </p>
                  ))}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
