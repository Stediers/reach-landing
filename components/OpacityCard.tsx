import Card from "./Card";
import Image from "next/image";

export default function OpacityCard({
  src,
  heading,
  description,
}: {
  src: string;
  heading: string;
  description: string;
}) {
  return (
    <Card className="flex !bg-[#FAFAFA] lg:items-start flex-col items-center justify-start space-y-6 lg:space-y-10 !rounded-3xl px-5 py-7 lg:px-10 lg:py-14 text-black">
      <Image
        alt="Hero"
        src={src}
        width={200}
        height={200}
        className="w-full lg:h-[15rem] object-cover"
      />
      <div className="flex flex-col items-start justify-center lg:space-y-5 space-y-3 w-full">
        <h3 className="lg:text-2xl text-2xl font-medium w-full lg:text-start">
          {heading}
        </h3>
        <p className="text-md lg:text-lg lg:text-start">{description}</p>
      </div>
    </Card>
  );
}
