import ImageComponent from "./ImageComponent";
import { Button } from "./ui/button";

export default function Hero({
  title,
  subtitle,
  image,
}: {
  title: string;
  subtitle: string;
  image: string;
}) {
  return (
    <div className="bg-foreground w-full">
      <div className="px-10 py-16 mx-auto lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
        <div className="max-w-xl sm:mx-auto lg:max-w-2xl">
          <div className="flex flex-col space-y-5 items-center mb-16 text-center sm:mb-0">
            <ImageComponent
              src={image}
              alt={title}
              className="w-[15rem] h-[15rem] object-cover"
              border={false}
            />
            <div className="max-w-xl mb-10 md:mx-auto sm:text-center lg:max-w-2xl md:mb-12">
              <h2 className="max-w-lg mb-6  text-3xl font-bold leading-none text-white sm:text-4xl md:mx-auto">
                <span className="relative inline-block">
                  <span className="relative">{title}</span>
                </span>{" "}
              </h2>
              <p className="text-base text-indigo-100 md:text-lg !leading-10">
                {subtitle}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
