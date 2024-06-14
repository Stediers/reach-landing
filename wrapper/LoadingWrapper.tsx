import Loading from "@components/Loading";
import Logo from "@components/Logo";
import { State } from "@data/enums";
import { PropsWithChildren } from "react";

export default function LoadingWrapper({
  pageState,
  children,
  className,
  loadingTextClassName = " text-md font-medium",
  loadingSVGClassName = "w-6 h-6",
  showLogo = true,
  text = "Please wait...",
  loadingJSX = (
    <div className="flex flex-col space-y-2 flex-1 justify-center items-center">
      {showLogo && <Logo />}
      <Loading
        className={loadingSVGClassName}
        color="bg-primary"
        type="pulse"
      />
      <p className={loadingTextClassName}>{text}</p>
    </div>
  ),
}: PropsWithChildren<{
  pageState: State;
  className?: string;
  showLogo?: boolean;
  text?: string;
  loadingTextClassName?: string;
  loadingSVGClassName?: string;
  loadingJSX?: JSX.Element;
}>) {
  return (
    <div className="flex flex-col w-full space-y-3">
      {pageState === State.LOADING ? loadingJSX : null}
      {pageState === State.ERROR ? (
        <div className="flex justify-center items-center h-screen">
          <div className="text-2xl font-medium">Error</div>
        </div>
      ) : null}
      {pageState === State.SUCCESS ? (
        <div className={`${className}`}>{children}</div>
      ) : null}
    </div>
  );
}
