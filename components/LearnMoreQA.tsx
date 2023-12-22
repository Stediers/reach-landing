import { PropsWithChildren } from "react";

export function LearnMoreQandA({
  question,
  children,
}: PropsWithChildren<{
  question: string;
}>) {
  return (
    <div className="flex flex-col items-start justify-start space-y-2 leading-7 w-full">
      <h2 className="text-lg font-medium first-letter:capitalize">
        {question}
      </h2>
      <div className="w-full text-base/7 text-left space-y-3">{children}</div>
    </div>
  );
}
