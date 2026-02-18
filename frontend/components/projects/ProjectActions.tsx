"use client";

type Props = {
  onEdit: () => void;
  onDeleteById: () => void;
  onDeleteByName: () => void;
};

export default function ProjectActions({
  onEdit,
  onDeleteById,
  onDeleteByName,
}: Props) {
  return (
    <div className="mt-4 flex flex-col gap-2 sm:flex-row">
      <button
        onClick={onEdit}
        className="w-full rounded-lg border px-4 py-2 text-sm hover:bg-gray-50">
        Edit
      </button>

      <button
        onClick={onDeleteById}
        className="w-full rounded-lg bg-red-600 px-4 py-2 text-sm text-white hover:bg-red-700">
        Delete (ID)
      </button>

      <button
        onClick={onDeleteByName}
        className="w-full rounded-lg bg-red-500 px-4 py-2 text-sm text-white hover:bg-red-600">
        Delete (Name)
      </button>
    </div>
  );
}
