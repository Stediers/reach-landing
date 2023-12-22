import ProgressBar from "./graph/ProgressBar";

export default function PerformanceCard({
  total,
  value,
  totalName,
  valueName,
  type = "appointments",
}: {
  total: number;
  value: number;
  totalName: string;
  valueName: string;
  type?: "revenue" | "appointments";
}) {
  return (
    <div className="flex flex-col items-start !space-y-2 w-full">
      <div className="flex items-center justify-between space-x-4 w-full">
        <p className="text-base font-medium"> {valueName}</p>
        <p className="text-base font-normal">
          {type === "revenue" ? "₹" : ""}
          {Math.round(value)}
        </p>
      </div>
      <ProgressBar
        value={total > 0 ? value / (total < value ? value : total) : 0}
      />
      <div className="flex items-center justify-between space-x-4 w-full">
        <p className="text-base font-medium"> {totalName}</p>
        <p className="text-base font-normal">
          {type === "revenue" ? "₹" : ""}
          {total < value ? Math.round(value) : Math.round(total)}
        </p>
      </div>
    </div>
  );
}
