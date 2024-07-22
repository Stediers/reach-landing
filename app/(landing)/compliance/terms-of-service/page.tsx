import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: {
    default: "Terms of Use",
    template: "%s | Terms of Use",
  },
  description: "Terms of Use for ReachGig",
  openGraph: {
    title: "Terms of Use",
    description: "Terms of Use for ReachGig",
    url: "https://reachgig.com/terms",
    type: "website",
    images: [
      {
        url: "",
        width: 800,
        height: 600,
        alt: "Terms of Use",
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
    <div className="relative flex flex-col items-center justify-start scroll-smooth lg:p-10 p-5">
      <div className={body}>
        <div className={section}>
          <div className={title}>
            <span className={textHighlight}>TERMS OF USE</span>
          </div>
          <div className={subtitle}>
            <span className={textHighlight}>Last updated</span>{" "}
            <span className={textHighlight}>December 18&#44; 2023</span>
          </div>
          <div>
            <span className={textHighlight}>AGREEMENT TO OUR LEGAL TERMS</span>
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
            These Legal Terms constitute a legally binding agreement made
            between you&#44; whether personally or on behalf of an entity
            &#40;&apos;
            <span className={textHighlight}>you</span>&apos;&#41;&#44; and
            Reachgig Corporation Private Limited&#44; concerning your access to
            and use of the Services. You agree that by accessing the
            Services&#44; you have read&#44; understood&#44; and agreed to be
            bound by all of these Legal Terms. IF YOU DO NOT AGREE WITH ALL OF
            THESE LEGAL TERMS&#44; THEN YOU ARE EXPRESSLY PROHIBITED FROM USING
            THE SERVICES AND YOU MUST DISCONTINUE USE IMMEDIATELY.
          </div>
          <div data-custom-class="body_text">
            Users will be prompted about changes in the website or app.
            Continued usage of the website or app signifies their agreement to
            the updated Terms and Conditions.
          </div>
        </div>
        <div className="space-y-5">
          <div data-custom-class="body_text">
            The Services are intended for users who are at least 18 years old.
            Persons under the age of 18 are not permitted to use or register for
            the Services.
          </div>
          <div data-custom-class="body_text">
            We recommend that you print a copy of these Legal Terms for your
            records.
          </div>
          <div className={heading1}>
            <span className={textHighlight}>TABLE OF CONTENTS</span>
          </div>
          <div>
            <Link href="#services" className={link2}>
              1. OUR SERVICES
            </Link>
          </div>
          <div>
            <Link href="#ip" className={link2}>
              2. INTELLECTUAL PROPERTY RIGHTS
            </Link>
          </div>
          <div>
            <Link href="#userreps" className={link2}>
              3. USER REPRESENTATIONS
            </Link>
          </div>
          <div>
            <Link href="#userreg" className={link2}>
              4. USER REGISTRATION
            </Link>
          </div>
          <div>
            <Link href="#purchases" className={link2}>
              5. PURCHASES AND PAYMENT
            </Link>
          </div>
          <div>
            <Link href="#returnno" className={link2}>
              6. POLICY
            </Link>
          </div>
          <div>
            <Link href="#prohibited" className={link2}>
              7. PROHIBITED ACTIVITIES
            </Link>
          </div>
          <div>
            <Link href="#ugc" className={link2}>
              8. USER GENERATED CONTRIBUTIONS
            </Link>
          </div>
          <div>
            <Link href="#license" className={link2}>
              9. CONTRIBUTION LICENCE&nbsp;
            </Link>
          </div>
          <div>
            <Link href="#reviews" className={link2}>
              10. GUIDELINES FOR REVIEWS
            </Link>
          </div>
          <div>
            <Link href="#mobile" className={link2}>
              11. MOBILE APPLICATION LICENCE
            </Link>
          </div>
          <div>
            <Link href="#socialmedia" className={link2}>
              12. SOCIAL MEDIA
            </Link>
          </div>
          <div>
            <Link href="#thirdparty" className={link2}>
              13. THIRD-PARTY WEBSITES AND CONTENT
            </Link>
          </div>
          <div>
            <Link href="#sitemanage" className={link2}>
              14. SERVICES MANAGEMENT
            </Link>
          </div>
          <div>
            <Link href="#ppno" className={link2}>
              15. PRIVACY POLICY
            </Link>
          </div>
          <div>
            <Link href="#copyrightno" className={link2}>
              16. COPYRIGHT INFRINGEMENTS
            </Link>
          </div>
          <div>
            <Link href="#terms" className={link2}>
              17. TERM AND TERMINATION
            </Link>
          </div>
          <div>
            <Link href="#modifications" className={link2}>
              18. MODIFICATIONS AND INTERRUPTIONS
            </Link>
          </div>
          <div>
            <Link href="#law" className={link2}>
              19. GOVERNING LAW
            </Link>
          </div>
          <div>
            <Link href="#disputes" className={link2}>
              20. DISPUTE RESOLUTION
            </Link>
          </div>
          <div>
            <Link href="#corrections" className={link2}>
              21. CORRECTIONS
            </Link>
          </div>
          <div>
            <Link href="#disclaimer" className={link2}>
              22. DISCLAIMER
            </Link>
          </div>
          <div>
            <Link href="#liability" className={link2}>
              23. LIMITATIONS OF LIABILITY
            </Link>
          </div>
          <div>
            <Link href="#indemnification" className={link2}>
              24. INDEMNIFICATION
            </Link>
          </div>
          <div>
            <Link href="#userdata" className={link2}>
              25. USER DATA
            </Link>
          </div>
          <div>
            <Link href="#electronic" className={link2}>
              26. ELECTRONIC COMMUNICATIONS&#44; TRANSACTIONS&#44; AND
              SIGNATURES
            </Link>
          </div>
          <div>
            <Link href="#misc" className={link2}>
              27. MISCELLANEOUS
            </Link>
          </div>
          <div>
            <Link href="#contact" className={link2}>
              28. CONTACT US
            </Link>
          </div>
        </div>
        <div id="services" className={section}>
          <div className={heading1}>
            <span className={textHighlight}>1. OUR SERVICES</span>
          </div>
          <div data-custom-class="body_text">
            The information provided when using the Services is not intended for
            distribution to or use by any person or entity in any jurisdiction
            or country where such distribution or use would be contrary to law
            or regulation or which would subject us to any registration
            requirement within such jurisdiction or country. Accordingly&#44;
            those persons who choose to access the Services from other locations
            do so on their own initiative and are solely responsible for
            compliance with local laws&#44; if and to the extent local laws are
            applicable.
          </div>
        </div>
        <div id="ip" className={section}>
          <div className={heading1}>
            <span className={textHighlight}>
              2. INTELLECTUAL PROPERTY RIGHTS
            </span>
          </div>
          <div>
            <div className={heading2}>
              <span className={textHighlight}>Our intellectual property</span>
            </div>
            <div data-custom-class="body_text">
              We are the owner or the licensee of all intellectual property
              rights in our Services&#44; including all source code&#44;
              databases&#44; functionality&#44; software&#44; website
              designs&#44; audio&#44; video&#44; text&#44; photographs&#44; and
              graphics in the Services &#40;collectively&#44; the
              &#39;Content&#39; &#41;&#44; as well as the trademarks&#44;
              service marks&#44; and logos contained therein &#40;the
              &#39;Marks&#39;&#41;.
            </div>
            <div data-custom-class="body_text">
              Our Content and Marks are protected by copyright and trademark
              laws &#40;and various other intellectual property rights and
              unfair competition laws&#41; and treaties in the United States and
              around the world.
            </div>
            <div data-custom-class="body_text">
              The Content and Marks are provided in or through the Services
              &#39;AS IS&#39; for your personal&#44; non-commercial use only.
            </div>
            <div className={heading2}>
              <span className={textHighlight}>Your use of our Services</span>
            </div>
            <div data-custom-class="body_text">
              Subject to your compliance with these Legal Terms&#44; including
              the &#39;
              <Link href="#prohibited" className={link}>
                PROHIBITED ACTIVITIES
              </Link>
              &#39; section below&#44; we grant you a non-exclusive&#44;
              non-transferable&#44; revocable licence to&#58;
            </div>
            <ul>
              <li data-custom-class="body_text">access the Services; and</li>
              <li data-custom-class="body_text">
                download or print a copy of any portion of the Content to which
                you have properly gained access.
              </li>
            </ul>
            <div data-custom-class="body_text">
              solely for your personal&#44; non-commercial use.
            </div>
            <div data-custom-class="body_text">
              Except as set out in this section or elsewhere in our Legal
              Terms&#44; no part of the Services and no Content or Marks may be
              copied&#44; reproduced&#44; aggregated&#44; republished&#44;
              uploaded&#44; posted&#44; publicly displayed&#44; encoded&#44;
              translated&#44; transmitted&#44; distributed&#44; sold&#44;
              licensed&#44; or otherwise exploited for any commercial purpose
              whatsoever&#44; without our express prior written permission.
            </div>
            <div data-custom-class="body_text">
              If you wish to make any use of the Services&#44; Content&#44; or
              Marks other than as set out in this section or elsewhere in our
              Legal Terms&#44; please address your request to&#58;
              reachgig.connect@gmail.com. If we ever grant you the permission to
              post&#44; reproduce&#44; or publicly display any part of our
              Services or Content&#44; you must identify us as the owners or
              licensors of the Services&#44; Content&#44; or Marks and ensure
              that any copyright or proprietary notice appears or is visible on
              posting&#44; reproducing&#44; or displaying our Content.
            </div>
          </div>
          <div>
            <div data-custom-class="body_text">
              We reserve all rights not expressly granted to you in and to the
              Services&#44; Content&#44; and Marks.
            </div>
            <div data-custom-class="body_text">
              Any breach of these Intellectual Property Rights will constitute
              Link material breach of our Legal Terms and your right to use our
              Services will terminate immediately.
            </div>
            <div className={heading2}>
              <span className={textHighlight}>
                Your submissions and contributions
              </span>
            </div>
            <div data-custom-class="body_text">
              Please review this section and the &#39;
              <Link href="#prohibited" className={link}>
                PROHIBITED ACTIVITIES
              </Link>
              &#39; section carefully prior to using our Services to understand
              the &#40;Link&#41; rights you give us and &#40;b&#41; obligations
              you have when you post or upload any content through the Services.
            </div>
            <div data-custom-class="body_text">
              <span className={textHighlight}>Submissions&#58;</span> By
              directly sending us any question&#44; comment&#44; suggestion&#44;
              idea&#44; feedback&#44; or other information about the Services
              &#40; &#39;Submissions&#39;&#41;&#44; you agree to assign to us
              all intellectual property rights in such Submission. You agree
              that we shall own this Submission and be entitled to its
              unrestricted use and dissemination for any lawful purpose&#44;
              commercial or otherwise&#44; without acknowledgment or
              compensation to you.
            </div>
            <div data-custom-class="body_text">
              <span className={textHighlight}>Contributions&#58;</span> The
              Services may invite you to chat&#44; contribute to&#44; or
              participate in blogs&#44; message boards&#44; online forums&#44;
              and other functionality during which you may create&#44;
              submit&#44; post&#44; display&#44; transmit&#44; publish&#44;
              distribute&#44; or broadcast content and materials to us or
              through the Services&#44; including but not limited to text&#44;
              writings&#44; video&#44; audio&#44; photographs&#44; music&#44;
              graphics&#44; comments&#44; reviews&#44; rating suggestions&#44;
              personal information&#44; or other material
              &#40;&#39;Contributions&#39;&#41;. Any Submission that is publicly
              posted shall also be treated as Link Contribution.
            </div>
            <div data-custom-class="body_text">
              You understand that Contributions may be viewable by other users
              of the Services and possibly through third-party websites.
            </div>
            <div data-custom-class="body_text">
              <span className={textHighlight}>
                When you post Contributions&#44; you grant us Link licence
                &#40;including use of your name&#44; trademarks&#44; and
                logos&#41;&#58;&nbsp;
              </span>
              By posting any Contributions&#44; you grant us an
              unrestricted&#44; unlimited&#44; irrevocable&#44; perpetual&#44;
              non-exclusive&#44; transferable&#44; royalty-free&#44;
              fully-paid&#44; worldwide right&#44; and licence to&#58; use&#44;
              copy&#44; reproduce&#44; distribute&#44; sell&#44; resell&#44;
              publish&#44; broadcast&#44; retitle&#44; store&#44; publicly
              perform&#44; publicly display&#44; reformat&#44; translate&#44;
              excerpt &#40;in whole or in part&#41;&#44; and exploit your
              Contributions &#40;including&#44; without limitation&#44; your
              image&#44; name&#44; and voice&#41; for any purpose&#44;
              commercial&#44; advertising&#44; or otherwise&#44; to prepare
              derivative works of&#44; or incorporate into other works&#44; your
              Contributions&#44; and to sublicence the licences granted in this
              section. Our use and distribution may occur in any media formats
              and through any media channels.
            </div>
            <div data-custom-class="body_text">
              This licence includes our use of your name&#44; company name&#44;
              and franchise name&#44; as applicable&#44; and any of the
              trademarks&#44; service marks&#44; trade names&#44; logos&#44; and
              personal and commercial images you provide.
            </div>
            <div data-custom-class="body_text">
              <span className={textHighlight}>
                You are responsible for what you post or upload&#58;
              </span>
              &nbsp; By sending us Submissions and/or posting Contributions
              through any part of the Services or making Contributions
              accessible through the Services by linking your account through
              the Services to any of your social networking accounts&#44;
              you&#58;
            </div>
            <ul>
              <li data-custom-class="body_text">
                confirm that you have read and agree with our &#39;
                <Link href="#prohibited" className={link}>
                  PROHIBITED ACTIVITIES
                </Link>
                &#39; and will not post&#44; send&#44; publish&#44; upload&#44;
                or transmit through the Services any Submission nor post any
                Contribution that is illegal&#44; harassing&#44; hateful&#44;
                harmful&#44; defamatory&#44; obscene&#44; bullying&#44;
                abusive&#44; discriminatory&#44; threatening to any person or
                group&#44; sexually explicit&#44; false&#44; inaccurate&#44;
                deceitful&#44; or misleading;
              </li>
              <li data-custom-class="body_text">
                to the extent permissible by applicable law&#44; waive any and
                all moral rights to any such Submission and/or Contribution;
              </li>
              <li data-custom-class="body_text">
                warrant that any such Submission and/or Contributions are
                original to you or that you have the necessary rights and
                licences to submit such Submissions and/or Contributions and
                that you have full authority to grant us the above-mentioned
                rights in relation to your Submissions and/or Contributions; and
              </li>
              <li data-custom-class="body_text">
                warrant and represent that your Submissions and/or Contributions
                do not constitute confidential information.
              </li>
            </ul>
            <div data-custom-class="body_text">
              You are solely responsible for your Submissions and/or
              Contributions and you expressly agree to reimburse us for any and
              all losses that we may suffer because of your breach of
              &#40;Link&#41; this section&#44; &#40;b&#41; any third
              party&rsquo;s intellectual property rights&#44; or &#40;c&#41;
              applicable law.
            </div>
            <div data-custom-class="body_text">
              <span className={textHighlight}>
                We may remove or edit your Content&#58;
              </span>{" "}
              Although we have no obligation to monitor any Contributions&#44;
              we shall have the right to remove or edit any Contributions at any
              time without notice if in our reasonable opinion we consider such
              Contributions harmful or in breach of these Legal Terms. If we
              remove or edit any such Contributions&#44; we may also suspend or
              disable your account and report you to the authorities.
            </div>
            <div className={heading2}>
              <span className={textHighlight}>Copyright infringement</span>
            </div>
            <div data-custom-class="body_text">
              We respect the intellectual property rights of others. If you
              believe that any material available on or through the Services
              infringes upon any copyright you own or control&#44; please
              immediately refer to the &#39;
              <Link href="#copyrightno" className={link}>
                COPYRIGHT INFRINGEMENTS&nbsp;
              </Link>
              &#39; section below.
            </div>
          </div>
        </div>
        <div id="userreps" className={section}>
          <div className={heading1}>
            <span className={textHighlight}>
              <span className={textHighlight}>3.</span>&nbsp; USER
              REPRESENTATIONS
            </span>
          </div>
          <div data-custom-class="body_text">
            By using the Services&#44; you represent and warrant that&#58;
            &#40;1&#41; all registration information you submit will be
            true&#44; accurate&#44; current&#44; and complete; &#40;2&#41; you
            will maintain the accuracy of such information and promptly update
            such registration information as necessary; &#40;3&#41; you have the
            legal capacity and you agree to comply with these Legal Terms;
            &#40;4&#41; you are not a minor in the jurisdiction in which you
            reside ; &#40;5&#41; you will not access the Services through
            automated or non-human means&#44; whether through a bot&#44; script
            or otherwise; &#40;6&#41; you will not use the Services for any
            illegal or unauthorised purpose; and &#40;7&#41; your use of the
            Services will not violate any applicable law or regulation.
          </div>
          <div data-custom-class="body_text">
            If you provide any information that is untrue&#44; inaccurate&#44;
            not current&#44; or incomplete&#44; we have the right to suspend or
            terminate your account and refuse any and all current or future use
            of the Services &#40;or any portion thereof&#41;.
          </div>
        </div>
        <div>
          <div id="userreg" className={section}>
            <div className={heading1}>
              <span className={textHighlight}>
                <span className={textHighlight}>4.</span>&nbsp; USER
                REGISTRATION
              </span>
            </div>
            <div data-custom-class="body_text">
              You may be required to register to use the Services. You agree to
              keep your password confidential and will be responsible for all
              use of your account and password. We reserve the right to
              remove&#44; reclaim&#44; or change a username you select if we
              determine&#44; in our sole discretion&#44; that such username is
              inappropriate&#44; obscene&#44; or otherwise objectionable.
            </div>
          </div>
        </div>
        <div id="purchases" className={section}>
          <div>
            <div className={heading1}>
              <span className={textHighlight}>
                <span className={textHighlight}>5.</span>&nbsp; PURCHASES AND
                PAYMENT
              </span>
            </div>
          </div>
          <div>
            <div data-custom-class="body_text">
              We accept the following forms of payment&#58;
            </div>
            <div>&nbsp;</div>
            <div data-custom-class="body_text">- Visa</div>
            <div data-custom-class="body_text">- Mastercard</div>
            <div data-custom-class="body_text">- UPI</div>
            <div data-custom-class="body_text">
              You agree to provide current&#44; complete&#44; and accurate
              purchase and account information for all purchases made via the
              Services. You further agree to promptly update account and payment
              information&#44; including email address&#44; payment method&#44;
              and payment card expiration date&#44; so that we can complete your
              transactions and contact you as needed. Sales tax will be added to
              the price of purchases as deemed required by us. We may change
              prices at any time. All payments shall be&nbsp;in INR.
            </div>
          </div>
          <div>
            <div data-custom-class="body_text">
              You agree to pay all charges at the prices then in effect for your
              purchases and any applicable shipping fees&#44; and you authorise
              us to charge your chosen payment provider for any such amounts
              upon placing your order. We reserve the right to correct any
              errors or mistakes in pricing&#44; even if we have already
              requested or received payment.
            </div>
          </div>
          <div data-custom-class="body_text">
            We reserve the right to refuse any order placed through the
            Services. We may&#44; in our sole discretion&#44; limit or cancel
            quantities purchased per person&#44; per household&#44; or per
            order. These restrictions may include orders placed by or under the
            same customer account&#44; the same payment method&#44; and/or
            orders that use the same billing or shipping address. We reserve the
            right to limit or prohibit orders that&#44; in our sole
            judgement&#44; appear to be placed by dealers&#44; resellers&#44; or
            distributors.
          </div>
        </div>
        <div id="returnno" className={section}>
          <div className={heading1}>
            <span className={textHighlight}>6. POLICY</span>
          </div>
          <div data-custom-class="body_text">
            Please refer to the Cancellation and Refund Policy for cancellation
            and refunds terms in relation to usage of the Platform for availing
            Services.
          </div>
          <div data-custom-class="body_text">
            We use Google Maps API for locating and verifying addresses. By
            using our platform you are also bound by Google&#39;s{" "}
            <Link
              rel="noopener noreferrer"
              target="_blank"
              className={link}
              href="https://policies.google.com/terms?hl=en-US"
            >
              Terms of Service.
            </Link>
          </div>
        </div>
        <div id="prohibited" className={section}>
          <div className={heading1}>
            <span className={textHighlight}>
              <span className={textHighlight}>7.</span>
              &nbsp; PROHIBITED ACTIVITIES
            </span>
          </div>
          <div>
            <div data-custom-class="body_text">
              You may not access or use the Services for any purpose other than
              that for which we make the Services available. The Services may
              not be used in connection with any commercial endeavours except
              those that are specifically endorsed or approved by us.
            </div>
          </div>
          <div>
            <div>
              <div data-custom-class="body_text">
                As a user of the Services&#44; you agree not to&#58;
              </div>
            </div>
            <ul className={list}>
              <li data-custom-class="body_text">
                Systematically retrieve data or other content from the Services
                to create or compile&#44; directly or indirectly&#44; a
                collection&#44; compilation&#44; database&#44; or directory
                without written permission from us.
              </li>
              <li data-custom-class="body_text">
                Trick&#44; defraud&#44; or mislead us and other users&#44;
                especially in any attempt to learn sensitive account information
                such as user passwords.
              </li>
              <li data-custom-class="body_text">
                Circumvent&#44; disable&#44; or otherwise interfere with
                security-related features of the Services&#44; including
                features that prevent or restrict the use or copying of any
                Content or enforce limitations on the use of the Services and/or
                the Content contained therein.
              </li>
              <li data-custom-class="body_text">
                Disparage&#44; tarnish&#44; or otherwise harm&#44; in our
                opinion&#44; us and/or the Services.
              </li>
              <li data-custom-class="body_text">
                Use any information obtained from the Services in order to
                harass&#44; abuse&#44; or harm another person.
              </li>
              <li data-custom-class="body_text">
                Make improper use of our support services or submit false
                reports of abuse or misconduct.
              </li>
              <li data-custom-class="body_text">
                Use the Services in a manner inconsistent with any applicable
                laws or regulations.
              </li>
              <li data-custom-class="body_text">
                Engage in unauthorised framing of or linking to the Services.
              </li>
              <li data-custom-class="body_text">
                Upload or transmit &#40;or attempt to upload or to transmit&#41;
                viruses&#44; Trojan horses&#44; or other material&#44; including
                excessive use of capital letters and spamming &#40;continuous
                posting of repetitive text&#41;&#44; that interferes with any
                party&rsquo;s uninterrupted use and enjoyment of the Services or
                modifies&#44; impairs&#44; disrupts&#44; alters&#44; or
                interferes with the use&#44; features&#44; functions&#44;
                operation&#44; or maintenance of the Services.
              </li>
              <li data-custom-class="body_text">
                Engage in any automated use of the system&#44; such as using
                scripts to send comments or messages&#44; or using any data
                mining&#44; robots&#44; or similar data gathering and extraction
                tools.
              </li>
              <li data-custom-class="body_text">
                Delete the copyright or other proprietary rights notice from any
                Content.
              </li>
              <li data-custom-class="body_text">
                Attempt to impersonate another user or person or use the
                username of another user.
              </li>
              <li data-custom-class="body_text">
                Upload or transmit &#40;or attempt to upload or to transmit&#41;
                any material that acts as a passive or active information
                collection or transmission mechanism&#44; including without
                limitation&#44; clear graphics interchange formats &#40;
                &#39;gifs&#39; &#41;&#44; 1&times;1 pixels&#44; web bugs&#44;
                cookies&#44; or other similar devices &#40;sometimes referred to
                as &#39;spyware&#39; or &#39;passive collection mechanisms&#39;
                or &#39;pcms&#39; &#41;.
              </li>
              <li data-custom-class="body_text">
                Interfere with&#44; disrupt&#44; or create an undue burden on
                the Services or the networks or services connected to the
                Services.
              </li>
              <li data-custom-class="body_text">
                Harass&#44; annoy&#44; intimidate&#44; or threaten any of our
                employees or agents engaged in providing any portion of the
                Services to you.
              </li>
              <li data-custom-class="body_text">
                Attempt to bypass any measures of the Services designed to
                prevent or restrict access to the Services&#44; or any portion
                of the Services.
              </li>
              <li data-custom-class="body_text">
                Copy or adapt the Services&#39; software&#44; including but not
                limited to Flash&#44; PHP&#44; HTML&#44; JavaScript&#44; or
                other code.
              </li>
              <li data-custom-class="body_text">
                Except as permitted by applicable law&#44; decipher&#44;
                decompile&#44; disassemble&#44; or reverse engineer any of the
                software comprising or in any way making up a part of the
                Services.
              </li>
              <li data-custom-class="body_text">
                Except as may be the result of standard search engine or
                Internet browser usage&#44; use&#44; launch&#44; develop&#44; or
                distribute any automated system&#44; including without
                limitation&#44; any spider&#44; robot&#44; cheat utility&#44;
                scraper&#44; or offline reader that accesses the Services&#44;
                or use or launch any unauthorised script or other software.
              </li>
              <li data-custom-class="body_text">
                Use a buying agent or purchasing agent to make purchases on the
                Services.
              </li>
              <li data-custom-class="body_text">
                Make any unauthorised use of the Services&#44; including
                collecting usernames and/or email addresses of users by
                electronic or other means for the purpose of sending unsolicited
                email&#44; or creating user accounts by automated means or under
                false pretences .
              </li>
              <li data-custom-class="body_text">
                Use the Services as part of any effort to compete with us or
                otherwise use the Services and/or the Content for any
                revenue-generating endeavour or commercial enterprise.
              </li>
              <li data-custom-class="body_text">
                Sell or otherwise transfer your profile.
              </li>
              <li data-custom-class="body_text">Illegal activities</li>
              <li data-custom-class="body_text">
                Advertise other platforms that are similar to Reach
              </li>
              <li data-custom-class="body_text">
                Offer services that incite or involve violence
              </li>
              <li data-custom-class="body_text">
                Discriminate other users based on caste&#44; creed or religion
              </li>
            </ul>
          </div>
        </div>
        <div id="ugc" className={section}>
          <div className={heading1}>
            <span className={textHighlight}>
              <span className={textHighlight}>8.</span>&nbsp; USER GENERATED
              CONTRIBUTIONS
            </span>
          </div>
          <div data-custom-class="body_text">
            The Services may invite you to chat&#44; contribute to&#44; or
            participate in blogs&#44; message boards&#44; online forums&#44; and
            other functionality&#44; and may provide you with the opportunity to
            create&#44; submit&#44; post&#44; display&#44; transmit&#44;
            perform&#44; publish&#44; distribute&#44; or broadcast content and
            materials to us or on the Services&#44; including but not limited to
            text&#44; writings&#44; video&#44; audio&#44; photographs&#44;
            graphics&#44; comments&#44; suggestions&#44; or personal information
            or other material &#40;collectively&#44; &#39;Contributions&#39;
            &#41;. Contributions may be viewable by other users of the Services
            and through third-party websites. As such&#44; any Contributions you
            transmit may be treated as non-confidential and non-proprietary.
            When you create or make available any Contributions&#44; you thereby
            represent and warrant that&#58;
          </div>
          <ul className={list}>
            <li data-custom-class="body_text">
              The creation&#44; distribution&#44; transmission&#44; public
              display&#44; or performance&#44; and the accessing&#44;
              downloading&#44; or copying of your Contributions do not and will
              not infringe the proprietary rights&#44; including but not limited
              to the copyright&#44; patent&#44; trademark&#44; trade secret&#44;
              or moral rights of any third party.
            </li>
            <li data-custom-class="body_text">
              You are the creator and owner of or have the necessary licences
              &#44; rights&#44; consents&#44; releases&#44; and permissions to
              use and to authorise us&#44; the Services&#44; and other users of
              the Services to use your Contributions in any manner contemplated
              by the Services and these Legal Terms.
            </li>
            <li data-custom-class="body_text">
              You have the written consent&#44; release&#44; and/or permission
              of each and every identifiable individual person in your
              Contributions to use the name or likeness of each and every such
              identifiable individual person to enable inclusion and use of your
              Contributions in any manner contemplated by the Services and these
              Legal Terms.
            </li>
            <li data-custom-class="body_text">
              Your Contributions are not false&#44; inaccurate&#44; or
              misleading.
            </li>
            <li data-custom-class="body_text">
              Your Contributions are not unsolicited or unauthorised
              advertising&#44; promotional materials&#44; pyramid schemes&#44;
              chain letters&#44; spam&#44; mass mailings&#44; or other forms of
              solicitation.
            </li>
            <li data-custom-class="body_text">
              Your Contributions are not obscene&#44; lewd&#44; lascivious&#44;
              filthy&#44; violent&#44; harassing&#44; libellous &#44;
              slanderous&#44; or otherwise objectionable &#40;as determined by
              us&#41;.
            </li>
            <li data-custom-class="body_text">
              Your Contributions do not ridicule&#44; mock&#44; disparage&#44;
              intimidate&#44; or abuse anyone.
            </li>
            <li data-custom-class="body_text">
              Your Contributions are not used to harass or threaten &#40;in the
              legal sense of those terms&#41; any other person and to promote
              violence against a specific person or class of people.
            </li>
            <li data-custom-class="body_text">
              Your Contributions do not violate any applicable law&#44;
              regulation&#44; or rule.
            </li>
            <li data-custom-class="body_text">
              Your Contributions do not violate the privacy or publicity rights
              of any third party.
            </li>
            <li data-custom-class="body_text">
              Your Contributions do not violate any applicable law concerning
              child pornography&#44; or otherwise intended to protect the health
              or well-being of minors.
            </li>
            <li data-custom-class="body_text">
              Your Contributions do not include any offensive comments that are
              connected to race&#44; national origin&#44; gender&#44; sexual
              preference&#44; or physical handicap.
            </li>
            <li data-custom-class="body_text">
              Your Contributions do not otherwise violate&#44; or a to material
              that violates&#44; any provision of these Legal Terms&#44; or any
              applicable law or regulation.
            </li>
          </ul>
          <div data-custom-class="body_text">
            Any use of the Services in violation of the foregoing violates these
            Legal Terms and may result in&#44; among other things&#44;
            termination or suspension of your rights to use the Services.
          </div>
        </div>
        <div id="license" className={section}>
          <div className={heading1}>
            <span className={textHighlight}>
              <span className={textHighlight}>9.</span>&nbsp; CONTRIBUTION
              LICENCE
            </span>
          </div>
          <div data-custom-class="body_text">
            By posting your Contributions to any part of the Services or making
            Contributions accessible to the Services by linking your account
            from the Services to any of your social networking accounts &#44;
            you automatically grant&#44; and you represent and warrant that you
            have the right to grant&#44; to us an unrestricted&#44;
            unlimited&#44; irrevocable&#44; perpetual&#44; non-exclusive&#44;
            transferable&#44; royalty-free&#44; fully-paid&#44; worldwide
            right&#44; and licence to host&#44; use&#44; copy&#44;
            reproduce&#44; disclose&#44; sell&#44; resell&#44; publish&#44;
            broadcast&#44; retitle&#44; archive&#44; store&#44; cache&#44;
            publicly perform&#44; publicly display&#44; reformat&#44;
            translate&#44; transmit&#44; excerpt &#40;in whole or in
            part&#41;&#44; and distribute such Contributions &#40;including&#44;
            without limitation&#44; your image and voice&#41; for any
            purpose&#44; commercial&#44; advertising&#44; or otherwise&#44; and
            to prepare derivative works of&#44; or incorporate into other
            works&#44; such Contributions&#44; and grant and authorise
            sublicences of the foregoing. The use and distribution may occur in
            any media formats and through any media channels.
          </div>
          <div data-custom-class="body_text">
            This licence will apply to any form&#44; media&#44; or technology
            now known or hereafter developed&#44; and includes our use of your
            name&#44; company name&#44; and franchise name&#44; as
            applicable&#44; and any of the trademarks&#44; service marks&#44;
            trade names&#44; logos&#44; and personal and commercial images you
            provide. You waive all moral rights in your Contributions&#44; and
            you warrant that moral rights have not otherwise been asserted in
            your Contributions.
          </div>
          <div data-custom-class="body_text">
            We do not assert any ownership over your Contributions. You retain
            full ownership of all of your Contributions and any intellectual
            property rights or other proprietary rights associated with your
            Contributions. We are not liable for any statements or
            representations in your Contributions provided by you in any area on
            the Services. You are solely responsible for your Contributions to
            the Services and you expressly agree to exonerate us from any and
            all responsibility and to refrain from any legal action against us
            regarding your Contributions.
          </div>
          <div data-custom-class="body_text">
            We have the right&#44; in our sole and absolute discretion&#44;
            &#40;1&#41; to edit&#44; redact&#44; or otherwise change any
            Contributions; &#40;2&#41; to re-categorise any Contributions to
            place them in more appropriate locations on the Services; and
            &#40;3&#41; to pre-screen or delete any Contributions at any time
            and for any reason&#44; without notice. We have no obligation to
            monitor your Contributions.
          </div>
        </div>
        <div id="reviews" className={section}>
          <div className={heading1}>
            <span className={textHighlight}>
              <span className={textHighlight}>10.</span>&nbsp; GUIDELINES FOR
              REVIEWS
            </span>
          </div>
          <div data-custom-class="body_text">
            We may provide you areas on the Services to leave reviews or
            ratings. When posting a review&#44; you must comply with the
            following criteria&#58; &#40;1&#41; you should have firsthand
            experience with the person/entity being reviewed; &#40;2&#41; your
            reviews should not contain offensive profanity&#44; or abusive&#44;
            racist&#44; offensive&#44; or hateful language; &#40;3&#41; your
            reviews should not contain discriminatory references based on
            religion&#44; race&#44; gender&#44; national origin&#44; age&#44;
            marital status&#44; sexual orientation&#44; or disability;
            &#40;4&#41; your reviews should not contain references to illegal
            activity; &#40;5&#41; you should not be affiliated with competitors
            if posting negative reviews; &#40;6&#41; you should not make any
            conclusions as to the legality of conduct; &#40;7&#41; you may not
            post any false or misleading statements; and &#40;8&#41; you may not
            organise a campaign encouraging others to post reviews&#44; whether
            positive or negative.
          </div>
          <div data-custom-class="body_text">
            We may accept&#44; reject&#44; or remove reviews in our sole
            discretion. We have absolutely no obligation to screen reviews or to
            delete reviews&#44; even if anyone considers reviews objectionable
            or inaccurate. Reviews are not endorsed by us&#44; and do not
            necessarily represent our opinions or the views of any of our
            affiliates or partners. We do not assume liability for any review or
            for any claims&#44; liabilities&#44; or losses resulting from any
            review. By posting a review&#44; you hereby grant to us a
            perpetual&#44; non-exclusive&#44; worldwide&#44; royalty-free&#44;
            fully paid&#44; assignable&#44; and sublicensable right and licence
            to reproduce&#44; modify&#44; translate&#44; transmit by any
            means&#44; display&#44; perform&#44; and/or distribute all content
            relating to review.
          </div>
        </div>
        <div id="mobile" className={section}>
          <div className={heading1}>
            <span className={textHighlight}>
              <span className={textHighlight}>11.</span>&nbsp; MOBILE
              APPLICATION LICENCE
            </span>
          </div>
          <div className={heading2}>
            <span className={textHighlight}>Use Licence</span>
          </div>
          <div data-custom-class="body_text">
            If you access the Services via the App&#44; then we grant you a
            revocable&#44; non-exclusive&#44; non-transferable&#44; limited
            right to install and use the App on wireless electronic devices
            owned or controlled by you&#44; and to access and use the App on
            such devices strictly in accordance with the terms and conditions of
            this mobile application licence contained in these Legal Terms. You
            shall not&#58; &#40;1&#41; except as permitted by applicable
            law&#44; decompile&#44; reverse engineer&#44; disassemble&#44;
            attempt to derive the source code of&#44; or decrypt the App;
            &#40;2&#41; make any modification&#44; adaptation&#44;
            improvement&#44; enhancement&#44; translation&#44; or derivative
            work from the App; &#40;3&#41; violate any applicable laws&#44;
            rules&#44; or regulations in connection with your access or use of
            the App; &#40;4&#41; remove&#44; alter&#44; or obscure any
            proprietary notice &#40;including any notice of copyright or
            trademark&#41; posted by us or the licensors of the App; &#40;5&#41;
            use the App for any revenue-generating endeavour&#44; commercial
            enterprise&#44; or other purpose for which it is not designed or
            intended; &#40;6&#41; make the App available over a network or other
            environment permitting access or use by multiple devices or users at
            the same time; &#40;7&#41; use the App for creating a product&#44;
            service&#44; or software that is&#44; directly or indirectly&#44;
            competitive with or in any way a substitute for the App; &#40;8&#41;
            use the App to send automated queries to any website or to send any
            unsolicited commercial email; or &#40;9&#41; use any proprietary
            information or any of our interfaces or our other intellectual
            property in the design&#44; development&#44; manufacture&#44;
            licensing&#44; or distribution of any applications&#44;
            accessories&#44; or devices for use with the App.
          </div>
          <div className={heading2}>
            <span className={textHighlight}>Apple and Android Devices</span>
          </div>
          <div data-custom-class="body_text">
            The following terms apply when you use the App obtained from either
            the Apple Store or Google Play &#40;each an &#39;App
            Distributor&#39; &#41; to access the Services&#58; &#40;1&#41; the
            licence granted to you for our App is limited to a non-transferable
            licence to use the application on a device that utilises the Apple
            iOS or Android operating systems&#44; as applicable&#44; and in
            accordance with the usage rules set forth in the applicable App
            Distributor&rsquo;s terms of service; &#40;2&#41; we are responsible
            for providing any maintenance and support services with respect to
            the App as specified in the terms and conditions of this mobile
            application licence contained in these Legal Terms or as otherwise
            required under applicable law&#44; and you acknowledge that each App
            Distributor has no obligation whatsoever to furnish any maintenance
            and support services with respect to the App; &#40;3&#41; in the
            event of any failure of the App to conform to any applicable
            warranty&#44; you may notify the applicable App Distributor&#44; and
            the App Distributor&#44; in accordance with its terms and
            policies&#44; may refund the purchase price&#44; if any&#44; paid
            for the App&#44; and to the maximum extent permitted by applicable
            law&#44; the App Distributor will have no other warranty obligation
            whatsoever with respect to the App; &#40;4&#41; you represent and
            warrant that &#40;i&#41; you are not located in a country that is
            subject to a US government embargo&#44; or that has been designated
            by the US government as a &#39;terrorist supporting&#39; country and
            &#40;ii&#41; you are not listed on any US government list of
            prohibited or restricted parties; &#40;5&#41; you must comply with
            applicable third-party terms of agreement when using the App&#44;
            e.g. if you have a VoIP application&#44; then you must not be in
            violation of their wireless data service agreement when using the
            App; and &#40;6&#41; you acknowledge and agree that the App
            Distributors are third-party beneficiaries of the terms and
            conditions in this mobile application licence contained in these
            Legal Terms&#44; and that each App Distributor will have the right
            &#40;and will be deemed to have accepted the right&#41; to enforce
            the terms and conditions in this mobile application licence
            contained in these Legal Terms against you as a third-party
            beneficiary thereof.
          </div>
        </div>
        <div id="socialmedia" className={section}>
          <div className={heading1}>
            <span className={textHighlight}>
              <span className={textHighlight}>12.</span>&nbsp; SOCIAL MEDIA
            </span>
          </div>
          <div>
            <br />
            <div data-custom-class="body_text">
              As part of the functionality of the Services&#44; you may a your
              account with online accounts you have with third-party service
              providers &#40;each such account&#44; a &#39;Third-Party
              Account&#39;&#41; by either&#58; &#40;1&#41; providing your
              Third-Party Account login information through the Services; or
              &#40;2&#41; allowing us to access your Third-Party Account&#44; as
              is permitted under the applicable terms and conditions that govern
              your use of each Third-Party Account. You represent and warrant
              that you are entitled to disclose your Third-Party Account login
              information to us and/or grant us access to your Third-Party
              Account&#44; without breach by you of any of the terms and
              conditions that govern your use of the applicable Third-Party
              Account&#44; and without obligating us to pay any fees or making
              us subject to any usage limitations imposed by the third-party
              service provider of the Third-Party Account. By granting us access
              to any Third-Party Accounts&#44; you understand that &#40;1&#41;
              we may access&#44; make available&#44; and store &#40;if
              applicable&#41; any content that you have provided to and stored
              in your Third-Party Account &#40;the &#39;Social Network
              Content&#39;&#41; so that it is available on and through the
              Services via your account&#44; including without limitation any
              friend lists and &#40;2&#41; we may submit to and receive from
              your Third-Party Account additional information to the extent you
              are notified when you a your account with the Third-Party Account.
              Depending on the Third-Party Accounts you choose and subject to
              the privacy settings that you have set in such Third-Party
              Accounts&#44; personally identifiable information that you post to
              your Third-Party Accounts may be available on and through your
              account on the Services. Please note that if a Third-Party Account
              or associated service becomes unavailable or our access to such
              Third-Party Account is terminated by the third-party service
              provider&#44; then Social Network Content may no longer be
              available on and through the Services. You will have the ability
              to disable the connection between your account on the Services and
              your Third-Party Accounts at any time. PLEASE NOTE THAT YOUR
              RELATIONSHIP WITH THE THIRD-PARTY SERVICE PROVIDERS ASSOCIATED
              WITH YOUR THIRD-PARTY ACCOUNTS IS GOVERNED SOLELY BY YOUR
              AGREEMENT&#40;S&#41; WITH SUCH THIRD-PARTY SERVICE PROVIDERS. We
              make no effort to review any Social Network Content for any
              purpose&#44; including but not limited to&#44; for accuracy&#44;
              legality&#44; or non-infringement&#44; and we are not responsible
              for any Social Network Content. You acknowledge and agree that we
              may access your email address book associated with a Third-Party
              Account and your contacts list stored on your mobile device or
              tablet computer solely for purposes of identifying and informing
              you of those contacts who have also registered to use the
              Services. You can deactivate the connection between the Services
              and your Third-Party Account by contacting us using the contact
              information below or through your account settings &#40;if
              applicable&#41;. We will attempt to delete any information stored
              on our servers that was obtained through such Third-Party
              Account&#44; except the username and profile picture that become
              associated with your account.
            </div>
          </div>
        </div>
        <div id="thirdparty" className={section}>
          <div className={heading1}>
            <span className={textHighlight}>
              <span className={textHighlight}>13.</span>
              &nbsp;THIRD-PARTY WEBSITES AND CONTENT
            </span>
          </div>
          <div data-custom-class="body_text">
            The Services may contain &#40;or you may be sent via the Site or App
            &#41; links to other websites &#40;&#39;Third-Party Websites&#39;
            &#41; as well as articles&#44; photographs&#44; text&#44;
            graphics&#44; pictures&#44; designs&#44; music&#44; sound&#44;
            video&#44; information&#44; applications&#44; software&#44; and
            other content or items belonging to or originating from third
            parties &#40;&#39;Third-Party Content&#39;&#41;. Such Third-Party
            Websites and Third-Party Content are not investigated&#44;
            monitored&#44; or checked for accuracy&#44; appropriateness&#44; or
            completeness by us&#44; and we are not responsible for any
            Third-Party Websites accessed through the Services or any
            Third-Party Content posted on&#44; available through&#44; or
            installed from the Services&#44; including the content&#44;
            accuracy&#44; offensiveness&#44; opinions&#44; reliability&#44;
            privacy practices&#44; or other policies of or contained in the
            Third-Party Websites or the Third-Party Content. Inclusion of&#44;
            linking to&#44; or permitting the use or installation of any
            Third-Party Websites or any Third-Party&nbsp;Content does not imply
            approval or endorsement thereof by us. If you decide to leave the
            Services and access the Third-Party Websites or to use or install
            any Third-Party Content&#44; you do so at your own risk&#44; and you
            should be aware these Legal Terms no longer govern. You should
            review the applicable terms and policies&#44; including privacy and
            data gathering practices&#44; of any website to which you navigate
            from the Services or relating to any applications you use or install
            from the Services. Any purchases you make through Third-Party
            Websites will be through other websites and from other
            companies&#44; and we take no responsibility whatsoever in relation
            to such purchases which are exclusively between you and the
            applicable third party. You agree and acknowledge that we do not
            endorse the products or services offered on Third-Party Websites and
            you shall hold us blameless from any harm caused by your purchase of
            such products or services. Additionally&#44; you shall hold us
            blameless from any losses sustained by you or harm caused to you
            relating to or resulting in any way from any Third-Party Content or
            any contact with Third-Party Websites.
          </div>
        </div>
        <div id="sitemanage" className={section}>
          <div className={heading1}>
            <span className={textHighlight}>
              <span className={textHighlight}>14.</span>&nbsp; SERVICES
              MANAGEMENT
            </span>
          </div>
          <div data-custom-class="body_text">
            We reserve the right&#44; but not the obligation&#44; to&#58;
            &#40;1&#41; monitor the Services for violations of these Legal
            Terms; &#40;2&#41; take appropriate legal action against anyone
            who&#44; in our sole discretion&#44; violates the law or these Legal
            Terms&#44; including without limitation&#44; reporting such user to
            law enforcement authorities; &#40;3&#41; in our sole discretion and
            without limitation&#44; refuse&#44; restrict access to&#44; limit
            the availability of&#44; or disable &#40;to the extent
            technologically feasible&#41; any of your Contributions or any
            portion thereof; &#40;4&#41; in our sole discretion and without
            limitation&#44; notice&#44; or liability&#44; to remove from the
            Services or otherwise disable all files and content that are
            excessive in size or are in any way burdensome to our systems; and
            &#40;5&#41; otherwise manage the Services in a manner designed to
            protect our rights and property and to facilitate the proper
            functioning of the Services.
          </div>
        </div>
        <div id="ppno" className={section}>
          <div className={heading1}>
            <span className={textHighlight}>
              <span className={textHighlight}>15.</span>&nbsp; PRIVACY POLICY
            </span>
          </div>
          <div data-custom-class="body_text">
            We care about data privacy and security. By using the Services&#44;
            you agree to be bound by our Privacy Policy posted on the
            Services&#44; which is incorporated into these Legal Terms. Please
            be advised the Services are hosted in India . If you access the
            Services from any other region of the world with laws or other
            requirements governing personal data collection&#44; use&#44; or
            disclosure that differ from applicable laws in India &#44; then
            through your continued use of the Services&#44; you are transferring
            your data to India &#44; and you expressly consent to have your data
            transferred to and processed in India .
          </div>
        </div>
        <div id="copyrightno" className={section}>
          <div className={heading1}>
            <span className={textHighlight}>
              <span className={textHighlight}>16.</span>
              &nbsp; COPYRIGHT INFRINGEMENTS
            </span>
          </div>
          <div data-custom-class="body_text">
            We respect the intellectual property rights of others. If you
            believe that any material available on or through the Services
            infringes upon any copyright you own or control&#44; please
            immediately notify us using the contact information provided below
            &#40;a &#39;Notification&#39;&#41;. a copy of your Notification will
            be sent to the person who posted or stored the material addressed in
            the Notification. Please be advised that pursuant to applicable law
            you may be held liable for damages if you make material
            misrepresentations in a Notification. Thus&#44; if you are not sure
            that material located on or linked to by the Services infringes your
            copyright&#44; you should consider first contacting an attorney.
          </div>
        </div>
        <div id="terms" className={section}>
          <div className={heading1}>
            <span className={textHighlight}>
              <span className={textHighlight}>17.</span>
              &nbsp; TERM AND TERMINATION
            </span>
          </div>
          <div data-custom-class="body_text">
            These Legal Terms shall remain in full force and effect while you
            use the Services. WITHOUT LIMITING ANY OTHER PROVISION OF THESE
            LEGAL TERMS&#44; WE RESERVE THE RIGHT TO&#44; IN OUR SOLE DISCRETION
            AND WITHOUT NOTICE OR LIABILITY&#44; DENY ACCESS TO AND USE OF THE
            SERVICES &#40;INCLUDING BLOCKING CERTAIN IP ADDRESSES&#41;&#44; TO
            ANY PERSON FOR ANY REASON OR FOR NO REASON&#44; INCLUDING WITHOUT
            LIMITATION FOR BREACH OF ANY REPRESENTATION&#44; WARRANTY&#44; OR
            COVENANT CONTAINED IN THESE LEGAL TERMS OR OF ANY APPLICABLE LAW OR
            REGULATION. WE MAY TERMINATE YOUR USE OR PARTICIPATION IN THE
            SERVICES OR DELETE YOUR ACCOUNT AND ANY CONTENT OR INFORMATION THAT
            YOU POSTED AT ANY TIME&#44; WITHOUT WARNING&#44; IN OUR SOLE
            DISCRETION.
          </div>
          <div data-custom-class="body_text">
            If we terminate or suspend your account for any reason&#44; you are
            prohibited from registering and creating a new account under your
            name&#44; a fake or borrowed name&#44; or the name of any third
            party&#44; even if you may be acting on behalf of the third party.
            In addition to terminating or suspending your account&#44; we
            reserve the right to take appropriate legal action&#44; including
            without limitation pursuing civil&#44; criminal&#44; and injunctive
            redress.
          </div>
        </div>
        <div id="modifications" className={section}>
          <div className={heading1}>
            <span className={textHighlight}>
              <span className={textHighlight}>18.</span>
              &nbsp; MODIFICATIONS AND INTERRUPTIONS
            </span>
          </div>
          <div data-custom-class="body_text">
            We reserve the right to change&#44; modify&#44; or remove the
            contents of the Services at any time or for any reason at our sole
            discretion without notice. However&#44; we have no obligation to
            update any information on our Services. We also reserve the right to
            modify or discontinue all or part of the Services without notice at
            any time. We will not be liable to you or any third party for any
            modification&#44; price change&#44; suspension&#44; or
            discontinuance of the Services.
          </div>
          <div data-custom-class="body_text">
            We cannot guarantee the Services will be available at all times. We
            may experience hardware&#44; software&#44; or other problems or need
            to perform maintenance related to the Services&#44; resulting in
            interruptions&#44; delays&#44; or errors. We reserve the right to
            change&#44; revise&#44; update&#44; suspend&#44; discontinue&#44; or
            otherwise modify the Services at any time or for any reason without
            notice to you. You agree that we have no liability whatsoever for
            any loss&#44; damage&#44; or inconvenience caused by your inability
            to access or use the Services during any downtime or discontinuance
            of the Services. Nothing in these Legal Terms will be construed to
            obligate us to maintain and support the Services or to supply any
            corrections&#44; updates&#44; or releases in connection therewith.
          </div>
        </div>
        <div id="law" className={section}>
          <div className={heading1}>
            <span className={textHighlight}>
              <span className={textHighlight}>19.</span>
              &nbsp; GOVERNING LAW
            </span>
          </div>
          <div data-custom-class="body_text">
            These Legal Terms shall be governed by and defined following the
            laws of India . Reachgig Corporation Private Limited and yourself
            irrevocably consent that the courts of India shall have exclusive
            jurisdiction to resolve any dispute which may arise in connection
            with these Legal Terms.
          </div>
        </div>
        <div id="disputes" className={section}>
          <div className={heading1}>
            <span className={textHighlight}>
              <span className={textHighlight}>20.</span>&nbsp; DISPUTE
              RESOLUTION
            </span>
          </div>
          <div className={heading2}>
            <span className={textHighlight}>Informal Negotiations</span>
          </div>
          <div data-custom-class="body_text">
            To expedite resolution and control the cost of any dispute&#44;
            controversy&#44; or claim related to these Legal Terms &#40;each a
            &#39;Dispute&#39; and collectively&#44; the &#39;Disputes&#39;&#41;
            brought by either you or us &#40;individually&#44; a &#39;Party&#39;
            and collectively&#44; the &#39;Parties&#39;&#41;&#44; the Parties
            agree to first attempt to negotiate any Dispute &#40;except those
            Disputes expressly provided below&#41; informally for at least forty
            five &#40;45&#41; days before initiating arbitration. Such informal
            negotiations commence upon written notice from one Party to the
            other Party.
          </div>
          <div className={heading2}>
            <span className={textHighlight}>Binding Arbitration</span>
          </div>
          <div data-custom-class="body_text">
            Any dispute arising out of or in connection with these Legal
            Terms&#44; including any question regarding its existence&#44;
            validity&#44; or termination&#44; shall be referred to and finally
            resolved by the International Commercial Arbitration Court under the
            European Arbitration Chamber &#40;Belgium&#44; Brussels&#44; Avenue
            Louise&#44; 146&#41; according to the Rules of this ICAC&#44;
            which&#44; as a result of referring to it&#44; is considered as the
            part of this clause. The number of arbitrators shall be five
            &#40;5&#41;. The seat&#44; or legal place&#44; or arbitration shall
            be Chennai&#44; India. The language of the proceedings shall be
            English. The governing law of these Legal Terms shall be substantive
            law of India.
          </div>
          <div className={heading2}>
            <span className={textHighlight}>Restrictions</span>
          </div>
          <div data-custom-class="body_text">
            The Parties agree that any arbitration shall be limited to the
            Dispute between the Parties individually. To the full extent
            permitted by law&#44; &#40;a&#41; no arbitration shall be joined
            with any other proceeding; &#40;b&#41; there is no right or
            authority for any Dispute to be arbitrated on a class-action basis
            or to utilise class action procedures; and &#40;c&#41; there is no
            right or authority for any Dispute to be brought in a purported
            representative capacity on behalf of the general public or any other
            persons.
          </div>
          <div className={heading2}>
            <span className={textHighlight}>
              Exceptions to Informal Negotiations and Arbitration
            </span>
          </div>
          <div data-custom-class="body_text">
            The Parties agree that the following Disputes are not subject to the
            above provisions concerning informal negotiations binding
            arbitration&#58; &#40;a&#41; any Disputes seeking to enforce or
            protect&#44; or concerning the validity of&#44; any of the
            intellectual property rights of a Party; &#40;b&#41; any Dispute
            related to&#44; or arising from&#44; allegations of theft&#44;
            piracy&#44; invasion of privacy&#44; or unauthorised use; and
            &#40;c&#41; any claim for injunctive relief. If this provision is
            found to be illegal or unenforceable&#44; then neither Party will
            elect to arbitrate any Dispute falling within that portion of this
            provision found to be illegal or unenforceable and such Dispute
            shall be decided by a court of competent jurisdiction within the
            courts listed for jurisdiction above&#44; and the Parties agree to
            submit to the personal jurisdiction of that court.
          </div>
        </div>
        <div id="corrections" className={section}>
          <div className={heading1}>
            <span className={textHighlight}>
              <span className={textHighlight}>21.</span>
              &nbsp; CORRECTIONS
            </span>
          </div>
          <div data-custom-class="body_text">
            There may be information on the Services that contains typographical
            errors&#44; inaccuracies&#44; or omissions&#44; including
            descriptions&#44; pricing&#44; availability&#44; and various other
            information. We reserve the right to correct any errors&#44;
            inaccuracies&#44; or omissions and to change or update the
            information on the Services at any time&#44; without prior notice.
          </div>
        </div>
        <div className={section}>
          <div className={heading1}>
            <span className={textHighlight}>
              <span className={textHighlight}>22.</span>&nbsp; DISCLAIMER
            </span>
          </div>
          <div data-custom-class="body_text">
            THE SERVICES ARE PROVIDED ON AN AS-IS AND AS-AVAILABLE BASIS. YOU
            AGREE THAT YOUR USE OF THE SERVICES WILL BE AT YOUR SOLE RISK. TO
            THE FULLEST EXTENT PERMITTED BY LAW&#44; WE DISCLAIM ALL
            WARRANTIES&#44; EXPRESS OR IMPLIED&#44; IN CONNECTION WITH THE
            SERVICES AND YOUR USE THEREOF&#44; INCLUDING&#44; WITHOUT
            LIMITATION&#44; THE IMPLIED WARRANTIES OF MERCHANTABILITY&#44;
            FITNESS FOR a PARTICULAR PURPOSE&#44; AND NON-INFRINGEMENT. WE MAKE
            NO WARRANTIES OR REPRESENTATIONS ABOUT THE ACCURACY OR COMPLETENESS
            OF THE SERVICES&#39; CONTENT OR THE CONTENT OF ANY WEBSITES OR
            MOBILE APPLICATIONS LINKED TO THE SERVICES AND WE WILL ASSUME NO
            LIABILITY OR RESPONSIBILITY FOR ANY &#40;1&#41; ERRORS&#44;
            MISTAKES&#44; OR INACCURACIES OF CONTENT AND MATERIALS&#44;
            &#40;2&#41; PERSONAL INJURY OR PROPERTY DAMAGE&#44; OF ANY NATURE
            WHATSOEVER&#44; RESULTING FROM YOUR ACCESS TO AND USE OF THE
            SERVICES&#44; &#40;3&#41; ANY UNAUTHORISED ACCESS TO OR USE OF OUR
            SECURE SERVERS AND/OR ANY AND ALL PERSONAL INFORMATION AND/OR
            FINANCIAL INFORMATION STORED THEREIN&#44; &#40;4&#41; ANY
            INTERRUPTION OR CESSATION OF TRANSMISSION TO OR FROM THE
            SERVICES&#44; &#40;5&#41; ANY BUGS&#44; VIRUSES&#44; TROJAN
            HORSES&#44; OR THE LIKE WHICH MAY BE TRANSMITTED TO OR THROUGH THE
            SERVICES BY ANY THIRD PARTY&#44; AND/OR &#40;6&#41; ANY ERRORS OR
            OMISSIONS IN ANY CONTENT AND MATERIALS OR FOR ANY LOSS OR DAMAGE OF
            ANY KIND INCURRED AS a RESULT OF THE USE OF ANY CONTENT POSTED&#44;
            TRANSMITTED&#44; OR OTHERWISE MADE AVAILABLE VIA THE SERVICES. WE DO
            NOT WARRANT&#44; ENDORSE&#44; GUARANTEE&#44; OR ASSUME
            RESPONSIBILITY FOR ANY PRODUCT OR SERVICE ADVERTISED OR OFFERED BY a
            THIRD PARTY THROUGH THE SERVICES&#44; ANY HYPERLINKED WEBSITE&#44;
            OR ANY WEBSITE OR MOBILE APPLICATION FEATURED IN ANY BANNER OR OTHER
            ADVERTISING&#44; AND WE WILL NOT BE a PARTY TO OR IN ANY WAY BE
            RESPONSIBLE FOR MONITORING ANY TRANSACTION BETWEEN YOU AND ANY
            THIRD-PARTY PROVIDERS OF PRODUCTS OR SERVICES. AS WITH THE PURCHASE
            OF a PRODUCT OR SERVICE THROUGH ANY MEDIUM OR IN ANY
            ENVIRONMENT&#44; YOU SHOULD USE YOUR BEST JUDGEMENT AND EXERCISE
            CAUTION WHERE APPROPRIATE.
          </div>
        </div>
        <div id="liability" className={section}>
          <div className={heading1}>
            <span className={textHighlight}>
              <span className={textHighlight}>23.</span>
              &nbsp; LIMITATIONS OF LIABILITY
            </span>
          </div>
          <div>
            IN NO EVENT WILL WE OR OUR DIRECTORS&#44; EMPLOYEES&#44; OR AGENTS
            BE LIABLE TO YOU OR ANY THIRD PARTY FOR ANY DIRECT&#44;
            INDIRECT&#44; CONSEQUENTIAL&#44; EXEMPLARY&#44; INCIDENTAL&#44;
            SPECIAL&#44; OR PUNITIVE DAMAGES&#44; INCLUDING LOST PROFIT&#44;
            LOST REVENUE&#44; LOSS OF DATA&#44; OR OTHER DAMAGES ARISING FROM
            YOUR USE OF THE SERVICES&#44; EVEN IF WE HAVE BEEN ADVISED OF THE
            POSSIBILITY OF SUCH DAMAGES. NOTWITHSTANDING ANYTHING TO THE
            CONTRARY CONTAINED HEREIN&#44; OUR LIABILITY TO YOU FOR ANY CAUSE
            WHATSOEVER AND REGARDLESS OF THE FORM OF THE ACTION&#44; WILL AT ALL
            TIMES BE LIMITED TO THE LESSER OF THE AMOUNT PAID&#44; IF ANY&#44;
            BY YOU TO US OR 1000 . CERTAIN US STATE LAWS AND INTERNATIONAL LAWS
            DO NOT ALLOW LIMITATIONS ON IMPLIED WARRANTIES OR THE EXCLUSION OR
            LIMITATION OF CERTAIN DAMAGES. IF THESE LAWS APPLY TO YOU&#44; SOME
            OR ALL OF THE ABOVE DISCLAIMERS OR LIMITATIONS MAY NOT APPLY TO
            YOU&#44; AND YOU MAY HAVE ADDITIONAL RIGHTS.
          </div>
        </div>
        <div id="indemnification" className={section}>
          <div className={heading1}>
            <span className={textHighlight}>
              <span className={textHighlight}>24.</span>
              &nbsp; INDEMNIFICATION
            </span>
          </div>
          <div data-custom-class="body_text">
            You agree to defend&#44; indemnify&#44; and hold us harmless&#44;
            including our subsidiaries&#44; affiliates&#44; and all of our
            respective officers&#44; agents&#44; partners&#44; and
            employees&#44; from and against any loss&#44; damage&#44;
            liability&#44; claim&#44; or demand&#44; including reasonable
            attorneys&rsquo; fees and expenses&#44; made by any third party due
            to or arising out of&#58; &#40;1&#41; your Contributions;
            &#40;2&#41; use of the Services; &#40;3&#41; breach of these Legal
            Terms; &#40;4&#41; any breach of your representations and warranties
            set forth in these Legal Terms; &#40;5&#41; your violation of the
            rights of a third party&#44; including but not limited to
            intellectual property rights; or &#40;6&#41; any overt harmful act
            toward any other user of the Services with whom you connected via
            the Services. Notwithstanding the foregoing&#44; we reserve the
            right&#44; at your expense&#44; to assume the exclusive defence and
            control of any matter for which you are required to indemnify
            us&#44; and you agree to cooperate&#44; at your expense&#44; with
            our defence of such claims. We will use reasonable efforts to notify
            you of any such claim&#44; action&#44; or proceeding which is
            subject to this indemnification upon becoming aware of it.
          </div>
        </div>
        <div id="userdata" className={section}>
          <div className={heading1}>
            <span className={textHighlight}>
              <span className={textHighlight}>25.</span>
              &nbsp; USER DATA
            </span>
          </div>
          <div data-custom-class="body_text">
            We will maintain certain data that you transmit to the Services for
            the purpose of managing the performance of the Services&#44; as well
            as data relating to your use of the Services. Although we perform
            regular routine backups of data&#44; you are solely responsible for
            all data that you transmit or that relates to any activity you have
            undertaken using the Services. You agree that we shall have no
            liability to you for any loss or corruption of any such data&#44;
            and you hereby waive any right of action against us arising from any
            such loss or corruption of such data.
          </div>
        </div>
        <div id="electronic" className={section}>
          <div className={heading1}>
            <span className={textHighlight}>
              <span className={textHighlight}>26.</span>
              &nbsp; ELECTRONIC COMMUNICATIONS&#44; TRANSACTIONS&#44; AND
              SIGNATURES
            </span>
          </div>
          <div data-custom-class="body_text">
            Visiting the Services&#44; sending us emails&#44; and completing
            online forms constitute electronic communications. You consent to
            receive electronic communications&#44; and you agree that all
            agreements&#44; notices&#44; disclosures&#44; and other
            communications we provide to you electronically&#44; via email and
            on the Services&#44; satisfy any legal requirement that such
            communication be in writing. YOU HEREBY AGREE TO THE USE OF
            ELECTRONIC SIGNATURES&#44; CONTRACTS&#44; ORDERS&#44; AND OTHER
            RECORDS&#44; AND TO ELECTRONIC DELIVERY OF NOTICES&#44;
            POLICIES&#44; AND RECORDS OF TRANSACTIONS INITIATED OR COMPLETED BY
            US OR VIA THE SERVICES. You hereby waive any rights or requirements
            under any statutes&#44; regulations&#44; rules&#44; ordinances&#44;
            or other laws in any jurisdiction which require an original
            signature or delivery or retention of non-electronic records&#44; or
            to payments or the granting of credits by any means other than
            electronic means.
          </div>
        </div>
        <div id="misc" className={section}>
          <div className={heading1}>
            <span className={textHighlight}>
              <span className={textHighlight}>27.</span>
              &nbsp; MISCELLANEOUS
            </span>
          </div>
          <div data-custom-class="body_text">
            These Legal Terms and any policies or operating rules posted by us
            on the Services or in respect to the Services constitute the entire
            agreement and understanding between you and us. Our failure to
            exercise or enforce any right or provision of these Legal Terms
            shall not operate as a waiver of such right or provision. These
            Legal Terms operate to the fullest extent permissible by law. We may
            assign any or all of our rights and obligations to others at any
            time. We shall not be responsible or liable for any loss&#44;
            damage&#44; delay&#44; or failure to act caused by any cause beyond
            our reasonable control. If any provision or part of a provision of
            these Legal Terms is determined to be unlawful&#44; void&#44; or
            unenforceable&#44; that provision or part of the provision is deemed
            severable from these Legal Terms and does not affect the validity
            and enforceability of any remaining provisions. There is no joint
            venture&#44; partnership&#44; employment or agency relationship
            created between you and us as a result of these Legal Terms or use
            of the Services. You agree that these Legal Terms will not be
            construed against us by virtue of having drafted them. You hereby
            waive any and all defences you may have based on the electronic form
            of these Legal Terms and the lack of signing by the parties hereto
            to execute these Legal Terms.
          </div>
        </div>
        <div id="contact" className={section}>
          <div className={heading1}>
            <span className={textHighlight}>
              <span className={textHighlight}>28.</span>
              &nbsp; CONTACT US
            </span>
          </div>
          <div data-custom-class="body_text">
            In order to resolve a complaint regarding the Services or to receive
            further information regarding use of the Services&#44; please
            contact us at&#58;
          </div>
          <div data-custom-class="body_text">
            <span className={textHighlight}> Phone&#58; &#43;917550083900</span>
          </div>
          <div data-custom-class="body_text">
            <span className={textHighlight}>
              {" "}
              Email&#58; &nbsp;reachgig.connect@gmail.com{" "}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
