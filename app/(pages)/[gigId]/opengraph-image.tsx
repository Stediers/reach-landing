import { fetchPartnerByPartnerId } from "@api_functions/gig/fetch-gig-profile-by-gigId";
import { redirect } from "next/navigation";
import { ImageResponse } from "next/og";

// Image metadata
export const alt = "Partner";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

// Image generation
export default async function Image(props: { params: Promise<{ gigId: string }> }) {
  const params = await props.params;
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
          flexDirection: "column",
          position: "relative",
          backgroundColor: "#000", // Dark background for fallback
        }}
      >
        <img
          src={response.partner.imageUrl}
          alt={response.partner.firstName + " " + response.partner.lastName}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center",
          }}
        />
        {/* Overlay gradient for better text visibility */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "50%",
            background: "linear-gradient(transparent, rgba(0,0,0,0.7))",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 48,
            left: 48,
            display: "flex",
            flexDirection: "column",
            gap: "8px",
          }}
        >
          <div style={{ fontSize: 48, fontWeight: 700, color: "white" }}>
            {response.partner.firstName} {response.partner.lastName}
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Inter",
          data: await fetch(
            new URL(
              "https://fonts.googleapis.com/css2?family=Inter:wght@700&display=swap"
            )
          ).then((res) => res.arrayBuffer()),
          weight: 700,
        },
      ],
    }
  );
}
