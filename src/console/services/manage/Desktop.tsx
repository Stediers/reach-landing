import { deleteService } from "@api_functions/service/delete-service";
import { FetchEditServiceMetadataResponse } from "@api_functions/service/edit-service";
import { updateServiceVisibility } from "@api_functions/service/update-service-visibility";
import LineHeader from "@components/LineHeader";
import Loading from "@components/Loading";
import Setting from "@components/Setting";
import UnderlinedHeader from "@components/UnderlinedHeader";
import { showYesNoPopup } from "@components/notifications/Popup";
import ListWrapper from "@wrapper/ListWrapper";
import DesktopWrapper from "@wrapper/responsive/DesktopWrapper";
import { motion } from "framer-motion";
import Link from "next/link";
import router from "next/router";
import { Dispatch, SetStateAction } from "react";
import { AiFillEdit, AiFillDelete, AiOutlineShareAlt } from "react-icons/ai";
import { MdWork, MdWorkOff } from "react-icons/md";

export default function Desktop({
  service,
  loading,
  setLoading,
  serviceId,
  setService,
}: {
  service: FetchEditServiceMetadataResponse | null;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  serviceId: string;
  setService: Dispatch<SetStateAction<FetchEditServiceMetadataResponse | null>>;
}) {
  return (
    <DesktopWrapper className="flex flex-col items-center px-10 py-5">
      {service && (
        <div className="flex flex-col items-start justify-center w-full space-y-10">
          <UnderlinedHeader title="General" />
          <div className="flex flex-row items-center justify-start w-full space-x-5">
            <Option
              title={service.visible ? "Currently Visible" : "Currently Hidden"}
              icon={
                loading ? (
                  <Loading />
                ) : service.visible ? (
                  <MdWork className="w-[3rem] h-[3rem]" />
                ) : (
                  <MdWorkOff className="w-[3rem] h-[3rem]" />
                )
              }
              onClick={async () => {
                setLoading(true);
                const res = await updateServiceVisibility(
                  serviceId,
                  !service.visible
                );
                if (res) {
                  setService((prev) => ({
                    ...prev!,
                    visible: res.visible,
                  }));
                  setLoading(false);
                } else {
                  setLoading(false);
                }
              }}
              className={`cursor-pointer ${
                service.visible ? "bg-success" : "bg-error"
              } text-white`}
              textColor="text-white"
            />
            <Option
              icon={<AiOutlineShareAlt className="w-[3rem] h-[3rem]" />}
              title="Share"
              onClick={() =>
                router.push(
                  `/console/services/manage/share?serviceId=${serviceId}`
                )
              }
              className="bg-white"
            />
          </div>
          <div className="flex flex-col items-start justify-center w-full space-y-10">
            <UnderlinedHeader title="Critical" />
            <div className="flex flex-row items-center justify-start w-full space-x-5">
              <Link
                href={`/console/services/manage/edit?serviceId=${serviceId}`}
              >
                <Option
                  className="bg-white cursor-pointer"
                  title="Edit"
                  icon={<AiFillEdit className="text-2xl" />}
                />
              </Link>

              <Option
                className="bg-error text-white"
                textColor="text-white"
                title="Delete Service"
                icon={<AiFillDelete className="text-2xl" />}
                onClick={async () => {
                  const confirmation = await showYesNoPopup({
                    title: "Delete Service",
                    message:
                      "Are you sure you want to delete this service?  You will lose all appointments, rating and prices associated with this service.",
                  });
                  if (confirmation) {
                    const response = await deleteService(serviceId);
                    if (response) {
                      router.push("/console/services");
                    }
                  }
                }}
              />
            </div>
          </div>
        </div>
      )}
    </DesktopWrapper>
  );
}

function Option({
  title,
  icon,
  className = "bg-white border border-gray",
  textColor = "text-black",
  onClick,
}: {
  title?: string;
  icon: React.ReactNode;
  className?: string;
  textColor?: string;
  onClick?: () => void;
}) {
  return (
    // responsive square
    <motion.div
      className={`flex flex-col cursor-pointer items-center space-y-2 justify-center w-[10rem] h-[10rem] ${className} border border-gray rounded-lg p-3`}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
    >
      {icon}
      <p className={`text-md font-medium text-center ${textColor}`}>{title}</p>
    </motion.div>
  );
}
