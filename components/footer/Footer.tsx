"use client";
import Logo from "@components/Logo";
import { Linkedin, LinkedinIcon } from "lucide-react";
import Link from "next/link";
import React, { ReactNode } from "react";
import { BsYoutube } from "react-icons/bs";

export default function Footer() {
  return (
    <footer className="bg-foreground !text-white w-full">
      <div className="mx-auto max-w-screen-xl px-4 pb-6 pt-10 sm:px-6 lg:px-8 lg:pt-12 flex flex-col justify-start items-center space-y-20">
        <div className="space-y-3 max-w-lg text-center">
          <Logo wings="w-[10rem]" text="ReachGig" />
          <p className="text-gray leading-7">
            {`NO.514/8, Pethampalayam Road Mekkur, Perundurai, Erode, Erode -
            638052, Tamil Nadu`}
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div>
            <p className="text-lg font-semibold w-full text-center lg:text-left">
              Get in touch with us
            </p>

            <p className="mt-6 max-w-xs text-center leading-relaxed text-gray-200 sm:max-w-xs sm:text-left">
              Join the community and get in touch with us on social media or
              email.
            </p>

            <ul className="mt-8 flex justify-center gap-6 sm:justify-start md:gap-8">
              <li>
                <Link
                  href="https://www.linkedin.com/company/reachgig-corporation-pvt-ltd/about/"
                  rel="noreferrer"
                  target="_blank"
                  className="text-gray-200 transition hover:text-white/75"
                >
                  <span className="sr-only">LinkedIn</span>
                  <Linkedin className="h-10 w-10" />
                </Link>
              </li>
              <li>
                <Link
                  href="https://www.instagram.com/reachgig/"
                  rel="noreferrer"
                  target="_blank"
                  className="text-gray-200 transition hover:text-white/75"
                >
                  <span className="sr-only">Instagram</span>
                  <svg
                    className="h-10 w-10"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
              </li>

              {/* <li>
                <Link
                  href="/"
                  rel="noreferrer"
                  target="_blank"
                  className="text-gray-200 transition hover:text-white/75"
                >
                  <span className="sr-only">Twitter</span>
                  <svg
                    className="h-10 w-10"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </Link>
              </li> */}

              <li>
                <Link
                  href="https://www.youtube.com/@ReachGig"
                  rel="noreferrer"
                  target="_blank"
                  className="text-gray-200 transition hover:text-white/75"
                >
                  <span className="sr-only">YouTube</span>
                  <BsYoutube className="h-12 w-12" />
                </Link>
              </li>
            </ul>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:col-span-2 pt-5 lg:pt-0">
            {/* <div className="text-center sm:text-left">
              <p className="text-lg font-medium text-white">About Us</p>

              <ul className="mt-8 space-y-4 !text-base">
                <li>
                  <Link
                    className="text-gray-200 transition hover:text-gray-200/75"
                    href="/"
                  >
                    Company History
                  </Link>
                </li>

                <li>
                  <Link
                    className="text-gray-200 transition hover:text-gray-200/75"
                    href="/"
                  >
                    Meet the Team
                  </Link>
                </li>

                <li>
                  <Link
                    className="text-gray-200 transition hover:text-gray-200/75"
                    href="/"
                  >
                    Employee Handbook
                  </Link>
                </li>

                <li>
                  <Link
                    className="text-gray-200 transition hover:text-gray-200/75"
                    href="/"
                  >
                    {" "}
                    Careers{" "}
                  </Link>
                </li>
              </ul>
            </div> */}

            <div className="text-center sm:text-left">
              <p className="text-lg font-medium text-white">Legal</p>

              <ul className="mt-8 space-y-4 text-base">
                <li>
                  <Link
                    className="text-gray-200 transition hover:text-gray-200/75"
                    href="/compliance/terms-of-service"
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    Terms of Service
                  </Link>
                </li>

                <li>
                  <Link
                    className="text-gray-200 transition hover:text-gray-200/75"
                    href="/compliance/privacy-policy"
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    {" "}
                    Privacy Policy{" "}
                  </Link>
                </li>

                <li>
                  <Link
                    className="text-gray-200 transition hover:text-gray-200/75"
                    href="/compliance/refund-policy"
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    {" "}
                    Cancellation and Refund Policy{" "}
                  </Link>
                </li>
              </ul>
            </div>

            <div className="text-center sm:text-left">
              <p className="text-lg font-medium text-white">Helpful Links</p>

              <ul className="mt-8 space-y-4 text-base">
                <li>
                  <Link
                    className="text-gray-200 transition hover:text-gray-200/75"
                    href="/contact"
                  >
                    {" "}
                    FAQs{" "}
                  </Link>
                </li>

                <li>
                  <Link
                    className="text-gray-200 transition hover:text-gray-200/75"
                    href="/contact"
                  >
                    {" "}
                    Support{" "}
                  </Link>
                </li>
              </ul>
            </div>

            <div className="text-center sm:text-left break-all">
              <p className="text-lg font-medium text-white">Contact Us</p>

              <ul className="mt-8 space-y-4 text-base">
                <li>
                  <Link
                    className="flex items-center justify-center gap-1.5 ltr:sm:justify-start rtl:sm:justify-end"
                    href="mailto:reachgig.connect@gmail.com"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 shrink-0 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>

                    <span className="flex-1 text-gray-200 underline-offset-4">
                      Mail Us
                    </span>
                  </Link>
                </li>

                <li>
                  <Link
                    className="flex items-center justify-center gap-1.5 ltr:sm:justify-start rtl:sm:justify-end"
                    href="tel:+917550083900"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 shrink-0 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>

                    <span className="flex-1 text-gray-200 underline underline-offset-4">
                      Call Us
                    </span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12  pt-6">
          <div className="text-center sm:flex sm:justify-between ">
            <p className="text-base text-gray-200">
              <span className="block sm:inline">
                © 2023 Reachgig Corp Pvt. Ltd.
              </span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
