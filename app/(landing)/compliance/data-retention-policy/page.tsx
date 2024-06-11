import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: {
    default: "Data Retention Policy",
    template: "%s | Data Retention Policy",
  },
  description: "Learn about ReachGig's data retention policy",
  openGraph: {
    title: "Data Retention Policy",
    description: "Learn about ReachGig's data retention policy",
    url: "https://reachgig.com/compliance/data-retention-policy",
    type: "website",
    images: [
      {
        url: "",
        width: 800,
        height: 600,
        alt: "Data Retention Policy",
      },
    ],
    locale: "en_US",
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
          <span className={textHighlight}>DATA RETENTION POLICY</span>
        </div>
        <div className={subtitle}>
          <span className={textHighlight}>Last updated</span>{" "}
          <span className={textHighlight}>February 09&#44; 2024</span>
        </div>
        <div>
          This Data Retention Policy explains how we,{" "}
          <span className={textHighlight}>
            Reachgig Corporation Private Limited
          </span>
          , collect, use, and retain your personal information in connection
          with your use of our platform,{" "}
          <span className={textHighlight}>Reachgig</span>. We are committed to
          protecting your privacy and complying with all applicable data privacy
          laws and regulations, including the Information Technology
          (Intermediary Guidelines and Digital Media Ethics Code) Rules, 2021
          (IT Rules).
        </div>
        <div id="toc" className={heading1}>
          <span className={textHighlight}>TABLE OF CONTENTS </span>
        </div>
        <div>
          <Link href="#infocollect" className={link2}>
            1&#46; DATA WE COLLECT{" "}
          </Link>
        </div>
        <div>
          <Link href="#retention" className={link2}>
            2&#46; DATA RETENTION PERIOD
          </Link>
        </div>
        <div>
          <Link href="#deletion" className={link2}>
            3&#46; DATA DELETION PROCEDURES
          </Link>
        </div>
        <div>
          <Link href="#rights" className={link2}>
            4&#46; USER RIGHTS
          </Link>
        </div>
        <div>
          <Link href="#inforetain" className={link2}>
            5&#46; HOW LONG DO WE KEEP YOUR INFORMATION?{" "}
          </Link>
        </div>
        <div>
          <Link href="#compliance" className={link2}>
            6&#46; LEGAL AD REGUALTORY COMPLIANCE
          </Link>
        </div>
        <div>
          <Link href="#changes" className={link2}>
            7&#46; CHANGES TO THIS POLICY
          </Link>
        </div>
        <div>
          <Link href="#contact" className={link2}>
            8&#46; CONTACT US
          </Link>
        </div>
        <div className={section}>
          <div id="infocollect" className={heading1}>
            <span className={textHighlight}>1&#46; DATA WE COLLECT</span>
          </div>
          <span>
            We collect the following personal information from users of our
            platform:
          </span>
          <span className={textHighlight}>Customers</span>
          <ul className={list}>
            <li>Name</li>
            <li>Phone number</li>
            <li>Profile photo (optional)</li>
          </ul>
          <span className={textHighlight}> Service Providers</span>
          <ul className={list}>
            <li>Name</li>
            <li>Profile photo</li>
            <li>Phone number</li>
            <li>Profession</li>
            <li>Address</li>
            <li>Gender</li>
          </ul>
          <span>
            We also collect and retain data related to user chat activities,
            including:
          </span>
          <ul className={list}>
            <li>Timestamp of messages</li>
            <li>Chat content (encryted)</li>
            <li>Participants</li>
          </ul>
        </div>
        <div className={section}>
          <div id="retention" className={heading1}>
            <span className={textHighlight}>2&#46; DATA RETENTION PERIOD</span>
          </div>
          <span>
            We will retain your personal information for the following periods:
          </span>
          <ul className={list}>
            <li>
              <span className={textHighlight}>
                As long as you have an account:
              </span>{" "}
              We will retain your personal information as long as you have an
              active account on our platform. This is necessary to provide you
              with the core functionalities of the platform, such as booking
              services and communicating with service providers.
            </li>
            <li>
              <span className={textHighlight}>
                12 months after account deletion:
              </span>
              If you delete your account, we will retain your personal
              information for no longer than 12 months. This allows us to comply
              with legal requirements, resolve disputes, and enforce our
              agreements.
            </li>
            <li>
              <span className={textHighlight}>Chat data:</span>
              We will retain chat data for the period that at least one
              participant in the chat maintains an active account on our
              platform. This allows users to access and reference past
              conversations. After both participants delete their accounts, we
              will anonymize the chat data within 12 months.
            </li>
          </ul>
        </div>
        <div className={section}>
          <div id="deletion" className={heading1}>
            <span className={textHighlight}>
              3&#46; DATA DELETION PROCEDURES
            </span>
          </div>
          <span>
            After the applicable retention period expires, we will delete your
            personal information securely using industry-standard methods. This
            may include data wiping, irreversible anonymization, or physical
            destruction of storage media.
          </span>
        </div>
        <div className={section}>
          <div id="rights" className={heading1}>
            <span className={textHighlight}>4&#46; USER RIGHTS</span>
          </div>
          <span>
            You have the following rights in relation to your personal
            information:
          </span>
          <ul className={list}>
            <li>
              <span className={textHighlight}>Right to access your data:</span>{" "}
              You can request a copy of your personal information that we hold.
            </li>
            <li>
              <span className={textHighlight}>Right to rectify your data:</span>{" "}
              You can request that we correct any inaccuracies in your personal
              information.
            </li>
            <li>
              <span className={textHighlight}>Right to rectify your data:</span>{" "}
              You can request that we delete your personal information at any
              time.
            </li>
            <li>
              <span className={textHighlight}>
                Right to object to the processing of your data:
              </span>{" "}
              Right to object to the processing of your data:
            </li>
            <li>
              <span className={textHighlight}>
                Right to restrict the processing of your data:
              </span>{" "}
              You can request that we restrict the processing of your personal
              information under certain circumstances.
            </li>
            <li>
              <span className={textHighlight}>Right to data portability:</span>{" "}
              You can request that we transfer your personal information to
              another service provider or platform.
            </li>
          </ul>
          <span>
            {` You can exercise these rights by contacting us using the details
            provided in the "Contact Us" section below.`}
          </span>
        </div>
        <div className={section}>
          <div id="compliance" className={heading1}>
            <span className={textHighlight}>
              5&#46; LEGAL AND REGULATORY COMPLIANCE
            </span>
          </div>
          <span>
            We may retain certain personal information for longer periods if
            required by law or regulation, or if necessary to comply with legal
            obligations, resolve disputes, or enforce our agreements.
          </span>
        </div>
        <div className={section}>
          <div id="changes" className={heading1}>
            <span className={textHighlight}>6&#46; CHANGES TO THIS POLICY</span>
          </div>
          <span>
            We may update this Data Retention Policy from time to time. We will
            notify you of any changes by posting the new policy on our website.
            You are encouraged to review the policy regularly to stay informed
            of updates.
          </span>
        </div>
        <div className={section}>
          <div id="contact" className={heading1}>
            <span className={textHighlight}>7&#46; CONTACT US</span>
          </div>
          <span>
            If you have questions or comments about this notice &#44; you may
            email us at reachgig.connect@gmail&#46;com or&nbsp;contact us by
            phone&#58; &#43;917550083900
          </span>
        </div>
      </div>
    </div>
  );
}
