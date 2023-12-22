export default function NumberCircle({
  number,
  bgColor = "bg-info text-white",
}: {
  number: number;
  bgColor?: string;
}) {
  return (
    <div
      className={`w-8 h-8 rounded-full flex justify-center items-center ${bgColor}`}
    >
      <p className="">{number}</p>
    </div>
  );
}
