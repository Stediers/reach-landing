"use client";

import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import { State } from "@data/enums";

const loadScript = async (src: string) => {
  const res = await new Promise((resolve) => {
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
  console.log("res", res);
  return res;
};

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
  const [state, setState] = useState<State>(State.LOADING);

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
    return loadScript(
      "https://checkout.razorpay.com/v1/magic-checkout.js"
    ).then((res) => {
      if (!res) {
        console.log("Razorpay SDK failed to load. Are you online?");
        return false;
      } else {
        console.log("Razorpay SDK loaded successfully");
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
      return true;
    });
  };

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
    setState(State.LOADING);
    console.log("in razorpay");
    if (typeof window === "undefined") return;
    displayRazorpay(options).then((res) => {
      if (res) {
        setState(State.SUCCESS);
      } else {
        setState(State.ERROR);
      }
    });
  }, []);

  useEffect(() => {
    console.log("razorpay state", state);
  }, [state]);

  // useEffect(() => {
  //   setState(State.SUCCESS);
  // }, [orderId]);

  return (
    <>
      <Button
        // variant="success"
        id="rzp-button1"
        variant="success"
        disabled={disabled && !rzp1}
        onClick={async (e) => {
          const closeCheckoutDrawer = document.getElementById("close-checkout");
          if (closeCheckoutDrawer) {
            closeCheckoutDrawer.click();
          }
          setTimeout(() => {
            rzp1.open();
            e.preventDefault();
          }, 500);
        }}
        buttonstate={state}
      >
        Pay Now
      </Button>
    </>
  );
}

function PleaseWait() {
  return <div>Please wait...</div>;
}
