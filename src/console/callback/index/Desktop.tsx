import { CallbackComponentDesktop } from "@components/Callback";
import Card from "@components/Card";
import { Button } from "@components/ui/button";
import { Callback } from "@data/types";
import SubHeadingWrapper from "@wrapper/SubHeadingWrapper";
import DesktopWrapper from "@wrapper/responsive/DesktopWrapper";

export default function Desktop({
  success,
  pending,
  rejected,
}: {
  success: Callback[];
  rejected: Callback[];
  pending: Callback[];
}) {
  return (
    <DesktopWrapper
      className="flex flex-col w-full space-y-5"
      title="Callbacks"
    >
      <SubHeadingWrapper title="Success">
        {success.length > 0 ? (
          success.map((item) => (
            <CallbackComponentDesktop
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
      </SubHeadingWrapper>

      <SubHeadingWrapper title="Pending">
        {pending.length > 0 ? (
          pending.map((item) => (
            <CallbackComponentDesktop
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
      </SubHeadingWrapper>
      <SubHeadingWrapper title="Rejected">
        {rejected.length > 0 ? (
          rejected.map((item) => (
            <CallbackComponentDesktop
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
      </SubHeadingWrapper>
    </DesktopWrapper>
  );
}
