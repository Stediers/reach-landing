import Head from "next/head";

export default function Widget() {
  return (
    <div>
      {/* Other page content goes here */}

      <Head>
        <script>
          {`
                window.fwSettings = {
                  'widget_id': 1060000000788
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
        </script>
        <script
          type="text/javascript"
          src="https://ind-widget.freshworks.com/widgets/1060000000788.js"
          async
          defer
        ></script>
      </Head>
    </div>
  );
}
