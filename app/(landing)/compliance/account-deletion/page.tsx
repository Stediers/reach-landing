"use client";
import { openInNewTab } from "@helper_functions/newTab";

export default function Main() {
  const title = "text-xl md:text-3xl";
  const subtitle = "text-lg md:text-2xl";
  const body =
    "w-full flex flex-col space-y-10 leading-7 text-center md:text-left md:w-full md:flex md:flex-col md:space-y-10 md:leading-7";
  const section =
    "w-full flex flex-col space-y-5 justify-center items-center md:w-full md:items-start md:justify-start md:flex md:flex-col md:space-y-5 ";
  const heading1 = "text-lg text-center sm:text-left md:text-xl";
  const heading2 = "text-md md:text-lg md:my-2";
  const list = "list-disc pl-5 space-y-2 mt-5";
  const link = "text-primary hover:underline";
  const link2 = "";
  const textHighlight = "font-medium";

  return (
    <div className="relative flex flex-col items-center justify-center scroll-smooth p-5 lg:p-10 w-full">
      <div className={body}>
        <div className={title}>
          <span className={textHighlight}>How to delete your account?</span>
        </div>
        <div className={subtitle}>
          <span className={textHighlight}>Last updated</span>{" "}
          <span className={textHighlight}>November 04&#44; 2024</span>
        </div>
        <div>
          This page contains instructions on how to delete your account.
        </div>
        <div id="toc" className={heading1}>
          <span className={textHighlight}>Follow these steps:</span>
        </div>
        <p>
          Step 1: Contact Support by clicking the{" "}
          <span
            className={link}
            onClick={() => {
              openInNewTab("mailto:reachgig.connect@gmail.com");
            }}
          >
            here
          </span>
        </p>
        <p>
          Step 2: Verify your identity by providing your mobilenumber and
          clicking the link sent to your phone.
        </p>
        <p>Step 3: Confirm account deletion</p>
        <p>Step 4: Tell us why you want to delete your account</p>
        <span className={textHighlight}>
          We will review your request and delete your account within 3 business
          days.
        </span>
      </div>
    </div>
  );
}
