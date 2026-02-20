"use client";

import type { Folder } from "../../lib/types/project";

type Props = {
  folders: Folder[];
  level?: number;
};

export default function ProjectStructureTree({ folders, level = 0 }: Props) {
  return (
    <ul className="space-y-1">
      {folders.map((folder, index) => (
        <li key={index}>
          <div
            className="flex items-center gap-2 text-sm"
            style={{ paddingLeft: `${level * 16}px` }}>
            <span className="text-yellow-500">📁</span>
            <span className="text-gray-800 dark:text-gray-200">
              {folder.name}
            </span>
          </div>

          {/* Files */}
          {folder.files?.map((file, i) => (
            <div
              key={i}
              className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400"
              style={{ paddingLeft: `${(level + 1) * 16}px` }}>
              📄 {file}
            </div>
          ))}

          {/* Subfolders (Recursive) */}
          {folder.subFolders && folder.subFolders.length > 0 && (
            <ProjectStructureTree
              folders={folder.subFolders}
              level={level + 1}
            />
          )}
        </li>
      ))}
    </ul>
  );
}
