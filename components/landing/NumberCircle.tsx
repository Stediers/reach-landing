export function NumberCircle({ number }: { number: number }) {
  return (
    <div className="w-10 h-10 lg:w-12 lg:h-12 border-success border-2 rounded-full flex items-center justify-center">
      <p className="text-success font-medium text-xl lg:text-2xl">{number}</p>
    </div>
  );
}
