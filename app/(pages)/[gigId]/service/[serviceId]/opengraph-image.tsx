import { fetchServiceByServiceId } from "@api_functions/service/fetch-service-by-serviceId";
import { ServiceType } from "@data/enums";
import { redirect } from "next/navigation";
import { AiFillHome, AiFillVideoCamera } from "react-icons/ai";
import { MdLocationPin } from "react-icons/md";
import { ImageResponse } from "next/og";
import { loadGoogleFont } from "@/helper_functions/font";

// Image metadata
export const alt = "Service";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function Image(props: {
  params: Promise<{ serviceId: string }>;
}) {
  const params = await props.params;
  // Load the font
  const poppins = await loadGoogleFont({
    family: "Poppins",
    weight: [400, 600, 700, 900],
  });

  const serviceId = params.serviceId;
  const response = await fetchServiceByServiceId(serviceId);
  if (!response) {
    redirect("/404");
  }

  //poppins font
  const serviceType =
    response.service.serviceType === ServiceType.ONLINE
      ? "Provided " +
        response.service.serviceType.charAt(0).toUpperCase() +
        response.service.serviceType.slice(1)
      : response.service.serviceType === ServiceType.OFFLINE
      ? response.gig.city
        ? response.gig.city
        : "N/A"
      : response.service.address
      ? response.service.address.city + ", " + response.service.address.state
      : "N/A";

  const serviceTitle =
    response.service.title.charAt(0).toUpperCase() +
    response.service.title.slice(1, 20);
  // response.service.title.charAt(0).toUpperCase() +
  // response.service.title.slice(1, 20);
  const gigName =
    "by " +
    (response.gig.firstName + " " + response.gig.lastName)
      .charAt(0)
      .toUpperCase() +
    (response.gig.firstName + " " + response.gig.lastName).slice(1);

  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(to bottom right, #ffffff, #f8f8f8)",
          width: "1200px",
          height: "630px",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "space-between",
          padding: "48px",
          fontFamily: "Poppins",
        }}
      >
        {/* Header */}
        <div tw="flex w-full justify-between items-center">
          <div tw={`flex flex-col items-center justify-center`}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 771.150697014229991 257.103391601639487"
              fill="#f40e1e"
              stroke="#000000"
              strokeMiterlimit="10"
              strokeWidth="2px"
              height={40}
              widths={40}
            >
              <path d="m404.000000000000909,228.707749211559531c35.73529052734375-102.752044677735284,106.5885009765625-152.223815917969659,214.44439697265625-145.555541992188409,70.75079345703125-5.37603759765625,119.5430908203125-29.219879150390625,145.55560302734375-72.22222900390625,11.4569091796875,58.539337158203125-6.40728759765625,104.567138671875-85.55560302734375,124.444458007813409,12.939453125,3.01214599609375,30.485107421875,2.512786865234375,76.66668701171875-15.555572509766534-26.39404296875,56.242797851563409-71.13836669921875,82.853240966797784-130,86.666656494141534,26.04229736328125,7.302978515625,52.24127197265625,11.013427734375,78.888916015625,4.4444580078125-40.3961181640625,44.44915771484375-98.0443115234375,55.697662353515625-177.77777099609375,24.4444580078125-47.6141357421875-22.530517578125-89.4322509765625-27.935791015625-122.22222900390625-6.66668701171875Z" />
              <path d="m367.150697014229991,228.707749211559531c-35.73529052734375-102.752044677735284-106.5885009765625-152.223815917969659-214.44439697265625-145.555541992188409C81.955506584542491,77.776169621714871,33.163209221261241,53.932328068980496,7.150697014229991,10.929978215464871c-11.4569091796875,58.539337158203125,6.40728759765625,104.567138671875,85.55560302734375,124.444458007813409-12.939453125,3.01214599609375-30.485107421875,2.512786865234375-76.66668701171875-15.555572509766534,26.39404296875,56.242797851563409,71.13836669921875,82.853240966797784,130,86.666656494141534-26.04229736328125,7.302978515625-52.24127197265625,11.013427734375-78.888916015625,4.4444580078125,40.3961181640625,44.44915771484375,98.0443115234375,55.697662353515625,177.77777099609375,24.4444580078125,47.6141357421875-22.530517578125,89.4322509765625-27.935791015625,122.22222900390625-6.66668701171875Z" />
            </svg>
            <p tw={`text-2xl font-medium`}>ReachGig</p>
          </div>
          <div tw="flex flex-row items-start">
            <div tw="flex flex-row items-center">
              {response.service.serviceType === ServiceType.ONLINE ? (
                <AiFillVideoCamera
                  style={{ height: "1.5rem", width: "1.5rem" }}
                />
              ) : response.service.serviceType === ServiceType.OFFLINE ? (
                <MdLocationPin style={{ fontSize: "1.5rem" }} />
              ) : (
                <AiFillHome style={{ fontSize: "1.5rem" }} />
              )}
              <div tw="pl-3 flex">
                <p tw="text-lg font-medium">{serviceType}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div tw="flex flex-col gap-4 w-4/5">
          <p
            tw="text-6xl leading-tight"
            style={{
              fontWeight: 900,
              background: "linear-gradient(90deg, #f40e1e 0%, #ff4d4d 100%)",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            {serviceTitle}
          </p>
          <p tw="text-4xl text-gray-700 font-semibold">{gigName}</p>
        </div>

        {/* Footer */}
        <div tw="flex w-full justify-between items-center">
          <p tw="text-xl font-medium text-gray-600">reachgig.com</p>
          <p tw="text-lg text-gray-500">Professional Services Marketplace</p>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Poppins",
          data: poppins,
          style: "normal",
        },
      ],
    }
  );
}
