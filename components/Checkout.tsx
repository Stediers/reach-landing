"use client";

import { useEffect, useState } from "react";
import { Button } from "./ui/button";

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
  useEffect(() => {
    if (typeof window !== "undefined") {
      var options = {
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
          backdropclose: true,
        },
      };
      //@ts-ignore
      const rzp1 = new window.Razorpay(options);

      console.log("ola", rzp1);

      rzp1.on("payment.failed", function (response: any) {
        alert(response.error.code);
        alert(response.error.description);
        alert(response.error.source);
        alert(response.error.step);
        alert(response.error.reason);
        alert(response.error.metadata.order_id);
        alert(response.error.metadata.payment_id);
      });

      setRzp1(rzp1);
    }
  }, []);

  return (
    <Button
      variant="success"
      id="rzp-button1"
      disabled={disabled && !rzp1}
      asyncOnClick={async () => {
        rzp1.open();
      }}
    >
      Pay Now
    </Button>
  );
}
