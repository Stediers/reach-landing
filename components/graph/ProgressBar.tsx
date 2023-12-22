export default function ProgressBar({ value }: { value: number }) {
  return (
    <div className="w-full h-2 bg-gray-200 rounded-lg bg-opacity-20 bg-black">
      <div
        className={`h-full text-base ${
          value > 0.8
            ? "bg-rating-5"
            : value > 0.6
            ? "bg-rating-4"
            : value > 0.4
            ? "bg-rating-3"
            : value > 0.2
            ? "bg-rating-2"
            : "bg-rating-1"
        } rounded-lg`}
        style={{ width: `${value * 100}%` }}
      ></div>
    </div>
  );
}
