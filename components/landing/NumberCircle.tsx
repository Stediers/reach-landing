export function NumberCircle({ number }: { number: number }) {
  return (
    <div className="w-8 h-8 lg:w-10 lg:h-10 border-success border-2 rounded-full flex items-center justify-center">
      <p className="text-success font-medium text-base lg:text-lg">{number}</p>
    </div>
  );
}
