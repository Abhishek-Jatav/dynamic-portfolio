export default function StatusBadge({ isRead }: { isRead: boolean }) {
  return (
    <span
      className={`text-xs px-3 py-1 rounded-full border w-fit ${
        isRead
          ? "bg-green-600/20 text-green-300 border-green-500"
          : "bg-yellow-600/20 text-yellow-300 border-yellow-500"
      }`}>
      {isRead ? "Read" : "Unread"}
    </span>
  );
}
