import { State } from "@data/enums";
import LandingWrapper from "@wrapper/LandingWrapper";
import Link from "next/link";
import React from "react";

export default function PrivacyPolicy() {
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
    <LandingWrapper
      title="Reach"
      showFooter={true}
      state={State.SUCCESS}
      className="relative flex flex-col items-center justify-start scroll-smooth lg:p-10 p-5"
      showNavbar={true}
    >
      <div className={body}>
        <div className={title}>
          <span className={textHighlight}>PRIVACY POLICY</span>
        </div>
        <div className={subtitle}>
          <span className={textHighlight}>
            Last updated February 09 &#44; 2024{" "}
          </span>
        </div>
        <div>
          This privacy notice for Reachgig Corporation Private Limited
          &#40;&#39;
          <span className={textHighlight}>we</span>&#39; &#44; &#39;
          <span className={textHighlight}>us</span>&#39; &#44; or &#39;
          <span className={textHighlight}>our</span>&#39;&#41; &#44; describes
          how and why we might collect &#44; store &#44; use &#44; and/or share
          &#40;&#39;
          <span className={textHighlight}>process</span>&#39;&#41; your
          information when you use our services &#40;&#39;
          <span className={textHighlight}>Services</span>&#39;&#41; &#44; such
          as when you&#58;
        </div>
        <ul className={list}>
          <li>
            Visit our website at{" "}
            <a
              href="http&#58;//www&#46;reachgig&#46;com"
              target="_blank"
              className={link}
            >
              http&#58;//www&#46;reachgig&#46;com &#44; or any website of ours
              that links to this privacy notice{" "}
            </a>
          </li>

          <li>
            Download and use our mobile application &#40;Reach&#41; &#44; or any
            other application of ours that links to this privacy notice
          </li>

          <li>
            Engage with us in other related ways &#44; including any sales &#44;
            marketing &#44; or events
          </li>
        </ul>
        <div>
          <span className={textHighlight}>Questions or concerns?&nbsp;</span>
          Reading this privacy notice will help you understand your privacy
          rights and choices&#46; If you do not agree with our policies and
          practices &#44; please do not use our Services&#46; If you still have
          any questions or concerns &#44; please contact us at
          reachgig.connect@gmail&#46;com&#46;
        </div>
        <div className={heading1}>
          <span className={textHighlight}>SUMMARY OF KEY POINTS </span>
        </div>
        <div>
          <span className={textHighlight}>
            <em>
              This summary provides key points from our privacy notice &#44; but
              you can find out more details about any of these topics by
              clicking the link following each key point or by using our&nbsp;
              <a href="#toc" className={link}>
                <span className={textHighlight}>
                  <em>table of contents</em>
                </span>
                <span className={textHighlight}>
                  <em>
                    &nbsp;below to find the section you are looking for&#46;{" "}
                  </em>
                </span>
              </a>
            </em>
          </span>
        </div>
        <div>
          <span className={textHighlight}>
            What personal information do we process?
          </span>{" "}
          When you visit &#44; use &#44; or navigate our Services &#44; we may
          process personal information depending on how you interact with us and
          the Services &#44; the choices you make &#44; and the products and
          features you use&#46; Learn more about&nbsp;
          <a href="#personalinfo" className={link}>
            personal information you disclose to us&#46;{" "}
          </a>
        </div>
        <div>
          <span className={textHighlight}>
            Do we process any sensitive personal information?
          </span>{" "}
          We do not process sensitive personal information&#46;
        </div>
        <div>
          <span className={textHighlight}>
            Do we receive any information from third parties?
          </span>{" "}
          We may receive information from public databases &#44; marketing
          partners &#44; social media platforms &#44; and other outside
          sources&#46; Learn more about&nbsp;
          <a href="#othersources" className={link}>
            information collected from other sources&#46;{" "}
          </a>
        </div>
        <div>
          <span className={textHighlight}>
            How do we process your information?
          </span>{" "}
          We process your information to provide &#44; improve &#44; and
          administer our Services &#44; communicate with you &#44; for security
          and fraud prevention &#44; and to comply with law&#46; We may also
          process your information for other purposes with your consent&#46; We
          process your information only when we have a valid legal reason to do
          so&#46; Learn more about&nbsp;
          <a href="#infouse" className={link}>
            how we process your information&#46;{" "}
          </a>
        </div>
        <div>
          <span className={textHighlight}>
            In what situations and with which parties do we share personal
            information? We may share information in specific situations and
            with specific third parties&#46; Learn more about&nbsp;
            <a href="#whoshare" className={link}>
              when and with whom we share your personal information&#46;{" "}
            </a>
          </span>
        </div>
        <div>
          <span className={textHighlight}>
            How do we keep your information safe?
          </span>{" "}
          We have organisational and technical processes and procedures in place
          to protect your personal information&#46; However &#44; no electronic
          transmission over the internet or information storage technology can
          be guaranteed to be 100% secure &#44; so we cannot promise or
          guarantee that hackers &#44; cybercriminals &#44; or other
          unauthorised third parties will not be able to defeat our security and
          improperly collect &#44; access &#44; steal &#44; or modify your
          information&#46; Learn more about&nbsp;
          <a href="#infosafe" className={link}>
            how we keep your information safe&#46;{" "}
          </a>
        </div>
        <div>
          <span className={textHighlight}>What are your rights?</span> Depending
          on where you are located geographically &#44; the applicable privacy
          law may mean you have certain rights regarding your personal
          information&#46; Learn more about&nbsp;
          <a href="#privacyrights" className={link}>
            your privacy rights&#46;{" "}
          </a>
        </div>
        <div>
          <span className={textHighlight}>
            How do you exercise your rights?
          </span>{" "}
          The easiest way to exercise your rights is by visiting
          reachgig&#46;com/data-request &#44; or by contacting us&#46; We will
          consider and act upon any request in accordance with applicable data
          protection laws&#46;
        </div>
        <div>
          Want to learn more about what we do with any information we
          collect?&nbsp;
          <a href="#toc" className={link}>
            Review the privacy notice in full&#46;{" "}
          </a>
        </div>
        <div id="toc" className={heading1}>
          <span className={textHighlight}>TABLE OF CONTENTS </span>
        </div>
        <div>
          <a href="#infocollect" className={link2}>
            1&#46; WHAT INFORMATION DO WE COLLECT?{" "}
          </a>
        </div>
        <div>
          <a href="#infouse" className={link2}>
            2&#46; HOW DO WE PROCESS YOUR INFORMATION?
          </a>
        </div>
        <div>
          <a href="#whoshare" className={link2}>
            3&#46; WHEN AND WITH WHOM DO WE SHARE YOUR PERSONAL INFORMATION?{" "}
          </a>
        </div>
        <div>
          <a href="#cookies" className={link2}>
            4&#46; DO WE USE COOKIES AND OTHER TRACKING TECHNOLOGIES?{" "}
          </a>
        </div>
        <div>
          <a href="#inforetain" className={link2}>
            5&#46; HOW LONG DO WE KEEP YOUR INFORMATION?{" "}
          </a>
        </div>
        <div>
          <a href="#infosafe" className={link2}>
            6&#46; HOW DO WE KEEP YOUR INFORMATION SAFE?{" "}
          </a>
        </div>
        <div>
          <a href="#infominors" className={link2}>
            7&#46; DO WE COLLECT INFORMATION FROM MINORS?{" "}
          </a>
        </div>
        <div>
          <a href="#privacyrights" className={link2}>
            8&#46; WHAT ARE YOUR PRIVACY RIGHTS?{" "}
          </a>
        </div>
        <div>
          <a href="#DNT" className={link2}>
            9&#46; CONTROLS FOR DO-NOT-TRACK FEATURES{" "}
          </a>
        </div>
        <div>
          <a href="#policyupdates" className={link2}>
            10&#46; DO WE MAKE UPDATES TO THIS NOTICE?{" "}
          </a>
        </div>
        <div>
          <a href="#contact" className={link2}>
            11&#46; HOW CAN YOU CONTACT US ABOUT THIS NOTICE?{" "}
          </a>
        </div>
        <div>
          <a href="#request" className={link2}>
            12&#46; HOW CAN YOU REVIEW &#44; UPDATE &#44; OR DELETE THE DATA WE
            COLLECT FROM YOU?{" "}
          </a>
        </div>
        <div className={section}>
          <div id="infocollect" className={heading1}>
            <span className={textHighlight}>
              1&#46; WHAT INFORMATION DO WE COLLECT?{" "}
            </span>
          </div>
          <div>
            <span className={textHighlight}>
              Personal information you disclose to us
            </span>
          </div>
          <div>
            <span className={textHighlight}>
              <em>In Short&#58;</em>
            </span>
            <span className={textHighlight}>
              <em>
                We collect personal information that you provide to us&#46;{" "}
              </em>
            </span>
          </div>
          <div>
            We collect personal information that you voluntarily provide to us
            when you register on the Services &#44;&nbsp;express an interest in
            obtaining information about us or our products and Services &#44;
            when you participate in activities on the Services &#44; or
            otherwise when you contact us&#46;
          </div>
          <div>
            <span className={textHighlight}>
              Personal Information Provided by You&#46;
            </span>{" "}
            The personal information that we collect depends on the context of
            your interactions with us and the Services &#44; the choices you
            make &#44; and the products and features you use&#46; The personal
            information we collect may include the following&#58;
          </div>
          <ul className={list}>
            <li>names</li>
            <li>phone numbers</li>
            <li>email addresses</li>
            <li>job titles</li>
            <li>contact preferences</li>
            <li>contact or authentication data</li>
            <li>debit/credit card numbers</li>
            <li>location data</li>
            <li>social media profiles</li>
          </ul>
          <div>
            <span className={textHighlight}>Sensitive Information&#46;</span> We
            do not process sensitive information&#46;
          </div>
          <div>
            <span className={textHighlight}>Payment Data&#46;</span> We may
            collect data necessary to process your payment if you make purchases
            &#44; such as your payment instrument number &#44; and the security
            code associated with your payment instrument&#46; All payment data
            is stored by Stripe&#46; You may find their privacy notice
            link&#40;s&#41; here&#58;{" "}
            <a
              href="https&#58;//stripe&#46;com/en-in/privacy"
              target="_blank"
              className={link}
            >
              https&#58;//stripe&#46;com/en-in/privacy&#46;
            </a>
          </div>
          <div>
            <span className={textHighlight}>Application Data&#46;</span> If you
            use our application&#40;s&#41; &#44; we also may collect the
            following information if you choose to provide us with access or
            permission&#58;
          </div>
          <ul className={list}>
            <li>
              <em>Geolocation Information&#46;</em> We may request access or
              permission to track location-based information from your mobile
              device &#44; either continuously or while you are using our mobile
              application&#40;s&#41; &#44; to provide certain location-based
              services&#46; If you wish to change our access or permissions
              &#44; you may do so in your device&#39;s settings&#46;
            </li>
            <li>
              <em>Mobile Device Access&#46;</em> We may request access or
              permission to certain features from your mobile device &#44;
              including your mobile device&#39;s calendar &#44; camera &#44;
              storage &#44; and other features&#46; If you wish to change our
              access or permissions &#44; you may do so in your device&#39;s
              settings&#46;
            </li>
            <li>
              <em>Push Notifications&#46;</em> We may request to send you push
              notifications regarding your account or certain features of the
              application&#40;s&#41;&#46; If you wish to opt out from receiving
              these types of communications &#44; you may turn them off in your
              device&#39;s settings&#46;
            </li>
          </ul>
          <div>
            This information is primarily needed to maintain the security and
            operation of our application&#40;s&#41; &#44; for troubleshooting
            &#44; and for our internal analytics and reporting purposes&#46;
          </div>
          <div>
            All personal information that you provide to us must be true &#44;
            complete &#44; and accurate &#44; and you must notify us of any
            changes to such personal information&#46;
          </div>
          <div>
            <span className={textHighlight}>
              Information automatically collected
            </span>
          </div>
          <div>
            <span className={textHighlight}>
              <em>In Short&#58;</em>
            </span>
            <span className={textHighlight}>
              <em>
                Some information &mdash; such as your Internet Protocol
                &#40;IP&#41; address and/or browser and device characteristics
                &mdash; is collected automatically when you visit our
                Services&#46;{" "}
              </em>
            </span>
          </div>
          <div>
            We automatically collect certain information when you visit &#44;
            use &#44; or navigate the Services&#46; This information does not
            reveal your specific identity &#40;like your name or contact
            information&#41; but may include device and usage information &#44;
            such as your IP address &#44; browser and device characteristics
            &#44; operating system &#44; language preferences &#44; referring
            URLs &#44; device name &#44; country &#44; location &#44;
            information about how and when you use our Services &#44; and other
            technical information&#46; This information is primarily needed to
            maintain the security and operation of our Services &#44; and for
            our internal analytics and reporting purposes&#46;
          </div>
          <div>
            Like many businesses &#44; we also collect information through
            cookies and similar technologies&#46;
          </div>
          <div>The information we collect includes&#58;</div>
          <ul className={list}>
            <li>
              <em>Log and Usage Data&#46;</em> Log and usage data is
              service-related &#44; diagnostic &#44; usage &#44; and performance
              information our servers automatically collect when you access or
              use our Services and which we record in log files&#46; Depending
              on how you interact with us &#44; this log data may include your
              IP address &#44; device information &#44; browser type &#44; and
              settings and information about your activity in the
              Services&nbsp;&#40;such as the date/time stamps associated with
              your usage &#44; pages and files viewed &#44; searches &#44; and
              other actions you take such as which features you use&#41; &#44;
              device event information &#40;such as system activity &#44; error
              reports &#40;sometimes called &#39;crash dumps&#39;&#41; &#44; and
              hardware settings&#41;&#46;
            </li>
            <li>
              <em>Device Data&#46;</em> We collect device data such as
              information about your computer &#44; phone &#44; tablet &#44; or
              other device you use to access the Services&#46; Depending on the
              device used &#44; this device data may include information such as
              your IP address &#40;or proxy server&#41; &#44; device and
              application identification numbers &#44; location &#44; browser
              type &#44; hardware model &#44; Internet service provider and/or
              mobile carrier &#44; operating system &#44; and system
              configuration information&#46;
            </li>
            <li>
              <em>Location Data&#46;</em> We collect location data such as
              information about your device&#39;s location &#44; which can be
              either precise or imprecise&#46; How much information we collect
              depends on the type and settings of the device you use to access
              the Services&#46; For example &#44; we may use GPS and other
              technologies to collect geolocation data that tells us your
              current location &#40;based on your IP address&#41;&#46; You can
              opt out of allowing us to collect this information either by
              refusing access to the information or by disabling your Location
              setting on your device&#46; However &#44; if you choose to opt out
              &#44; you may not be able to use certain aspects of the
              Services&#46;
            </li>
          </ul>
          <div>
            <span className={textHighlight}>
              Information collected from other sources
            </span>
          </div>
          <div>
            <span className={textHighlight}>
              <em>In Short&#58;&nbsp;</em>
              <em>
                We may collect limited data from public databases &#44;
                marketing partners &#44; and other outside sources&#46;{" "}
              </em>
            </span>
          </div>
          <div>
            In order to enhance our ability to provide relevant marketing &#44;
            offers &#44; and services to you and update our records &#44; we may
            obtain information about you from other sources &#44; such as public
            databases &#44; joint marketing partners &#44; affiliate programs
            &#44; data providers &#44;&nbsp;and from other third parties&#46;
            This information includes mailing addresses &#44; job titles &#44;
            email addresses &#44; phone numbers &#44; intent data &#40;or user
            behaviour data&#41; &#44; Internet Protocol &#40;IP&#41; addresses
            &#44; social media profiles &#44; social media URLs &#44; and custom
            profiles &#44; for purposes of targeted advertising and event
            promotion&#46;
          </div>
        </div>
        <div className={section}>
          <div id="infouse" className={heading2}>
            <span className={textHighlight}>
              2&#46; HOW DO WE PROCESS YOUR INFORMATION?{" "}
            </span>
          </div>

          <div>
            <span className={textHighlight}>
              <em>In Short&#58;&nbsp;</em>
              <em>
                We process your information to provide &#44; improve &#44; and
                administer our Services &#44; communicate with you &#44; for
                security and fraud prevention &#44; and to comply with law&#46;
                We may also process your information for other purposes with
                your consent&#46;{" "}
              </em>
            </span>
          </div>

          <div>
            <span className={textHighlight}>
              We process your personal information for a variety of reasons
              &#44; depending on how you interact with our Services &#44;
              including&#58;
            </span>
          </div>
          <ul className={list}>
            <li>
              <span className={textHighlight}>
                To facilitate account creation and authentication and otherwise
                manage user accounts&#46;&nbsp;We may process your information
                so you can create and log in to your account &#44; as well as
                keep your account in working order&#46;
              </span>
            </li>
            <li>
              <span className={textHighlight}>
                To deliver and facilitate delivery of services to the
                user&#46;&nbsp;We may process your information to provide you
                with the requested service&#46;
              </span>
            </li>

            <li>
              <span className={textHighlight}>
                To respond to user inquiries/offer support to users&#46;&nbsp;We
                may process your information to respond to your inquiries and
                solve any potential issues you might have with the requested
                service&#46;
              </span>
            </li>

            <li>
              <span className={textHighlight}>
                To send administrative information to you&#46;&nbsp;We may
                process your information to send you details about our products
                and services &#44; changes to our terms and policies &#44; and
                other similar information&#46;
              </span>
            </li>
          </ul>

          <ul className={list}>
            <li>
              <span className={textHighlight}>
                To fulfil and manage your orders&#46;&nbsp;We may process your
                information to fulfil and manage your orders &#44; payments
                &#44; returns &#44; and exchanges made through the Services&#46;
              </span>
            </li>
          </ul>

          <ul className={list}>
            <li>
              <span className={textHighlight}>
                To enable user-to-user communications&#46;&nbsp;We may process
                your information if you choose to use any of our offerings that
                allow for communication with another user&#46;
              </span>
            </li>

            <li>
              <span className={textHighlight}>
                To request feedback&#46;&nbsp;
              </span>
              We may process your information when necessary to request feedback
              and to contact you about your use of our Services&#46;
            </li>

            <li>
              <span className={textHighlight}>
                To send you marketing and promotional
                communications&#46;&nbsp;We may process the personal information
                you send to us for our marketing purposes &#44; if this is in
                accordance with your marketing preferences&#46; You can opt out
                of our marketing emails at any time&#46; For more information
                &#44; see &#39;
              </span>
              <a href="#privacyrights">
                WHAT ARE YOUR PRIVACY RIGHTS?&#39; below&#46;{" "}
              </a>
            </li>
          </ul>

          <ul className={list}>
            <li>
              <span className={textHighlight}>
                To protect our Services&#46;
              </span>{" "}
              We may process your information as part of our efforts to keep our
              Services safe and secure &#44; including fraud monitoring and
              prevention&#46;
            </li>
          </ul>

          <ul className={list}>
            <li>
              <span className={textHighlight}>
                To evaluate and improve our Services &#44; products &#44;
                marketing &#44; and your experience&#46; We may process your
                information when we believe it is necessary to identify usage
                trends &#44; determine the effectiveness of our promotional
                campaigns &#44; and to evaluate and improve our Services &#44;
                products &#44; marketing &#44; and your experience&#46;{" "}
              </span>
            </li>

            <li>
              <span className={textHighlight}>
                To identify usage trends&#46;
              </span>{" "}
              We may process information about how you use our Services to
              better understand how they are being used so we can improve
              them&#46;
            </li>
          </ul>
        </div>
        <div className={section}>
          <div id="whoshare" className={heading1}>
            <span className={textHighlight}>
              3&#46; WHEN AND WITH WHOM DO WE SHARE YOUR PERSONAL INFORMATION?{" "}
            </span>
          </div>
          <div>
            <span className={textHighlight}>
              <em>In Short&#58;</em>
              <em>
                &nbsp;We may share information in specific situations described
                in this section and/or with the following third parties&#46;{" "}
              </em>
            </span>
          </div>
          <div>
            We may need to share your personal information in the following
            situations&#58;
          </div>
          <ul className={list}>
            <li>
              <span className={textHighlight}>
                Business Transfers&#46; We may share or transfer your
                information in connection with &#44; or during negotiations of
                &#44; any merger &#44; sale of company assets &#44; financing
                &#44; or acquisition of all or a portion of our business to
                another company&#46;{" "}
              </span>
            </li>

            <li>
              <span className={textHighlight}>
                When we use Google Maps Platform APIs&#46; We may share your
                information with certain Google Maps Platform APIs
                &#40;e&#46;g&#46; Google Maps API &#44; Places API&#41;&#46;{" "}
                Refer to Google&#39;s{" "}
                <a
                  rel="noopener noreferrer"
                  target="_blank"
                  className={link}
                  href="https://policies.google.com/privacy?hl=en-US"
                >
                  Privacy Policy&nbsp;
                </a>
                for more details.
              </span>
            </li>

            <li>
              <span className={textHighlight}>Other Users&#46;</span> When you
              share personal information &#40;for example &#44; by posting
              comments &#44; contributions &#44; or other content to the
              Services&#41; or otherwise interact with public areas of the
              Services &#44; such personal information may be viewed by all
              users and may be publicly made available outside the Services in
              perpetuity&#46; Similarly &#44; other users will be able to view
              descriptions of your activity &#44; communicate with you within
              our Services &#44; and view your profile&#46;
            </li>
          </ul>
        </div>
        <div className={section}>
          <div id="cookies" className={heading1}>
            <span className={textHighlight}>
              4&#46; DO WE USE COOKIES AND OTHER TRACKING TECHNOLOGIES?{" "}
            </span>
          </div>
          <div>
            <span className={textHighlight}>
              <em>In Short&#58;</em>
              <em>
                &nbsp;We may use cookies and other tracking technologies to
                collect and store your information&#46;{" "}
              </em>
            </span>
          </div>
          <div>
            We may use cookies and similar tracking technologies &#40;like web
            beacons and pixels&#41; to access or store information&#46; Specific
            information about how we use such technologies and how you can
            refuse certain cookies is set out in our Cookie Notice&#46;
          </div>
        </div>
        <div className={section}>
          <div id="inforetain" className={heading1}>
            <span className={textHighlight}>
              5&#46; HOW LONG DO WE KEEP YOUR INFORMATION?{" "}
            </span>
          </div>
          <div>
            <span className={textHighlight}>
              <em>
                In Short&#58;&nbsp;
                <em>
                  We keep your information for as long as necessary to fulfil
                  the purposes outlined in this privacy notice unless otherwise
                  required by law&#46;{" "}
                </em>
              </em>
            </span>
          </div>
          <div>
            We will only keep your personal information for as long as it is
            necessary for the purposes set out in this privacy notice &#44;
            unless a longer retention period is required or permitted by law
            &#40;such as tax &#44; accounting &#44; or other legal
            requirements&#41;&#46; No purpose in this notice will require us
            keeping your personal information for longer than twelve
            &#40;12&#41; months past the termination of the user&#39;s
            account&#46;
          </div>
          <div>
            When we have no ongoing legitimate business need to process your
            personal information &#44; we will either delete or anonymise such
            information &#44; or &#44; if this is not possible &#40;for example
            &#44; because your personal information has been stored in backup
            archives&#41; &#44; then we will securely store your personal
            information and isolate it from any further processing until
            deletion is possible&#46;
          </div>
          <div>
            Refer to our{" "}
            <Link href={"/data-retention-policy"} className={link}>
              Data Retention Policy
            </Link>{" "}
            for more details&#46;
          </div>
        </div>
        <div className={section}>
          <div id="infosafe" className={heading1}>
            <span className={textHighlight}>
              6&#46; HOW DO WE KEEP YOUR INFORMATION SAFE?{" "}
            </span>
          </div>
          <div>
            <span className={textHighlight}>
              <em>
                In Short&#58;&nbsp;
                <em>
                  We aim to protect your personal information through a system
                  of organisational and technical security measures&#46;{" "}
                </em>
              </em>
            </span>
          </div>
          <div>
            We have implemented appropriate and reasonable technical and
            organisational security measures designed to protect the security of
            any personal information we process&#46; However &#44; despite our
            safeguards and efforts to secure your information &#44; no
            electronic transmission over the Internet or information storage
            technology can be guaranteed to be 100% secure &#44; so we cannot
            promise or guarantee that hackers &#44; cybercriminals &#44; or
            other unauthorised third parties will not be able to defeat our
            security and improperly collect &#44; access &#44; steal &#44; or
            modify your information&#46; Although we will do our best to protect
            your personal information &#44; transmission of personal information
            to and from our Services is at your own risk&#46; You should only
            access the Services within a secure environment&#46;
          </div>
        </div>
        <div className={section}>
          <div id="infominors" className={heading1}>
            <span className={textHighlight}>
              7&#46; DO WE COLLECT INFORMATION FROM MINORS?{" "}
            </span>
          </div>
          <div>
            <span className={textHighlight}>
              <em>In Short&#58;</em>
              <em>
                &nbsp;We do not knowingly collect data from or market to
                children under 18 years of age&#46;
              </em>
            </span>
          </div>
          <div>
            We do not knowingly solicit data from or market to children under 18
            years of age&#46; By using the Services &#44; you represent that you
            are at least 18 or that you are the parent or guardian of such a
            minor and consent to such minor dependent&rsquo;s use of the
            Services&#46; If we learn that personal information from users less
            than 18 years of age has been collected &#44; we will deactivate the
            account and take reasonable measures to promptly delete such data
            from our records&#46; If you become aware of any data we may have
            collected from children under age 18 &#44; please contact us at
            reachgig.connect@gmail&#46;com&#46;
          </div>
        </div>
        <div className={section}>
          <div id="privacyrights" className={heading1}>
            <span className={textHighlight}>
              8&#46; WHAT ARE YOUR PRIVACY RIGHTS?{" "}
            </span>
          </div>
          <div>
            <span className={textHighlight}>
              <em>In Short&#58;</em>
              <em>
                &nbsp;&nbsp;You may review &#44; change &#44; or terminate your
                account at any time&#46;{" "}
              </em>
            </span>
          </div>
          <div>
            <span className={textHighlight}>
              <u>
                Withdrawing your consent&#58; If we are relying on your consent
                to process your personal information &#44; which may be express
                and/or implied consent depending on the applicable law &#44; you
                have the right to withdraw your consent at any time&#46; You can
                withdraw your consent at any time by contacting us by using the
                contact details provided in the section &#39;
              </u>
            </span>
            <a href="#contact" className={link}>
              HOW CAN YOU CONTACT US ABOUT THIS NOTICE?&#39; below&#46;{" "}
            </a>
          </div>
          <div>
            However &#44; please note that this will not affect the lawfulness
            of the processing before its withdrawal nor &#44; when applicable
            law allows &#44; will it affect the processing of your personal
            information conducted in reliance on lawful processing grounds other
            than consent&#46;
          </div>
          <div>
            <span className={textHighlight}>
              <u>
                Opting out of marketing and promotional communications&#58;
                <span className={textHighlight}>
                  You can unsubscribe from our marketing and promotional
                  communications at any time by clicking on the unsubscribe link
                  in the emails that we send &#44; replying &#39;STOP&#39; or
                  &#39;UNSUBSCRIBE&#39; to the SMS messages that we send &#44;
                  or by contacting us using the details provided in the section
                  &#39;
                </span>
              </u>
            </span>
            <a href="#contact" className={link}>
              HOW CAN YOU CONTACT US ABOUT THIS NOTICE?&#39; below&#46; You will
              then be removed from the marketing lists&#46; However &#44; we may
              still communicate with you &mdash; for example &#44; to send you
              service-related messages that are necessary for the administration
              and use of your account &#44; to respond to service requests &#44;
              or for other non-marketing purposes&#46;{" "}
            </a>
          </div>
          <div>
            <span className={textHighlight}>Account Information </span>
          </div>
          <div>
            If you would at any time like to review or change the information in
            your account or terminate your account &#44; you can&#58;
          </div>
          <ul className={list}>
            <li>
              Log in to your account settings and update your user account&#46;
            </li>
          </ul>
          <ul className={list}>
            <li>Contact us using the contact information provided&#46;</li>
          </ul>
          <div>
            Upon your request to terminate your account &#44; we will deactivate
            or delete your account and information from our active
            databases&#46; However &#44; we may retain some information in our
            files to prevent fraud &#44; troubleshoot problems &#44; assist with
            any investigations &#44; enforce our legal terms and/or comply with
            applicable legal requirements&#46;
          </div>
          <div>
            <span className={textHighlight}>
              <u>
                Cookies and similar technologies&#58; Most Web browsers are set
                to accept cookies by default&#46; If you prefer &#44; you can
                usually choose to set your browser to remove cookies and to
                reject cookies&#46; If you choose to remove cookies or reject
                cookies &#44; this could affect certain features or services of
                our Services&#46;{" "}
              </u>
            </span>
          </div>
          <div>
            If you have questions or comments about your privacy rights &#44;
            you may email us at reachgig.connect@gmail&#46;com&#46;
          </div>
        </div>
        <div className={section}>
          <div id="DNT" className={heading1}>
            <span className={textHighlight}>
              9&#46; CONTROLS FOR DO-NOT-TRACK FEATURES{" "}
            </span>
          </div>
          <div>
            Most web browsers and some mobile operating systems and mobile
            applications include a Do-Not-Track &#40;&#39;DNT&#39;&#41; feature
            or setting you can activate to signal your privacy preference not to
            have data about your online browsing activities monitored and
            collected&#46; At this stage no uniform technology standard for
            recognising and implementing DNT signals has been finalised&#46; As
            such &#44; we do not currently respond to DNT browser signals or any
            other mechanism that automatically communicates your choice not to
            be tracked online&#46; If a standard for online tracking is adopted
            that we must follow in the future &#44; we will inform you about
            that practice in a revised version of this privacy notice&#46;
          </div>
        </div>
        <div className={section}>
          <div id="policyupdates" className={heading1}>
            <span className={textHighlight}>
              10&#46; DO WE MAKE UPDATES TO THIS NOTICE?{" "}
            </span>
          </div>
          <div>
            <em>
              <span className={textHighlight}>
                In Short&#58;&nbsp;Yes &#44; we will update this notice as
                necessary to stay compliant with relevant laws&#46;{" "}
              </span>
            </em>
          </div>
          <div>
            We may update this privacy notice from time to time&#46; The updated
            version will be indicated by an updated &#39;Revised&#39; date and
            the updated version will be effective as soon as it is
            accessible&#46; If we make material changes to this privacy notice
            &#44; we may notify you either by prominently posting a notice of
            such changes or by directly sending you a notification&#46; We
            encourage you to review this privacy notice frequently to be
            informed of how we are protecting your information&#46;
          </div>
        </div>
        <div className={section}>
          <div id="contact" className={heading1}>
            <span className={textHighlight}>
              11&#46; HOW CAN YOU CONTACT US ABOUT THIS NOTICE?{" "}
            </span>
          </div>
          <div>
            If you have questions or comments about this notice &#44; you may
            email us at reachgig.connect@gmail&#46;com or&nbsp;contact us by
            phone&#58; &#43;917550083900
          </div>
        </div>
        <div className={section}>
          <div id="request" className={heading1}>
            <span className={textHighlight}>
              12&#46; HOW CAN YOU REVIEW &#44; UPDATE &#44; OR DELETE THE DATA
              WE COLLECT FROM YOU?{" "}
            </span>
          </div>
          <div>
            Based on the applicable laws of your country &#44; you may have the
            right to request access to the personal information we collect from
            you &#44; change that information &#44; or delete it&#46; To request
            to review &#44; update &#44; or delete your personal information
            &#44; please visit&#58; reachgig&#46;com/contact&#46;
          </div>
        </div>
      </div>
    </LandingWrapper>
  );
}
