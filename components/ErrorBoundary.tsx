import React, { Component, ErrorInfo, ReactNode, useState } from "react";
import { AiOutlineWarning } from "react-icons/ai";
import Button from "./Button";
import Card from "./Card";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(_: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error: _ };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center space-y-5 w-full h-screen px-5 min-h-screen-fix">
          <AiOutlineWarning className="w-10 h-10 text-primary lg:w-20 lg:h-20" />
          <div className="flex flex-col items-center justify-center space-y-2 w-full  max-w-lg">
            <p className="text-center font-medium text-lg">
              Something went wrong
            </p>
            <p className="text-center text-base">
              Please try reloading the page. If the problem persists, please
              contact us
            </p>
          </div>
          <div className="flex flex-row items-center justify-between w-full space-x-5  max-w-lg">
            <Button
              text="Reload"
              onClick={() => window.location.reload()}
              className="bg-primary text-white"
            />
            <Button
              text="Contact Us"
              link="/contact-us"
              className="bg-info text-white"
            />
          </div>
          <Card className="flex flex-col items-center justify-center !space-y-2 w-full  max-w-lg">
            <p className="font-medium text-lg text-center">Error Details</p>
            <p className="text-center text-base">{this.state.error?.message}</p>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
