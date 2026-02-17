type TabType = "all" | "read" | "unread";

export default function ContactTabs({
  tab,
  setTab,
  allCount,
  unreadCount,
  readCount,
}: {
  tab: TabType;
  setTab: (tab: TabType) => void;
  allCount: number;
  unreadCount: number;
  readCount: number;
}) {
  return (
    <div className="flex flex-wrap gap-2 sm:gap-3">
      <TabButton active={tab === "all"} onClick={() => setTab("all")}>
        All ({allCount})
      </TabButton>

      <TabButton active={tab === "unread"} onClick={() => setTab("unread")}>
        Unread ({unreadCount})
      </TabButton>

      <TabButton active={tab === "read"} onClick={() => setTab("read")}>
        Read ({readCount})
      </TabButton>
    </div>
  );
}

function TabButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-3 sm:px-4 py-2 rounded-md border text-xs sm:text-sm font-medium transition ${
        active
          ? "bg-white text-black border-white"
          : "bg-black text-white border-gray-700 hover:bg-gray-900"
      }`}>
      {children}
    </button>
  );
}
