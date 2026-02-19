"use client";

import type { Folder } from "@/lib/types/project";

type Props = {
  value: Folder[];
  onChange: (folders: Folder[]) => void;
};

export default function FolderBuilder({ value, onChange }: Props) {
  const updateRoot = (updated: Folder[]) => {
    onChange([...updated]);
  };

  const createEmptyFolder = (): Folder => ({
    name: "New Folder",
    files: [],
    subFolders: [],
  });

  // 🔥 Recursive Renderer
 const renderFolders = (
   folders: Folder[],
   parentPath: number[] = [],
 ): React.ReactNode => {
   return (
     <div
       className={`space-y-3 ${parentPath.length ? "pl-6 border-l-2 border-gray-300" : ""}`}>
       {folders.map((folder, index) => {
         const currentPath = [...parentPath, index];

         const updateFolderAtPath = (
           path: number[],
           updater: (folder: Folder) => Folder,
         ) => {
           const clone = structuredClone(value);

           let current: any = clone;

           for (let i = 0; i < path.length - 1; i++) {
             current = current[path[i]].subFolders!;
           }

           const lastIndex = path[path.length - 1];
           current[lastIndex] = updater(current[lastIndex]);

           updateRoot(clone);
         };

         const deleteFolderAtPath = (path: number[]) => {
           const clone = structuredClone(value);

           let current: any = clone;

           for (let i = 0; i < path.length - 1; i++) {
             current = current[path[i]].subFolders!;
           }

           const lastIndex = path[path.length - 1];
           current.splice(lastIndex, 1);

           updateRoot(clone);
         };

         return (
           <div
             key={index}
             className="border border-neutral-200 dark:border-neutral-800 rounded-2xl p-4 bg-white dark:bg-neutral-900 shadow-sm">
             {/* Folder Header */}
             <div className="flex items-center gap-3">
               <input
                 value={folder.name}
                 onChange={(e) =>
                   updateFolderAtPath(currentPath, (f) => ({
                     ...f,
                     name: e.target.value,
                   }))
                 }
                 className="flex-1 p-2 rounded-lg bg-neutral-50 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 focus:ring-2 focus:ring-indigo-500 outline-none"
               />

               <button
                 type="button"
                 onClick={() =>
                   updateFolderAtPath(currentPath, (f) => ({
                     ...f,
                     subFolders: [...(f.subFolders || []), createEmptyFolder()],
                   }))
                 }
                 className="text-sm text-green-600 hover:underline">
                 + Folder
               </button>

               <button
                 type="button"
                 onClick={() =>
                   updateFolderAtPath(currentPath, (f) => ({
                     ...f,
                     files: [...(f.files || []), "NewFile.ts"],
                   }))
                 }
                 className="text-sm text-blue-600 hover:underline">
                 + File
               </button>

               <button
                 type="button"
                 onClick={() => deleteFolderAtPath(currentPath)}
                 className="text-sm text-red-500 hover:underline">
                 Delete
               </button>
             </div>

             {/* Files */}
             {folder.files && folder.files.length > 0 && (
               <div className="mt-3 space-y-2 pl-4">
                 {folder.files.map((file, fileIndex) => (
                   <div
                     key={fileIndex}
                     className="flex items-center gap-3 bg-neutral-100 dark:bg-neutral-800 p-2 rounded-lg">
                     <input
                       value={file}
                       onChange={(e) =>
                         updateFolderAtPath(currentPath, (f) => {
                           const updatedFiles = [...(f.files || [])];
                           updatedFiles[fileIndex] = e.target.value;
                           return { ...f, files: updatedFiles };
                         })
                       }
                       className="flex-1 p-2 rounded-lg bg-neutral-50 dark:bg-neutral-700 border border-neutral-300 dark:border-neutral-600 focus:ring-2 focus:ring-indigo-500 outline-none"
                     />

                     <button
                       type="button"
                       onClick={() =>
                         updateFolderAtPath(currentPath, (f) => ({
                           ...f,
                           files: (f.files || []).filter(
                             (_, i) => i !== fileIndex,
                           ),
                         }))
                       }
                       className="text-sm text-red-500 hover:underline">
                       Delete
                     </button>
                   </div>
                 ))}
               </div>
             )}

             {/* Subfolders (Recursive) */}
             {folder.subFolders && folder.subFolders.length > 0 && (
               <div className="mt-4">
                 {renderFolders(folder.subFolders, currentPath)}
               </div>
             )}
           </div>
         );
       })}
     </div>
   );
 };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h4 className="font-semibold text-lg">Folder Structure</h4>
        <button
          type="button"
          onClick={() => updateRoot([...value, createEmptyFolder()])}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm hover:bg-indigo-700 transition">
          + Add Root Folder
        </button>
      </div>

      {renderFolders(value)}
    </div>
  );
}
