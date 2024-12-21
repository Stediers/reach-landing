import Card from "@components/Card";
import { ServiceCardSkeleton } from "@components/ServiceCard";
import Link from "next/link";
import { CustomerRoutes } from "@data/enums";
import Image from "next/image";
import { fetchPartners } from "@api_functions/explore/fetch-partners";

//revalidate every 10 minutes
export const revalidate = 0;

export default async function Page({
  params,
}: {
  params: { designation: string; city: string };
}) {
  const res = await fetchPartners({
    city: params.city,
    profession: params.designation,
  });
  if (!res) return <ServiceCardSkeleton />;
  return (
    <div className="w-full flex flex-col justify-start items-start relative !hide-scrollbar py-5 space-y-5">
      <div className="flex flex-row items-center  justify-between w-full">
        <h1 className="text-xl lg:text-2xl font-medium max-w-md">Explore</h1>
      </div>
      {res.map((profile) => (
        <Profile
          key={profile.handle}
          name={profile.firstName}
          designation={profile.designation}
          image={profile.imageUrl}
          handle={profile.handle || ""}
        />
      ))}
    </div>
  );
}

function Profile({
  name,
  designation,
  image,
  handle,
}: {
  name: string;
  designation: string;
  image: string;
  handle: string;
}) {
  const link = CustomerRoutes.PARTNER.replace("[partnerHandle]", handle);
  console.log(link);
  return (
    <Link
      className="flex flex-col items-start justify-center space-y-3 min-w-[13rem] max-w-[13rem] lg:!min-w-[18rem] lg:max-w-[18rem] overflow-hidden"
      href={
        CustomerRoutes.PARTNER.replace("[partnerHandle]", handle) +
        "?backLink=" +
        link
      }
    >
      <Card className="flex flex-col items-start justify-center !space-y-3 transition-transform hover:shadow-md hover:cursor-pointer transform-gpu">
        <Image
          src={image}
          alt={name}
          className="w-40 h-40 rounded-lg bg-red-100 object-cover"
          width={160}
          height={160}
        />
        <div className="flex flex-col items-start justify-center space-y-1">
          <h4 className="text-lg font-medium line-clamp-1">{name}</h4>
          <p className="text-sm text-textsubtle line-clamp-2">{designation}</p>
        </div>
      </Card>
    </Link>
  );
}
