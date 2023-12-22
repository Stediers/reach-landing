import { fetchAPIProtected } from "@api_functions/internal/base-functions";
import { deleteItemsFromLocalStorage } from "@api_functions/internal/local-storage";
import { PaymentMode, RequestMethod } from "@data/enums";

type UpdatePaymentRequest = {
  appointmentId: string;
  mode: PaymentMode;
};

export async function updatePaymentStatus(
  request: UpdatePaymentRequest
): Promise<boolean> {
  const res = await fetchAPIProtected({
    url: "update-payment-status",
    method: RequestMethod.POST,
    body: request,
  });

  if (res.status) {
    deleteItemsFromLocalStorage({
      keys: [`fetch-appointments-by-date`],
    });
  }

  return res.status;
}
