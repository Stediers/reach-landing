import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: {
    default: "Terms and Conditions for Appointments",
    template: "%s | Terms and Conditions for Appointments",
  },
  description: "Terms and Conditions for Appointments in ReachGig",
  alternates: {
    canonical: "https://www.reachgig.com/compliance/terms-and-conditions-for-appointments",
  },
  openGraph: {
    title: "Terms and Conditions for Appointments",
    description: "Terms and Conditions for Appointments in ReachGig",
    url: "https://www.reachgig.com/terms",
    type: "website",
    images: [
      {
        url: "https://www.reachgig.com/opengraph-image.png",
        width: 800,
        height: 600,
        alt: "Terms and Conditions for Appointments",
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
    <div className="relative flex flex-col items-center justify-start scroll-smooth lg:p-10 p-5">
      <div className={body}>
        <div className={section}>
          <div className={title}>
            <span className={textHighlight}>
              TERMS AND CONDITONS FOR APPOINTMENTS
            </span>
          </div>
          <div className={subtitle}>
            <span className={textHighlight}>Last updated</span>{" "}
            <span className={textHighlight}>June 02&#44; 2024</span>
          </div>
          <div>
            <span className={textHighlight}>AGREEMENT TO OUR LEGAL TERMS</span>
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
            &#39;&#41;&#44; the mobile application Reach &#40;the &#39;
            <span className={textHighlight}>App</span>&#39;&#41;&#44; as well as
            any other related products and services that refer or link to these
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
          <div data-custom-class="body_text">
            This agreement{" "}
            <span className={textHighlight}>(&quot;Terms&quot;)</span>
            governs the use of the ReachGig platform{" "}
            <span className={textHighlight}>(&quot;Platform&quot;)</span> for
            booking and appointment services between freelancers{" "}
            <span className={textHighlight}>(&quot;Freelancers&quot;)</span>,
            clients
            <span className={textHighlight}>(&quot;Clients&quot;)</span>, and
            ReachGig Corporation Private Limited{" "}
            <span className={textHighlight}>
              (&quot;We&quot; or &quot;Us&quot;)
            </span>
            .
          </div>
          <div data-custom-class="body_text">
            Users will be prompted about changes in the website or app.
            Continued usage of the website or app signifies their agreement to
            the updated Terms and Conditions.
          </div>
        </div>
        <div className="space-y-5">
          <div className={heading1}>
            <span className={textHighlight}>TABLE OF CONTENTS</span>
          </div>
          <div>
            <Link href="#appointment_process" className={link2}>
              1. APPOINTMENT PROCESS
            </Link>
          </div>
          <div>
            <Link href="#payement" className={link2}>
              2. PAYMENT PROCESSING
            </Link>
          </div>
          <div>
            <Link href="#responsibilities" className={link2}>
              3. CLIENT AND FREELANCER RESPONSIBILITIES
            </Link>
          </div>
          <div>
            <Link href="#liability" className={link2}>
              4. DISCLAIMER AND LIMITATION OF LIABILITY
            </Link>
          </div>
          <div>
            <Link href="#dispute" className={link2}>
              5. DISPUTE RESOLUTION
            </Link>
          </div>
          <div>
            <Link href="#termination" className={link2}>
              6. TERMINATION
            </Link>
          </div>
          <div>
            <Link href="#entire_agreement" className={link2}>
              7. ENTIRE AGREEMENT
            </Link>
          </div>
          <div>
            <Link href="#amendments" className={link2}>
              8. AMENDMENTS
            </Link>
          </div>
        </div>
        <div className={section}>
          <div id="appintment_process" className={heading1}>
            <span className={textHighlight}>1. APPOINTMENT PROCESS</span>
          </div>
          <div>
            <span className={textHighlight}>1.1</span> Freelancers can create
            appointments for their services on the platform. Clients can book
            appointments with the freelancers.
          </div>
          <div>
            <span className={textHighlight}>1.2</span> The appointment process
            includes the selection of the service, date, time, and location.
          </div>
          <div>
            <span className={textHighlight}>1.3</span> The appointment is
            confirmed once the client makes the payment.
          </div>
          <div>
            <span className={textHighlight}>1.4</span> The appointment details
            will be shared with the freelancer and client through the platform.
          </div>
          <div>
            <span className={textHighlight}>1.5</span> refer to the{" "}
            <Link className={link} href={"/compliance/refund-policy"}>
              Cancellation and Refund policy
            </Link>{" "}
            for more details about the appointment cancellation and refund
            process.
          </div>
        </div>
        <div className={section}>
          <div id="payement" className={heading1}>
            <span className={textHighlight}>2. PAYMENT PROCESSING</span>
          </div>
          <div>
            Freelancers can choose between handling payments themselves or using
            the platform to process payments. ReachGig will not be responsible
            for any payment disputes between the freelancer and the client if
            the freelancer chooses to handle payments themselves.If the
            freelancer chooses to use the platform to process payments, the
            following terms apply:
          </div>
          <div>
            <span className={textHighlight}>2.1</span> The payment will be
            processed through a secure third-party payment gateway.
          </div>
          <div>
            <span className={textHighlight}>2.2</span> The Client&lsquo;s
            payment will be held in escrow until after the appointment.
          </div>
          <div>
            <span className={textHighlight}>2.3</span> After the appointment,
            the Client has 1 day OR 24 hours to dispute the service. If no
            dispute is filed, the payment will be released to the Freelancer.
          </div>
          <div>
            <span className={textHighlight}>2.4</span> In case of a dispute, We
            will mediate to find a resolution. If no resolution is reached, the
            escrowed funds may be withheld or refunded partially based on the
            mediator&lsquo;s judgment.
          </div>
        </div>
        <div className={section}>
          <div id="responsibilities" className={heading1}>
            <span className={textHighlight}>
              3. CLIENT AND FREELANCER RESPONSIBILITIES
            </span>
          </div>
          <div>
            <span className={textHighlight}>3.1</span> Clients are responsible
            for:
            <ul className={list}>
              <li>
                Providing accurate information about the project scope in their
                booking request.
              </li>
              <li>Communicating clearly and promptly with the Freelancer.</li>
              <li>
                Paying for the booked services according to the agreed-upon
                rate.
              </li>
            </ul>
          </div>
          <div>
            <span className={textHighlight}>3.2</span> Freelancers are
            responsible for:
            <ul className={list}>
              <li>
                Providing accurate and up-to-date information on their profiles.
              </li>
              <li>Communicating clearly and promptly with the Client.</li>
              <li>
                Delivering the booked services to the best of their ability and
                adhering to professional standards.
              </li>
            </ul>
          </div>
        </div>
        <div className={section}>
          <div id="liability" className={heading1}>
            <span className={textHighlight}>
              4. DISCLAIMER AND LIMITATION OF LIABILITY
            </span>
          </div>
          <div>
            <span className={textHighlight}>4.1</span> We act as a facilitator
            for bookings and appointments. We do not guarantee the quality of
            services provided by Freelancers.
          </div>
          <div>
            <span className={textHighlight}>4.2</span> Freelancers are
            independent contractors and are solely responsible for the services
            they provide. We are not liable for any breach of contract,
            negligence, or other misconduct by a Freelancer.
          </div>
          <div>
            <span className={textHighlight}>4.3</span> Our total liability under
            this Agreement will be limited to the amount paid by the Client for
            the booking.
          </div>
        </div>
        <div className={section}>
          <div id="dispute" className={heading1}>
            <span className={textHighlight}>5. DISPUTE RESOLUTION</span>
          </div>
          <div>
            <span className={textHighlight}>5.1</span> We encourage Clients and
            Freelancers to resolve any disputes directly.
          </div>
          <div>
            <span className={textHighlight}>5.2</span> If a dispute cannot be
            resolved directly, We will attempt to mediate a solution.
          </div>
          <div>
            <span className={textHighlight}>5.3</span> This Agreement shall be
            governed by and construed in accordance with the laws of India.
          </div>
        </div>
        <div className={section}>
          <div id="termination" className={heading1}>
            <span className={textHighlight}>6. TERMINATION</span>
          </div>
          <div>
            <span className={textHighlight}>6.1</span> We may terminate your
            access to the Platform for violating these Terms or for any other
            reason, at our sole discretion.
          </div>
          <div>
            <span className={textHighlight}>6.2</span> You may terminate your
            use of the Platform at any time.
          </div>
          <div>
            <span className={textHighlight}>6.3</span> Upon termination, all
            rights and obligations of the parties will cease.
          </div>
        </div>
        <div className={section}>
          <div id="entire_agreement" className={heading1}>
            <span className={textHighlight}>7. ENTIRE AGREEMENT</span>
          </div>
          <div>
            <span className={textHighlight}>7.1</span> These Terms constitute
            the entire agreement between the parties concerning the subject
            matter hereof.
          </div>
          <div>
            <span className={textHighlight}>7.2</span> These Terms supersede any
            prior agreements or understandings between the parties.
          </div>
        </div>
        <div className={section}>
          <div id="amendments" className={heading1}>
            <span className={textHighlight}>8. AMENDMENTS</span>
          </div>
          <div>
            We reserve the right to modify these Terms at any time. We will
            notify you of any changes by posting the revised Terms on the
            Platform. Continued use of the Platform after any amendments will
            signify your agreement to the updated Terms.
          </div>
        </div>
      </div>
    </div>
  );
}
