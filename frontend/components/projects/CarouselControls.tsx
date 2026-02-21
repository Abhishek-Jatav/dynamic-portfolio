type Props = {
  onPrev: () => void;
  onNext: () => void;
};

export default function CarouselControls({ onPrev, onNext }: Props) {
  return (
    <div className="flex gap-4">
      <button
        aria-label="Previous Project"
        onClick={onPrev}
        className="h-12 w-12 sm:h-14 sm:w-14 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-xl flex items-center justify-center hover:scale-110 active:scale-95 transition">
        <span className="text-lg sm:text-xl">←</span>
      </button>

      <button
        aria-label="Next Project"
        onClick={onNext}
        className="h-12 w-12 sm:h-14 sm:w-14 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-xl flex items-center justify-center hover:scale-110 active:scale-95 transition">
        <span className="text-lg sm:text-xl">→</span>
      </button>
    </div>
  );
}
