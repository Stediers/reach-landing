import Button from "./Button";

export default function PaginationComponent({
  page,
  setPage,
}: {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}) {
  return (
    <div className="flex justify-center items-center space-x-5">
      <Button
        text="Load More"
        className="text-info underline underline-offset-4"
        onClick={() => setPage(page + 1)}
      />
    </div>
  );
}
