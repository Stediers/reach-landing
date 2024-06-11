import Loading from "@components/Loading";

export default function LoadingPage() {
  return (
    <div className="flex flex-col items-center justify-center w-full h-screen space-y-7">
      <Loading className="w-5 h-5" />
      <p className="text-2xl font-medium">Loading...</p>
    </div>
  );
}
