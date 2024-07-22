import { State } from "@data/enums";
import { Metadata } from "next";
import Link from "next/link";
import React from "react";

export const metadata: Metadata = {
  title: {
    default: "Refund Policy",
    template: "%s | Refund Policy",
  },
  description: "Refund and Cancellation policy for ReachGig services",
  openGraph: {
    title: "Refund Policy",
    description: "Refund and Cancellation policy for ReachGig services",
    url: "https://reachgig.com/compliance/refund-policy",
    type: "website",
    images: [
      {
        url: "",
        width: 800,
        height: 600,
        alt: "Refund Policy",
      },
    ],
    locale: "en_US",
  },
};

export default function RefundPolicy() {
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
    <div className="relative flex flex-col items-center md:items-start justify-start scroll-smooth lg:p-10 p-5">
      <div className={body}>
        <div className={section}>
          <div className={title}>
            <span className={textHighlight}>
              CANCELLATION AND REFUND POLICY
            </span>
          </div>
          <div className={subtitle}>
            <span className={textHighlight}>Last updated</span>{" "}
            <span className={textHighlight}>January 23&#44; 2024</span>
          </div>
        </div>
        <div>
          <div data-custom-class="body_text">
            We are Reachgig Corporation Private Limited &#40; &#39;
            <span className={textHighlight}>Company</span>&#39;&#44; &#39;
            <span className={textHighlight}>we</span>
            &#39;&#44; &#39;
            <span className={textHighlight}>us</span>
            &#39;&#44; or &#39;<span className={textHighlight}>our</span>
            &#39;&#41; &#44; a company registered in India.
          </div>
        </div>
        <div className={section}>
          <div data-custom-class="body_text">
            We operate the website&nbsp;
            <Link
              rel="noreferrer"
              href="http://reachgig.com"
              target="_blank"
              className={link}
            >
              http&#58;//reachgig.com
            </Link>
            &nbsp; &#40;the &#39;<span className={textHighlight}>Site</span>
            &#39;&#41;&#44; the mobile application Reachgig &#40;the &#39;
            <span className={textHighlight}>App</span>&#39;&#41;&#44; as well as
            any other related products and services that refer or a to these
            legal terms &#40;the &#39;
            <span className={textHighlight}>Legal Terms</span>&#39;&#41;
            &#40;collectively&#44; the &#39;
            <span className={textHighlight}>Services</span>&#39;&#41;.
          </div>
          <div data-custom-class="body_text">
            We provide a platform for service providers to advertise themselves
            and market their services. The platform can be used to create
            bookings and appointments with users. Customers can also use the
            platform to search for services and avail them.
          </div>
          <div data-custom-class="body_text">
            You can contact us by phone at &#43;917550083900&#44; or email at
            reachgig.connect@gmail.com.
          </div>
        </div>
        <div className={section}>
          <div className={heading1}>
            <span className={textHighlight}>TABLE OF CONTENTS</span>
          </div>
          <div>
            <Link href="#pricing-types" className={link2}>
              1. PRICING TYPES
            </Link>
          </div>
          <div>
            <Link href="#cancellation-eligibility" className={link2}>
              2. CANCELLATION AND REFUND ELIGIBILITY
            </Link>
          </div>
          <div>
            <Link href="#cancellation-request-process" className={link2}>
              3. CANCELLATION REQUEST PROCESS
            </Link>
          </div>
          <div>
            <Link href="#cancellation-limitations" className={link2}>
              4. CANCELLATION LIMITATIONS
            </Link>
          </div>
          <div>
            <Link href="#refund-processing-time" className={link2}>
              5. REFUND PROCESSING TIME
            </Link>
          </div>
          <div>
            <Link href="#malicious-requests" className={link2}>
              6. MALICIOUS REQUESTS
            </Link>
          </div>
          <div>
            <Link href="#free-cancellations" className={link2}>
              7. FREE CANCELLATIONS
            </Link>
          </div>
          <div>
            <Link href="#customer-support" className={link2}>
              8. CUSTOMER SUPPORT
            </Link>
          </div>
          <div>
            <Link href="#faqs" className={link2}>
              9. FAQs
            </Link>
          </div>
        </div>
        {/* generate shells for each section with respective ids */}
        <div className={section} id="pricing-types">
          <div className={heading1}>
            <span className={textHighlight}>1. PRICING TYPES</span>
          </div>
          <p>We offer three types of pricing plans:</p>
          <ul className={list}>
            <li>
              <span className={textHighlight}>Basic (5% booking fee)</span> -
              3/5 or 60% of the booking fee is refundable.
            </li>
            <li>
              <span className={textHighlight}>Standard (10% booking fee)</span>{" "}
              - 4/5 or 80% of the booking fee is refundable.
            </li>
            <li>
              <span className={textHighlight}>Pro (20% booking fee)</span> -
              100% refund
            </li>
          </ul>
        </div>
        <div className={section} id="cancellation-eligibility">
          <div className={heading1}>
            <span className={textHighlight}>
              2. CANCELLATION AND REFUND ELIGIBILITY
            </span>
          </div>
          <p>
            Customers are free to cancel until the booking is confirmed. After
            confirmation, refunds are given only if the service provider fails
            to follow through with the appointment
            {` (This is done to ensure that service providers are not
                    inconvenienced by cancellations)`}
            . The refund amount is as:
          </p>
          <ul className={list}>
            <li>
              <span className={textHighlight}>Basic:</span> 3/5 or 60% of the
              booking fee
            </li>

            <li>
              <span className={textHighlight}>Standard:</span> 4/5 or 80% of the
              booking fee
            </li>
            <li>
              <span className={textHighlight}>Pro:</span> {`100% refund`}
            </li>
            <li>
              <span className={textHighlight}>
                Pro (customer dissatisfaction):
              </span>{" "}
              Refund available within 7 days from the date of completion of the
              appointment and if approved by Reachgig.
            </li>
          </ul>
        </div>
        <div className={section} id="cancellation-request-process">
          <div className={heading1}>
            <span className={textHighlight}>
              3. CANCELLATION REQUEST PROCESS
            </span>
          </div>
          <p>
            {`Before booking confirmation, customers can cancel bookings directly from the bookings page. For
            issues after confirmation, users can press the "Help" button in the
            bookings page or contact us at`}{" "}
            <Link className={link} href="mailto:reachgig.connect@gmail.com">
              reachgig.connect@gmail.com
            </Link>
            .
          </p>
        </div>
        <div className={section} id="cancellation-limitations">
          <div className={heading1}>
            <span className={textHighlight}>4. CANCELLATION LIMITATIONS</span>
          </div>
          <p>
            After booking confirmation, Refunds are given only if the service
            provider fails to follow through with the appointment. Otherwise,
            the booking fee is non-refundable.
          </p>
        </div>
        <div className={section} id="refund-processing-time">
          <div className={heading1}>
            <span className={textHighlight}>5. REFUND PROCESSING TIME</span>
          </div>
          <p>Refunds will be processed within 5-7 business days.</p>
        </div>
        <div className={section} id="malicious-requests">
          <div className={heading1}>
            <span className={textHighlight}>6. MALICIOUS REQUESTS</span>
          </div>
          <p>
            Cancellations or refunds will not be granted if the request is
            deemed malicious, the definition of which is upto Reachgig{" "}
            {
              "( Example: if a customer keeps cancelling his bookings, causing inconvenience to service providers)"
            }
            . Communication regarding such decisions will be sent via Email or
            SMS.
          </p>
        </div>
        <div className={section} id="free-cancellations">
          <div className={heading1}>
            <span className={textHighlight}>7. FREE CANCELLATIONS</span>
          </div>
          <p>
            {`All cancellations before booking confirmation are free. After
            confirmation, customers can cancel bookings via the "Help" button in
            the bookings page but will not be eligible for Link refund.`}
          </p>
        </div>
        <div className={section} id="customer-support">
          <div className={heading1}>
            <span className={textHighlight}>8. CUSTOMER SUPPORT</span>
          </div>
          <p>
            Customers can contact us at{" "}
            <Link className={link} href="mailto:reachgig.connect@gmail.com">
              reachgig.connect@gmail.com
            </Link>{" "}
            for assistance.
          </p>
        </div>
        <div className={section} id="faqs">
          <div className={heading1}>
            <span className={textHighlight}>9. FAQs</span>
          </div>

          <p>
            Users can refer to the FAQs on our website at{" "}
            <Link
              className={link}
              href="https://reachgig.com/faqs"
              target="_blank"
            >
              reachgig.com/faqs
            </Link>{" "}
            for additional information.
          </p>
        </div>
      </div>
    </div>
  );
}
