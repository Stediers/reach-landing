"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import Script from "next/script";

const loadScript = (src: string) =>
  new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      console.log("razorpay loaded successfully");
      resolve(true);
    };
    script.onerror = () => {
      console.log("error in loading razorpay");
      resolve(false);
    };
    document.body.appendChild(script);
  });

export default function Checkout({
  orderId,
  name,
  mobileNumber,
  disabled,
  onCompletePayment,
}: {
  orderId: string;
  name: string;
  mobileNumber: string;
  disabled: boolean;
  onCompletePayment?: (response: any) => Promise<void>;
}) {
  const [rzp1, setRzp1] = useState<any>(null);
  const paymentId = useRef(null);
  const paymentMethod = useRef(null);

  // To load razorpay checkout modal script.
  const displayRazorpay = async (options: {
    key_id: string | undefined; //Enter the Key ID generated from the Dashboard
    one_click_checkout: boolean;
    name: string;
    order_id: string; //This is a sample Order ID. Pass the `id` obtained in the response of Step 1; mandatory
    show_coupons: boolean; // default true; false if coupon widget should be hidden
    handler: (response: any) => void; //pass the callback URL where you want to receive the payment completion response
    prefill: {
      //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
      name: string; //Provide the customer's name
      contact: string;
    };
    notes: { address: string };
    modal: { backdropclose: boolean };
  }) => {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      console.log("Razorpay SDK failed to load. Are you online?");
      return;
    }
    // All information is loaded in options which we will discuss later.
    // @ts-ignore
    const rzp1 = new window.Razorpay(options);

    // If you want to retreive the chosen payment method.
    rzp1.on("payment.submit", (response: { method: null }) => {
      paymentMethod.current = response.method;
    });

    // To get payment id in case of failed transaction.
    rzp1.on(
      "payment.failed",
      (response: { error: { metadata: { payment_id: null } } }) => {
        paymentId.current = response.error.metadata.payment_id;
      }
    );

    setRzp1(rzp1);
  };
  // useEffect(() => {
  //   if (typeof window !== "undefined") {
  //     var options = {
  //       key_id: process.env.RAZORPAY_KEY_ID, //Enter the Key ID generated from the Dashboard
  //       one_click_checkout: true,
  //       name: "ReachGig",
  //       order_id: orderId, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1; mandatory
  //       show_coupons: true, // default true; false if coupon widget should be hidden
  //       handler: function (response: any) {
  //         onCompletePayment && onCompletePayment(response);
  //       }, //pass the callback URL where you want to receive the payment completion response
  //       prefill: {
  //         //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
  //         name: name, //Provide the customer's name
  //         contact: mobileNumber, //Provide the customer's contact number
  //       },
  //       notes: {
  //         address: "Razorpay Corporate Office",
  //       },
  //       modal: {
  //         backdropclose: true,
  //       },
  //     };
  //     //@ts-ignore
  //     const rzp1 = new window.Razorpay(options);

  //     console.log("ola", rzp1);

  //     rzp1.on("payment.failed", function (response: any) {
  //       alert(response.error.code);
  //       alert(response.error.description);
  //       alert(response.error.source);
  //       alert(response.error.step);
  //       alert(response.error.reason);
  //       alert(response.error.metadata.order_id);
  //       alert(response.error.metadata.payment_id);
  //     });

  //     setRzp1(rzp1);
  //   }
  // }, []);

  const options = {
    key_id: process.env.RAZORPAY_KEY_ID, //Enter the Key ID generated from the Dashboard
    one_click_checkout: true,
    name: "ReachGig",
    order_id: orderId, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1; mandatory
    show_coupons: true, // default true; false if coupon widget should be hidden
    handler: function (response: any) {
      onCompletePayment && onCompletePayment(response);
    }, //pass the callback URL where you want to receive the payment completion response
    prefill: {
      //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
      name: name, //Provide the customer's name
      contact: mobileNumber, //Provide the customer's contact number
    },
    notes: {
      address: "Razorpay Corporate Office",
    },
    modal: {
      backdropclose: false,
    },
  };

  useEffect(() => {
    console.log("in razorpay");
    if (typeof window === "undefined") return;
    displayRazorpay(options);
  }, []);

  return (
    <>
      {/* <Script src="https://checkout.razorpay.com/v1/checkout.js" /> */}
      <Button
        variant="success"
        id="rzp-button1"
        disabled={disabled && !rzp1}
        asyncOnClick={async (e) => {
          rzp1.open();
          e.preventDefault();
        }}
      >
        Pay Now
      </Button>
    </>
  );
}
