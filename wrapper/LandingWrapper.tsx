import { State } from "@/data/enums";
import Head from "next/head";
import React, { PropsWithChildren } from "react";
import Loading from "@components/Loading";
import Button from "@components/Button";
import Script from "next/script";
import Footer from "@components/footer/Footer";
import NavBar from "@components/navbar/DesktopNavBar";

export default function LandingWrapper({
  title,
  children,
  showFooter = false,
  state = State.LOADING,
  className,
  showNavbar = true,
}: PropsWithChildren<{
  title: string;
  showNavbar?: boolean;
  showFooter?: boolean;
  state?: State;
  className?: string;
}>) {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Script id="abcd">
        {`function setDocHeight() {
            document.documentElement.style.setProperty(
              "--vh",
              window.innerHeight * 0.01 + "px"
            );
          }
          setDocHeight();
          window.addEventListener("resize", setDocHeight);`}
      </Script>
      <Script id="widgetfw">
        {`
                window.fwSettings = {
                  'widget_id': ${process.env.NEXT_PUBLIC_WIDGET_ID}
                };
                !function() {
                  if ("function" !== typeof window.FreshworksWidget) {
                    var n = function() {
                      n.q.push(arguments)
                    };
                    n.q = [];
                    window.FreshworksWidget = n
                  }
                }();
              `}
      </Script>
      <Script
        type="text/javascript"
        src={`https://ind-widget.freshworks.com/widgets/${process.env.NEXT_PUBLIC_WIDGET_ID}.js`}
        async
        defer
      ></Script>
      <main
        className={`w-full min-h-screen-fix flex flex-col items-center justify-start relative scroll-smooth`}
      >
        {showNavbar ? <NavBar /> : null}
        {state === State.LOADING ? (
          <div className="flex-1 flex flex-col justify-center items-center space-y-2">
            <Loading className="w-10 h-10" />
            <p className=" text-center font-medium text-lg">Loading...</p>
          </div>
        ) : null}
        {state === State.ERROR ? (
          <div className="flex-1 flex  w-full justify-center items-center h-full">
            <div className="flex flex-col items-center space-y-4">
              <p className="text-2xl font-medium">Something went wrong</p>
              <Button
                text="Reload"
                onClick={() => window.location.reload()}
                className=" bg-success font-medium text-white"
              />
            </div>
          </div>
        ) : null}
        {state === State.SUCCESS && (
          <div className={`flex-1 w-full pt-0 flex flex-col space-y-20`}>
            <div className={`w-full ${className}`}>{children}</div>
            {showFooter && <Footer />}
          </div>
        )}
      </main>
    </>
  );
}
