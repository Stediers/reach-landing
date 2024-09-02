import { CustomerRoutes } from "@data/enums";
import { redirect } from "next/navigation";

export default async function Page({
  params,
  searchParams,
}: {
  params: { gigId: string };
  searchParams: {
    backLink: string;
  };
}) {
  const correctedGigId = params.gigId.replace("%40", "");
  const backLink = searchParams.backLink;
  console.log("correctedGigId", correctedGigId);
  redirect(
    `${CustomerRoutes.PARTNER.replace(
      "[partnerHandle]",
      correctedGigId
    )}?backLink=${backLink}`
  );
  return null;
}
