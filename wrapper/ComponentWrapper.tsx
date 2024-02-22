export default function ComponentWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full flex lg:flex-row flex-col space-y-5 items-center lg:items-start lg:justify-start justify-center lg:space-x-10">
      {children}
    </div>
  );
}
