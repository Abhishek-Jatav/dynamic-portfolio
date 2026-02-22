"use client";

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
    <div className="flex flex-wrap gap-3 bg-neutral-950/60 backdrop-blur-2xl border border-white/10 rounded-2xl p-2 w-fit shadow-lg">
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
      className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 ${
        active
          ? "bg-gradient-to-r from-indigo-500 to-blue-600 text-white shadow-lg scale-105"
          : "bg-white/5 text-gray-300 border border-white/10 hover:bg-white/10"
      }`}>
      {children}
    </button>
  );
}
