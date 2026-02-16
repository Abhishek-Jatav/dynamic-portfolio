"use client";

import { useState } from "react";

type Props = {
  onSearchById: (id: string) => void;
  onSearchByName: (name: string) => void;
};

export default function ProjectSearch({ onSearchById, onSearchByName }: Props) {
  const [id, setId] = useState("");
  const [name, setName] = useState("");

  return (
    <div className="bg-white shadow rounded p-6 space-y-4">
      <h2 className="text-xl font-semibold">Search Project</h2>

      <div className="flex gap-3">
        <input
          type="text"
          placeholder="Search by ID"
          value={id}
          onChange={(e) => setId(e.target.value)}
          className="border p-2 rounded w-full"
        />
        <button
          onClick={() => onSearchById(id)}
          className="bg-blue-600 text-white px-4 rounded">
          Search
        </button>
      </div>

      <div className="flex gap-3">
        <input
          type="text"
          placeholder="Search by Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 rounded w-full"
        />
        <button
          onClick={() => onSearchByName(name)}
          className="bg-green-600 text-white px-4 rounded">
          Search
        </button>
      </div>
    </div>
  );
}
