import { BookingBill, Price } from "@data/types";
import { priceString, showPrice } from "@helper_functions/priceString";
import { Button } from "./ui/button";
import Card from "./Card";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./ui/drawer";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogClose,
  DialogDescription,
  DialogTitle,
} from "@components/ui/dialog";

export function BookingBillInvoice({ bill }: { bill: BookingBill }) {
  return (
    <div className="flex flex-col space-y-3 w-full">
      <div className="flex flex-col space-y-5 w-full items-center">
        <div className="flex flex-col space-y-5 w-full items-start justify-start">
          <Item
            title="Partner Advance Fee"
            value={priceString({
              price: bill.advanceFee,
              priceType: "paisa",
            })}
          />
          <Item
            title="Platform Fee (20%)"
            value={priceString({
              price: bill.platformFee,
              priceType: "paisa",
            })}
          />
          <Item
            title="Tax"
            value={priceString({
              price: bill.tax,
              priceType: "paisa",
            })}
          />
          <Item
            title="Total Advance Fee"
            value={priceString({
              price: bill.total,
              priceType: "paisa",
            })}
          />
        </div>
      </div>
    </div>
  );
}

export function AppointmentBillInvoice({ price }: { price: Price }) {
  const basePrice = price.price;
  const discount = price.discount?.value || 0;
  const discountedPrice = (basePrice * discount) / 100;
  const totalPayable = basePrice - discountedPrice;
  return (
    <div className="flex flex-col space-y-3 w-full">
      <div className="flex flex-col space-y-5 w-full items-start justify-start">
        <Item
          title="Base Price"
          value={priceString({ price: basePrice, priceType: "paisa" })}
        />
        <Item
          title={`Discount (${discount}%)`}
          value={
            discountedPrice === 0
              ? "No Discount"
              : `- ${priceString({
                  price: discountedPrice,
                  priceType: "paisa",
                })}`
          }
        />
        <Item
          title="Net Service Fee"
          value={priceString({
            price: totalPayable,
            priceType: "paisa",
          })}
        />
      </div>
      <Card className="w-full flex flex-col !space-y-3">
        <p className="text-center text-textsubtle text-sm">
          Pay it personally to the service provider after the service is
          completed.
        </p>
      </Card>
    </div>
  );
}

function Item({ title, value }: { title: string; value: string }) {
  return (
    <div className="flex flex-row justify-between w-full">
      <p className="text-base">{title}</p>
      <p className="text-base">{value}</p>
    </div>
  );
}

export function AppointmentBillInvoiceDrawer({
  price,
  triggerJsx,
}: {
  price: Price;
  triggerJsx: JSX.Element;
}) {
  return (
    <Drawer closeThreshold={0.5}>
      <DrawerTrigger asChild>{triggerJsx}</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle className="text-xl font-medium">
            Bill Breakdown
          </DrawerTitle>
          <DrawerDescription>
            <p className="text-base font-medium">Total: {showPrice(price)}</p>
          </DrawerDescription>
        </DrawerHeader>
        <DrawerFooter className="flex flex-col space-y-5 w-full items-start justify-start">
          <AppointmentBillInvoice price={price} />
          <DrawerClose asChild>
            <Button className="bg-primary text-white w-full">Okay!</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

export function AppointmentBillInvoiceDialog({
  price,
  triggerJsx,
}: {
  price: Price;
  triggerJsx: JSX.Element;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>{triggerJsx}</DialogTrigger>
      <DialogContent className="flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-xl font-medium">
            Bill Breakdown
          </DialogTitle>
        </DialogHeader>
        <DialogDescription className="text-base font-medium">
          <p className="text-base font-medium">Total: {showPrice(price)}</p>
        </DialogDescription>
        <DialogFooter className="flex flex-col space-y-5 w-full items-start justify-start">
          <AppointmentBillInvoice price={price} />
        </DialogFooter>
        <DialogClose asChild>
          <Button className="bg-primary text-white w-full">Okay!</Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}

export function BookingBillInvoiceDrawer({
  bill,
  triggerJsx,
  onConfirm,
  confirmText = "Confirm",
  cancelText = "Close",
  bookingId,
  showPaymentLink = true,
}: {
  bill: BookingBill;
  triggerJsx: JSX.Element;
  onConfirm?: () => Promise<void>;
  confirmText?: string;
  cancelText?: string;
  bookingId: string | null;
  showPaymentLink?: boolean;
}) {
  return (
    <Drawer closeThreshold={0.5}>
      <DrawerTrigger asChild>{triggerJsx}</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle className="text-xl font-medium">
            Bill Breakdown
          </DrawerTitle>
          <DrawerDescription>
            <p className="text-sm font-medium">
              Before you pay, please make sure you and your partner have
              communicated and agreed on the details of the service.
            </p>
          </DrawerDescription>
        </DrawerHeader>
        <DrawerFooter className="flex flex-col space-y-5 w-full items-start justify-start">
          <BookingBillInvoice bill={bill} />
          <div className="flex flex-row items-center justify-start space-x-3 w-full">
            <DrawerClose asChild>
              <Button variant="close" id="close-booking-bill">
                <p className="text-base font-medium">{cancelText}</p>
              </Button>
            </DrawerClose>
            {onConfirm && (
              <DrawerClose asChild>
                <Button
                  variant="success"
                  className="w-full"
                  onclick={async () => {
                    if (!onConfirm) return;
                    await onConfirm();
                  }}
                  disabled={!bookingId || !showPaymentLink}
                >
                  <p className="text-base font-medium">{confirmText}</p>
                </Button>
              </DrawerClose>
            )}
          </div>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
