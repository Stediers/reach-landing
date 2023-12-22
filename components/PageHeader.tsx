export default function PageHeader({ title }: { title: string }) {
  return (
    <div className="w-fit flex flex-col items-center space-y-2">
      <h1 className="text-xl font-medium text-center uppercase">{title}</h1>
      <div className="h-px w-[80%] bg-primary" />
    </div>
  );
}
