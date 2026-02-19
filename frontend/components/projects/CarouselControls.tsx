type Props = {
  onPrev: () => void;
  onNext: () => void;
};

export default function CarouselControls({ onPrev, onNext }: Props) {
  return (
    <>
      {/* Left */}
      <button
        onClick={onPrev}
        className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 h-12 w-12 sm:h-14 sm:w-14 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-xl flex items-center justify-center hover:scale-110 active:scale-95 transition">
        <span className="text-lg sm:text-xl">←</span>
      </button>

      {/* Right */}
      <button
        onClick={onNext}
        className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 h-12 w-12 sm:h-14 sm:w-14 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-xl flex items-center justify-center hover:scale-110 active:scale-95 transition">
        <span className="text-lg sm:text-xl">→</span>
      </button>
    </>
  );
}
