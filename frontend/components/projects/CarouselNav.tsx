interface Props {
  index: number;
  total: number;
  onPrev: () => void;
  onNext: () => void;
}

export default function CarouselNav({ index, total, onPrev, onNext }: Props) {
  return (
    <>
      <div className="absolute bottom-4 right-4 flex gap-2">
        <button
          onClick={onPrev}
          className="px-4 py-2 rounded-full bg-dark border border-gray-400">
          ← Prev
        </button>
        <button
          onClick={onNext}
          className="px-4 py-2 rounded-full bg-dark border border-gray-400">
          Next →
        </button>
      </div>

      <div className="absolute bottom-4 left-4 text-xs text-gray-400">
        {index + 1} / {total}
      </div>
    </>
  );
}
