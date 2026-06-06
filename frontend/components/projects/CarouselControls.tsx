"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

type Props = {
  onPrev: () => void;
  onNext: () => void;
};

export default function CarouselControls({ onPrev, onNext }: Props) {
  const btnStyle = {
    background: "var(--bg-glass)",
    border: "1px solid var(--border-card)",
    color: "var(--text-primary)",
    backdropFilter: "blur(8px)",
    WebkitBackdropFilter: "blur(8px)",
  };

  return (
    <div className="flex items-center gap-3">
      <button
        onClick={onPrev}
        className="flex items-center justify-center w-11 h-11 rounded-2xl transition-all duration-250 hover:-translate-y-0.5 hover:shadow-lg"
        style={btnStyle}
        aria-label="Previous project"
      >
        <ChevronLeft size={18} />
      </button>

      <button
        onClick={onNext}
        className="flex items-center justify-center w-11 h-11 rounded-2xl transition-all duration-250 hover:-translate-y-0.5 hover:shadow-lg"
        style={btnStyle}
        aria-label="Next project"
      >
        <ChevronRight size={18} />
      </button>
    </div>
  );
}
