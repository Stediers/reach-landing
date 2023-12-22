export default function AddressLine({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <div className="flex flex-col items-start justify-center space-y-1">
      <p className="text-base font-medium">{title}</p>
      <p className="text-base/7">{value}</p>
    </div>
  );
}
