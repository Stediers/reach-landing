import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: {
    default: "Chat Guidelines",
    template: "%s | Chat Guidelines",
  },
  description:
    "Chat guidelines for ReachGig users. We aim to provide a safe and respectful environment for all users.",
  openGraph: {
    title: "Chat Guidelines",
    description:
      "Chat guidelines for ReachGig users. We aim to provide a safe and respectful environment for all users.",
    url: "https://reachgig.com/compliance/chat-guidelines",
    type: "website",
    images: [
      {
        url: "",
        width: 800,
        height: 600,
        alt: "Chat Guidelines",
      },
    ],
    locale: "en_IN",
  },
};

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
  const link2 = "text-info hover:underline";
  const textHighlight = "font-medium";

  return (
    <div className="relative flex flex-col items-center justify-center scroll-smooth p-5 lg:p-10">
      <div className={body}>
        <div className={title}>
          <span className={textHighlight}>CHAT GUIDELINES</span>
        </div>
        <div className={subtitle}>
          <span className={textHighlight}>Last updated</span>{" "}
          <span className={textHighlight}>February 09&#44; 2024</span>
        </div>
        <div>
          Welcome to Reachgig Chat Guidelines. We are committed to providing a
          safe and respectful environment for all users. We encourage you to
          read through our guidelines to understand how to interact with other
          users on the platform.
        </div>
        <div id="toc" className={heading1}>
          <span className={textHighlight}>TABLE OF CONTENTS </span>
        </div>
        <div>
          <Link href="#purpose" className={link2}>
            1&#46; PURPOSE{" "}
          </Link>
        </div>
        <div>
          <Link href="#notallowed" className={link2}>
            2&#46; {`WHAT'S NOT ALLOWED`}
          </Link>
        </div>
        <div>
          <Link href="#tone" className={link2}>
            3&#46; PROFESSIONAL TONE
          </Link>
        </div>
        <div>
          <Link href="#privacy" className={link2}>
            4&#46; DATA PRIVACY
          </Link>
        </div>
        <div>
          <Link href="#report" className={link2}>
            5&#46; REPORTING VIOLATIONS
          </Link>
        </div>
        <div>
          <Link href="#remember" className={link2}>
            6&#46; POINTS TO REMEMBER{" "}
          </Link>
        </div>
        <div className={section}>
          <div id="purpose" className={heading1}>
            <span className={textHighlight}>1&#46; PURPOSE</span>
          </div>
          <div>
            {`We offer a user-user chat feature to connect service providers and
            customers for convenient booking experiences. Remember, the chat is
            solely for booking-related communication. Let's keep it
            professional, helpful, and respectful!`}
          </div>
        </div>
        <div className={section}>
          <div id="notallowed" className={heading1}>
            <span className={textHighlight}>2&#46; {`WHAT'S NOT ALLOWED`}</span>
          </div>
          <ul className={list}>
            <li>
              <span className={textHighlight}>Offensive Content:</span> Sending
              repetitive, unsolicited messages.
            </li>
            <li>
              <span className={textHighlight}>Misinformation & Spam:</span>{" "}
              {`Don't spread misinformation, fake news, or spam. Stick to topics
              relevant to booking services on our platform.`}
            </li>
            <li>
              <span className={textHighlight}>
                Personal Information Sharing:
              </span>{" "}
              Sharing contact details or other personally identifiable
              information (PII) outside the booking process is strictly
              prohibited.{" "}
            </li>
            <li>
              <span className={textHighlight}>Illegal Activities:</span>{" "}
              {`Don't
              discuss or solicit any illegal activities. Remember, you're
              responsible for adhering to all applicable laws.`}
            </li>
            <li>
              <span className={textHighlight}>Off-Topic Content:</span> Keep
              discussions relevant to service booking. Avoid general social
              interactions, jokes, or unrelated topics.
            </li>
          </ul>
        </div>
        <div className={section}>
          <div id="tone" className={heading1}>
            <span className={textHighlight}>3&#46; PROFESSIONAL TONE</span>
          </div>
          <div>
            Maintain a professional tone in your communication. Avoid casual
            language, slang, and excessive emojis. Focus on clear and concise
            messages that facilitate efficient booking interactions.
          </div>
        </div>
        <div className={section}>
          <div id="privacy" className={heading1}>
            <span className={textHighlight}>4&#46; DATA PRIVACY</span>
          </div>
          <div>
            {` We prioritize user privacy. Remember, don't share sensitive
                information like financial details or addresses in chat messages.
                Please refer to our`}{" "}
            <Link href={"/privacy-policy"} className={link}>
              Privacy Policy
            </Link>{" "}
            for more details.{" "}
          </div>
        </div>
        <div className={section}>
          <div id="report" className={heading1}>
            <span className={textHighlight}>5&#46; REPORTING VIOLATIONS</span>
          </div>
          <div>
            {`  We take violations seriously. If you encounter any offensive,
            harmful, or suspicious activity, report it immediately using the
            "Report" button within the chat window. We'll promptly review and
            take necessary action.`}{" "}
          </div>
        </div>
        <div className={section}>
          <div id="remember" className={heading1}>
            <span className={textHighlight}>6&#46; POINTS TO REMEMBER</span>
          </div>
          <ul className={list}>
            <li>
              <span className={textHighlight}>Respectful Communication:</span>{" "}
              {` You're responsible for your own messages and interactions.`}
            </li>
            <li>
              <span className={textHighlight}>Professionalism:</span> Keep your
              Treat others with respect, regardless of their background or
              beliefs.
            </li>
            <li>
              <span className={textHighlight}>Privacy:</span> Protect your
              Report any violations promptly to help us maintain a positive and
              safe chat environment.
            </li>
            <li>
              <span className={textHighlight}>Reporting:</span> Report any By
              using the chat feature, you agree to these guidelines and our
              Terms of Service.
            </li>
          </ul>
        </div>
        <span className={textHighlight}>
          {`  Let's work together to make Reachgig a comfortable and productive
          space for everyone!`}
        </span>
      </div>
    </div>
  );
}
