import { fetchPartnerByPartnerId } from "@api_functions/gig/fetch-gig-profile-by-gigId";
import { redirect } from "next/navigation";
import { ImageResponse } from "next/og";

// Route segment config
export const runtime = "edge";

// Image metadata
export const alt = "Partner";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

// Image generation
export default async function Image({ params }: { params: { gigId: string } }) {
  const gigId = params.gigId;
  const response = await fetchPartnerByPartnerId(gigId);
  if (!response) {
    redirect("/404");
  }

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          backgroundColor: "white",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          fontWeight: 600,
          color: "white",
        }}
      >
        <img
          src={response.partner.imageUrl}
          alt={response.partner.firstName + " " + response.partner.lastName}
          style={{
            width: "1200px",
            height: "630px",
            objectFit: "cover",
            objectPosition: "center",
          }}
        />
      </div>
    ),
    {
      ...size,
    }
  );
}
