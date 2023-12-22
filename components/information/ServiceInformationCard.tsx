import Card from "@components/Card";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css/pagination";
import "swiper/css";

export default function ServiceInformationCard({
  item,
}: {
  item: {
    title: string;
    description: string;
  }[];
}) {
  return (
    <Card className="flex flex-col items-center !justify-center !space-y-5 w-full">
      <div className=" w-full">
        <Swiper
          // @ts-ignore
          modules={[Autoplay, Pagination]}
          centeredSlides={true}
          pagination={{
            clickable: true,
          }}
          slidesPerView={1}
          spaceBetween={100}
          loop={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          className="w-full flex items-center justify-center"
        >
          {item.map(({ title, description }) => (
            <SwiperSlide
              key={title}
              className="w-full min-h-[12rem] flex items-center justify-center"
            >
              <SubHeadingWrapper title={title} description={description} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </Card>
  );
}

function SubHeadingWrapper({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center space-y-1 w-full">
      {/* <p className="text-md font-medium text-center">{title}</p> */}
      <p className="text-base/7 text-center">{description}</p>
    </div>
  );
}
