import Script from "next/script";

export default function FreshWorksScript() {
  return (
    <>
      <Script id="widgetfw">
        {`
                  window.fwSettings = {
                    'widget_id': ${process.env.NEXT_PUBLIC_WIDGET_ID}
                  };
                  !function() {
                    if ("function" !== typeof window.FreshworksWidget) {
                      var n = function() {
                        n.q.push(arguments)
                      };
                      n.q = [];
                      window.FreshworksWidget = n
                    }
                  }();
                `}
      </Script>
      <Script
        type="text/javascript"
        src={`https://ind-widget.freshworks.com/widgets/${process.env.NEXT_PUBLIC_WIDGET_ID}.js`}
        async
        defer
      ></Script>
    </>
  );
}
