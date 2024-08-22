import { CallbackComponentMobile } from "@components/Callback";
import Card from "@components/Card";
import LineHeader from "@components/LineHeader";
import { Button } from "@components/ui/button";
import { Callback } from "@data/types";
import MobileWrapper from "@wrapper/responsive/MobileWrapper";

export default function Mobile({
  success,
  rejected,
  pending,
}: {
  success: Callback[];
  rejected: Callback[];
  pending: Callback[];
}) {
  return (
    <MobileWrapper
      className="flex flex-col items-start space-y-5 w-full"
      header="Callbacks"
    >
      {success.length > 0 ? (
        success.map((item) => (
          <CallbackComponentMobile
            key={item.id}
            callback={item}
            partner={item.partner}
            footerJSX={
              <Button
                variant="success"
                onClick={() => {
                  window.open(`tel:${item.partner.mobileNumber}`);
                }}
              >
                Call Partner
              </Button>
            }
          />
        ))
      ) : (
        <Card className="flex flex-col items-center justify-center">
          <p className="text-lg font-medium text-textsubtle">
            No successful callbacks
          </p>
        </Card>
      )}
      <LineHeader title="Pending" />
      {pending.length > 0 ? (
        pending.map((item) => (
          <CallbackComponentMobile
            key={item.id}
            callback={item}
            partner={item.partner}
            footerJSX={
              <Button
                variant="success"
                onClick={() => {
                  window.open(`tel:${item.partner.mobileNumber}`);
                }}
              >
                Call Partner
              </Button>
            }
          />
        ))
      ) : (
        <Card className="flex flex-col items-center justify-center">
          <p className="text-lg font-medium text-textsubtle">
            No pending callbacks
          </p>
        </Card>
      )}
      <LineHeader title="Rejected" />
      {rejected.length > 0 ? (
        rejected.map((item) => (
          <CallbackComponentMobile
            key={item.id}
            callback={item}
            partner={item.partner}
            footerJSX={
              <Button
                variant="success"
                onClick={() => {
                  window.open(`tel:${item.partner.mobileNumber}`);
                }}
              >
                Call Partner
              </Button>
            }
          />
        ))
      ) : (
        <Card className="flex flex-col items-center justify-center">
          <p className="text-lg font-medium text-textsubtle">
            No rejected callbacks
          </p>
        </Card>
      )}
    </MobileWrapper>
  );
}
