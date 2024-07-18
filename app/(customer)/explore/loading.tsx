import LoadingPage from "@components/loading/LoadingPage";
import { Skeleton } from "@components/ui/skeleton";

export default function Loading() {
  return (
    <div className="grid grid-cols-1 gap-x-14 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 w-full max-w-[85rem] p-5">
      <Skeleton className="h-40 sm:h-48" />
    </div>
  );
}
