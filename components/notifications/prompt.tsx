import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { getCookie, setCookie } from "@api_functions/internal/cookie";

const ModuleLoading = () => (
  <div className="w-full h-full flex justify-center items-center text-lg font-medium">
    Loading...
  </div>
);
const AddToIosSafari = dynamic(() => import("./prompts/AddToIosSafari"), {
  loading: () => <ModuleLoading />,
});
const AddToMobileChrome = dynamic(() => import("./prompts/AddToMobileChrome"), {
  loading: () => <ModuleLoading />,
});
const AddToMobileFirefox = dynamic(
  () => import("./prompts/AddToMobileFirefox"),
  {
    loading: () => <ModuleLoading />,
  }
);
const AddToMobileFirefoxIos = dynamic(
  () => import("./prompts/AddToMobileFirefoxIos"),
  {
    loading: () => <ModuleLoading />,
  }
);
const AddToMobileChromeIos = dynamic(
  () => import("./prompts/AddToMobileChromeIos"),
  {
    loading: () => <ModuleLoading />,
  }
);
const AddToSamsung = dynamic(() => import("./prompts/AddToSamsung"), {
  loading: () => <ModuleLoading />,
});
const AddToOtherBrowser = dynamic(() => import("./prompts/AddToOtherBrowser"), {
  loading: () => <ModuleLoading />,
});

type AddToHomeScreenPromptType =
  | "safari"
  | "chrome"
  | "firefox"
  | "other"
  | "firefoxIos"
  | "chromeIos"
  | "samsung"
  | "";
const COOKIE_NAME = "addToHomeScreenPrompt";

export default function AddToHomeScreen() {
  const [displayPrompt, setDisplayPrompt] =
    useState<AddToHomeScreenPromptType>("");
  const { userAgent, isMobile, isStandalone, isIOS } = useUserAgent();

  const closePrompt = () => {
    setDisplayPrompt("");
  };

  const doNotShowAgain = () => {
    // Create date 1 year from now
    const date = new Date();
    date.setFullYear(date.getFullYear() + 1);
    setCookie(COOKIE_NAME, "dontShow", 3); // Set cookie for a year
    setDisplayPrompt("");
  };

  useEffect(() => {
    const addToHomeScreenPromptCookie = getCookie(COOKIE_NAME);

    if (addToHomeScreenPromptCookie !== "dontShow") {
      // Only show prompt if user is on mobile and app is not installed
      if (isMobile && !isStandalone) {
        if (userAgent === "Safari") {
          setDisplayPrompt("safari");
        } else if (userAgent === "Chrome") {
          setDisplayPrompt("chrome");
        } else if (userAgent === "Firefox") {
          setDisplayPrompt("firefox");
        } else if (userAgent === "FirefoxiOS") {
          setDisplayPrompt("firefoxIos");
        } else if (userAgent === "ChromeiOS") {
          setDisplayPrompt("chromeIos");
        } else if (userAgent === "SamsungBrowser") {
          setDisplayPrompt("samsung");
        } else {
          setDisplayPrompt("other");
        }
      }
    } else {
    }
  }, [userAgent, isMobile, isStandalone, isIOS]);

  const Prompt = () => (
    <>
      {
        {
          safari: (
            <AddToIosSafari
              closePrompt={closePrompt}
              doNotShowAgain={doNotShowAgain}
            />
          ),
          chrome: (
            <AddToMobileChrome
              closePrompt={closePrompt}
              doNotShowAgain={doNotShowAgain}
            />
          ),
          firefox: (
            <AddToMobileFirefox
              closePrompt={closePrompt}
              doNotShowAgain={doNotShowAgain}
            />
          ),
          firefoxIos: (
            <AddToMobileFirefoxIos
              closePrompt={closePrompt}
              doNotShowAgain={doNotShowAgain}
            />
          ),
          chromeIos: (
            <AddToMobileChromeIos
              closePrompt={closePrompt}
              doNotShowAgain={doNotShowAgain}
            />
          ),
          samsung: (
            <AddToSamsung
              closePrompt={closePrompt}
              doNotShowAgain={doNotShowAgain}
            />
          ),
          other: (
            <AddToOtherBrowser
              closePrompt={closePrompt}
              doNotShowAgain={doNotShowAgain}
            />
          ),
          "": <></>,
        }[displayPrompt]
      }
    </>
  );

  return (
    <>
      {displayPrompt !== "" ? (
        <>
          <div
            className="fixed top-0 left-0 right-0 bottom-0 bg-black/70 z-50"
            onClick={closePrompt}
          >
            <Prompt />
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
}

function useUserAgent() {
  /**
   * we set our initial state as null because we don't know what the user agent is yet
   * that way we can check if the user agent has been set or not
   */
  const [isMobile, setIsMobile] = useState<boolean | null>(null);
  const [userAgent, setUserAgent] = useState<string | null>(null);
  const [isIOS, setIsIOS] = useState<boolean | null>(null);
  const [isStandalone, setIsStandalone] = useState<boolean | null>(null);
  const [userAgentString, setUserAgentString] = useState<string | null>(null);

  useEffect(() => {
    if (window) {
      const userAgentString = window.navigator.userAgent;
      setUserAgentString(userAgentString);
      let userAgent;

      /**
       * Parse user agent string to determine browser
       * The order of the if statements is important because some browsers
       * have multiple matches in their user agent string
       */
      if (userAgentString.indexOf("SamsungBrowser") > -1) {
        userAgent = "SamsungBrowser";
      } else if (userAgentString.indexOf("Firefox") > -1) {
        userAgent = "Firefox";
      } else if (userAgentString.indexOf("FxiOS") > -1) {
        userAgent = "FirefoxiOS";
      } else if (userAgentString.indexOf("CriOS") > -1) {
        userAgent = "ChromeiOS";
      } else if (userAgentString.indexOf("Chrome") > -1) {
        userAgent = "Chrome";
      } else if (userAgentString.indexOf("Safari") > -1) {
        userAgent = "Safari";
      } else {
        userAgent = "unknown";
      }
      setUserAgent(userAgent);

      // Check if user agent is mobile
      const isIOS = userAgentString.match(/iPhone|iPad|iPod/i);
      const isAndroid = userAgentString.match(/Android/i);
      setIsIOS(isIOS ? true : false);
      const isMobile = isIOS || isAndroid;
      setIsMobile(!!isMobile);

      // Check if app is installed (if it's installed we wont show the prompt)
      if (window.matchMedia("(display-mode: standalone)").matches) {
        setIsStandalone(true);
      }
    }
  }, []);

  return { isMobile, userAgent, isIOS, isStandalone, userAgentString };
}
