import { CustomerRoutes } from "@data/enums";
import { redirect } from "next/navigation";

export default async function Page(props: {
  params: Promise<{ gigId: string }>;
  searchParams: Promise<{
    backLink: string;
  }>;
}) {
  const params = await props.params;
  const searchParams = await props.searchParams;
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
