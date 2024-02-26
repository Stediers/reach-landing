import ComponentWrapper from "@wrapper/ComponentWrapper";
import ImageComponent from "./ImageComponent";

export default function SideComponent({
  imageUrl,
  title,
  description,
  desktopImageClassName = "w-[18rem] h-[18rem] object-cover",
  mobileImageClassName = "w-48 h-48 object-cover",
}: {
  imageUrl: string;
  title: string;
  description: string;
  desktopImageClassName?: string;
  mobileImageClassName?: string;
}) {
  return (
    <ComponentWrapper>
      {" "}
      <ImageComponent
        src={imageUrl}
        className={`${mobileImageClassName} lg:hidden`}
        alt={title}
        border={false}
      />
      <div className="flex flex-col space-y-5 leading-7 text-center md:text-left md:w-full md:flex md:flex-col md:space-y-5 md:leading-7 lg:pt-14">
        <h2 className="max-w-lg font-medium leading-10 lg:text-3xl text-2xl">
          {title}
        </h2>
        <p className="lg:text-lg text-base">{description}</p>
      </div>
      <ImageComponent
        src={imageUrl}
        className={`${desktopImageClassName} hidden lg:block`}
        alt={title}
        border={false}
      />
    </ComponentWrapper>
  );
}
