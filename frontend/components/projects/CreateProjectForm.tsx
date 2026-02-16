"use client";

import { useState } from "react";
import { useAuth } from "@/lib/context/AuthContext";
import { createProject } from "@/lib/api/projects/createProject";
import {
  CreateProjectPayload,
  ProjectFolder,
  ProjectFile,
} from "@/lib/types/project";

type Props = {
  onSuccess?: () => void;
};

export default function CreateProjectForm({ onSuccess }: Props) {
  const { admin } = useAuth();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("active");
  const [folders, setFolders] = useState<ProjectFolder[]>([]);
  const [loading, setLoading] = useState(false);

  if (!admin) return null;

  // =========================
  // Folder Utilities
  // =========================

  const addRootFolder = () => {
    const newFolder: ProjectFolder = {
      name: "New Folder",
      path: `/${Date.now()}`,
      files: [],
      subFolders: [],
    };

    setFolders((prev) => [...prev, newFolder]);
  };

  const updateFolder = (
    updatedFolder: ProjectFolder,
    path: string,
    folderList: ProjectFolder[],
  ): ProjectFolder[] => {
    return folderList.map((folder) => {
      if (folder.path === path) {
        return updatedFolder;
      }

      if (folder.subFolders) {
        return {
          ...folder,
          subFolders: updateFolder(updatedFolder, path, folder.subFolders),
        };
      }

      return folder;
    });
  };

  const addSubFolder = (parentPath: string) => {
    const newSub: ProjectFolder = {
      name: "Sub Folder",
      path: `${parentPath}/${Date.now()}`,
      files: [],
      subFolders: [],
    };

    const update = (list: ProjectFolder[]): ProjectFolder[] =>
      list.map((folder) => {
        if (folder.path === parentPath) {
          return {
            ...folder,
            subFolders: [...(folder.subFolders || []), newSub],
          };
        }

        return {
          ...folder,
          subFolders: folder.subFolders ? update(folder.subFolders) : [],
        };
      });

    setFolders((prev) => update(prev));
  };

  const addFile = (folderPath: string) => {
    const newFile: ProjectFile = {
      name: "NewFile.txt",
      path: `${folderPath}/file-${Date.now()}`,
      type: "text",
    };

    const update = (list: ProjectFolder[]): ProjectFolder[] =>
      list.map((folder) => {
        if (folder.path === folderPath) {
          return {
            ...folder,
            files: [...(folder.files || []), newFile],
          };
        }

        return {
          ...folder,
          subFolders: folder.subFolders ? update(folder.subFolders) : [],
        };
      });

    setFolders((prev) => update(prev));
  };

  // =========================
  // Recursive Folder UI
  // =========================

  const renderFolders = (folderList: ProjectFolder[], level = 0) => {
    return folderList.map((folder) => (
      <div
        key={folder.path}
        className="border p-3 rounded mt-3"
        style={{ marginLeft: level * 20 }}>
        <input
          value={folder.name}
          onChange={(e) =>
            setFolders((prev) =>
              updateFolder(
                { ...folder, name: e.target.value },
                folder.path,
                prev,
              ),
            )
          }
          className="border px-2 py-1 rounded w-full mb-2"
        />

        <div className="flex gap-2 mb-2">
          <button
            onClick={() => addSubFolder(folder.path)}
            className="bg-blue-500 text-white px-2 py-1 rounded text-sm">
            + Subfolder
          </button>

          <button
            onClick={() => addFile(folder.path)}
            className="bg-green-500 text-white px-2 py-1 rounded text-sm">
            + File
          </button>
        </div>

        {/* Files */}
        {folder.files?.map((file) => (
          <div
            key={file.path}
            className="bg-gray-100 px-2 py-1 rounded text-sm mb-1">
            📄 {file.name}
          </div>
        ))}

        {/* Subfolders */}
        {folder.subFolders && renderFolders(folder.subFolders, level + 1)}
      </div>
    ));
  };

  // =========================
  // Submit
  // =========================

  const handleSubmit = async () => {
    setLoading(true);

    try {
      const payload: CreateProjectPayload = {
        id: `proj-${Date.now()}`,
        name,
        description,
        status,
        owner: admin._id,
        folders,
      };

      await createProject(payload);

      setName("");
      setDescription("");
      setFolders([]);

      if (onSuccess) onSuccess();
    } catch (err: any) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border p-6 rounded-lg shadow space-y-4">
      <h2 className="text-xl font-bold">Create Project</h2>

      <input
        placeholder="Project Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border px-3 py-2 rounded w-full"
      />

      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="border px-3 py-2 rounded w-full"
      />

      <button
        onClick={addRootFolder}
        className="bg-purple-600 text-white px-4 py-2 rounded">
        + Add Root Folder
      </button>

      <div>{renderFolders(folders)}</div>

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="bg-black text-white px-6 py-2 rounded w-full">
        {loading ? "Creating..." : "Create Project"}
      </button>
    </div>
  );
}
