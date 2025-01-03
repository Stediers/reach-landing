import type { NextRequest } from "next/server";
import { NextResponse, userAgent } from "next/server";

export function middleware(req: NextRequest) {
  const { ua } = userAgent(req);

  console.log("User Agent: ", ua);

  if (/iP(hone|ad|od)/.test(ua)) {
    return NextResponse.redirect(
      "https://apps.apple.com/in/app/reachgig/id6737802010"
    );
  } else if (/Android/.test(ua)) {
    return NextResponse.redirect(
      "https://play.google.com/store/apps/details?id=com.reachtech.partnerapp&pcampaignid=web_share"
    );
  } else {
    return NextResponse.redirect("https://reachgig.com/partner-program");
  }
}

export const config = {
  matcher: "/download",
};
