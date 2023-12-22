import "@/styles/globals.css";
import ErrorBoundary from "@components/ErrorBoundary";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="min-h-screen-fix flex flex-col">
      <ErrorBoundary>
        <Component {...pageProps} />
      </ErrorBoundary>
    </div>
  );
}
