"use client";

import { useEffect } from "react";
import { Button } from "./ui/button";

export default function Checkout({
  orderId,
  name,
  mobileNumber,
  disabled,
  triggerJSX = (
    <Button variant="success" id="rzp-button1" disabled={disabled}>
      Pay Now
    </Button>
  ),
  onCompletePayment,
}: {
  triggerJSX?: JSX.Element;
  orderId: string;
  name: string;
  mobileNumber: string;
  disabled: boolean;
  onCompletePayment?: (response: any) => Promise<void>;
}) {
  useEffect(() => {
    if (typeof window !== "undefined") {
      var options = {
        key_id: process.env.RAZORPAY_KEY_ID, //Enter the Key ID generated from the Dashboard
        one_click_checkout: true,
        name: "Acme Corp", //your business name
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
      };
      //@ts-ignore
      const rzp1 = new window.Razorpay(options);

      rzp1.on("payment.failed", function (response: any) {
        alert(response.error.code);
        alert(response.error.description);
        alert(response.error.source);
        alert(response.error.step);
        alert(response.error.reason);
        alert(response.error.metadata.order_id);
        alert(response.error.metadata.payment_id);
      });

      const button = document.getElementById("rzp-button1");
      if (button) {
        button.onclick = function (e) {
          rzp1.open();
          e.preventDefault();
        };
      }
    }
  }, []);

  return <>{triggerJSX}</>;
}
