import {
  ServiceMedia,
  ServicePreferences,
  BasicDetails,
  HomeServiceTypeDetails,
  OfflineServiceTypeDetails,
  OnlineServiceTypeDetails,
} from "@api_functions/service/add-service";
import Button from "@components/Button";
import Card from "@components/Card";
import ImageComponent from "@components/ImageComponent";
import LineHeader from "@components/LineHeader";
import { LocationCardWithName } from "@components/LocationCard";
import Point from "@components/Point";
import PriceComponent from "@components/Price";
import ToggleButton from "@components/ToggleButton";
import AddressInput, { AddressNameInput } from "@components/input/AddressInput";
import { ImagesInput, VideoInput } from "@components/input/MediaInput";
import RadioInput from "@components/input/RadioInput";
import RangeInput from "@components/input/RangeInput";
import SelectInput from "@components/input/SelectInput";
import TextInput from "@components/input/TextInput";
import {
  OnlinePlatform,
  PreferredGender,
  PricingType,
  S3BucketName,
  ServiceType,
  State,
} from "@data/enums";
import {
  AddOn,
  Address,
  Discount,
  LocationAttributes,
  Price,
} from "@data/types";
import verifyPoint from "@helper_functions/verifyPoint";
import { StepData } from "@data/types";
import { AnimatePresence, motion } from "framer-motion";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  AiFillStop,
  AiOutlineAlert,
  AiOutlineCheck,
  AiOutlineClose,
  AiOutlinePlus,
  AiOutlineHome,
  AiOutlineWifi,
  AiFillDelete,
  AiFillInfoCircle,
  AiOutlineBars,
  AiOutlineInfoCircle,
} from "react-icons/ai";
import { BsGenderMale, BsGenderFemale, BsMicrosoftTeams } from "react-icons/bs";
import { FaLaptop, FaCarSide, FaUserClock } from "react-icons/fa";
import { FcGoogle, FcPhone } from "react-icons/fc";
import { MdWorkHistory } from "react-icons/md";
import { SiZoom, SiSkype } from "react-icons/si";
import { FetchAddServiceMetadataResponse } from "@api_functions/service/fetch-add-service-metadata";
import Checker from "@components/Checker";
import DesktopHeaderWrapper from "@wrapper/responsive/DesktopHeaderWrapper";
import priceString from "@helper_functions/priceString";
import { showInfoPopup } from "@components/notifications/Popup";
import Lottie from "lottie-react";
import PriceInfoIcon from "@public/lottie/price-info.json";
import PricingTypeInfoIcon from "@public/lottie/pricing-type-info.json";
import DiscountInfoIcon from "@public/lottie/discount-info.json";
import { uploadFiletoS3WithProgress } from "@api_functions/utility/upload-file-to-S3";
import { showSnackBar } from "@components/notifications/Snackbar";
import router from "next/router";
import DesktopWrapper from "@wrapper/responsive/DesktopWrapper";

export default function Desktop({
  showAddService,
  setShowAddService,
  addService,
  basicDetails,
  setBasicDetails,
  price,
  setPrice,
  onlineServiceDetails,
  setOnlineServiceDetails,
  offlineServiceDetails,
  setOfflineServiceDetails,
  homeServiceDetails,
  setHomeServiceDetails,
  serviceMedia,
  setServiceMedia,
  servicePreferences,
  setServicePreferences,
  buttonState,
  setButtonState,
  addServiceMetadata,
  steps,
  currentStep,
  setCurrentStep,
  serviceType,
  setServiceType,
  attachedAddOnIds,
  setAttachedAddOnIds,
}: {
  showAddService: boolean;
  setShowAddService: React.Dispatch<React.SetStateAction<boolean>>;
  buttonState: State;
  setButtonState: React.Dispatch<React.SetStateAction<State>>;
  basicDetails: BasicDetails;
  setBasicDetails: React.Dispatch<React.SetStateAction<BasicDetails>>;
  price: Price;
  setPrice: React.Dispatch<React.SetStateAction<Price>>;
  onlineServiceDetails: OnlineServiceTypeDetails;
  setOnlineServiceDetails: React.Dispatch<
    React.SetStateAction<OnlineServiceTypeDetails>
  >;
  offlineServiceDetails: OfflineServiceTypeDetails;
  setOfflineServiceDetails: React.Dispatch<
    React.SetStateAction<OfflineServiceTypeDetails>
  >;
  homeServiceDetails: HomeServiceTypeDetails;
  setHomeServiceDetails: React.Dispatch<
    React.SetStateAction<HomeServiceTypeDetails>
  >;
  serviceMedia: ServiceMedia;
  setServiceMedia: React.Dispatch<React.SetStateAction<ServiceMedia>>;
  servicePreferences: ServicePreferences;
  setServicePreferences: React.Dispatch<
    React.SetStateAction<ServicePreferences>
  >;
  addServiceMetadata: FetchAddServiceMetadataResponse;
  addService: ({
    imageUrls,
    videoUrl,
  }: {
    imageUrls: string[];
    videoUrl: string | null;
  }) => Promise<boolean>;
  currentStep: StepData;
  setCurrentStep: React.Dispatch<React.SetStateAction<StepData>>;
  steps: StepData[];
  serviceType: ServiceType;
  setServiceType: React.Dispatch<React.SetStateAction<ServiceType>>;
  attachedAddOnIds: string[];
  setAttachedAddOnIds: React.Dispatch<React.SetStateAction<string[]>>;
}) {
  const [serviceUploadStatus, setServiceUploadStatus] = useState(false);
  const [imageUploadProgress, setImageUploadProgress] = useState(
    serviceMedia.images.map(() => 0)
  );
  const [imageUploadError, setImageUploadError] = useState(
    serviceMedia.images.map(() => false)
  );
  const [imageUploadStatus, setImageUploadStatus] = useState(false);
  return (
    <DesktopWrapper
      className="grid grid-cols-5 h-screen hide-scrollbar w-full"
      sidebar={false}
      padding={false}
    >
      <div className="max-h-screen flex flex-col items-center justify-end space-y-5 w-full bg-primary text-white px-20 pb-20 col-span-2">
        <AnimatePresence mode="wait">
          <div className="flex flex-col items-start justify-center space-y-2 w-full">
            <p className="text-3xl font-medium">{currentStep.title}</p>
            <p className="text-lg font-medium">{currentStep.description}</p>
          </div>
          {currentStep.index === 0 ? (
            <BasicDetailsFormCheckers form={basicDetails} key={1} />
          ) : currentStep.index === 1 ? (
            <PriceFormCheckers price={price} key={2} />
          ) : currentStep.index === 2 ? (
            <PreferencesFormCheckers preferences={servicePreferences} key={4} />
          ) : currentStep.index === 3 ? (
            <AddOnFormCheckers attachedAddOnIds={attachedAddOnIds} key={6} />
          ) : currentStep.index === 4 ? (
            <ServiceTypeFormCheckers
              serviceType={serviceType}
              onlineServiceDetails={onlineServiceDetails}
              offlineServiceDetails={offlineServiceDetails}
              homeServiceDetails={homeServiceDetails}
              key={5}
            />
          ) : currentStep.index === 5 ? (
            <MediaFormCheckers media={serviceMedia} key={3} />
          ) : (
            <></>
          )}
        </AnimatePresence>
        <div className="flex items-center justify-center space-x-5 w-full">
          {currentStep.index != 0 ? (
            <Button
              text="Back"
              onClick={() => {
                if (currentStep.index === 0) {
                  return;
                }
                setCurrentStep(steps[currentStep.index - 1]);
              }}
              className="bg-white text-primary font-medium"
            />
          ) : null}
          {currentStep.index !== steps.length - 1 ? (
            <Button
              text="Next"
              onClick={() => {
                if (currentStep.index === steps.length - 1) {
                  return;
                }
                setCurrentStep(steps[currentStep.index + 1]);
              }}
              className="bg-white text-primary font-medium"
              disabled={!currentStep.state}
            />
          ) : null}
          {!steps.some((step) => step.state === false) ? (
            <Button
              text="Add Service"
              disabled={steps.some((step) => step.state === false)}
              onClick={async () => {
                setImageUploadStatus(false);
                setServiceUploadStatus(false);
                setImageUploadProgress(serviceMedia.images.map(() => 0));
                setImageUploadError(serviceMedia.images.map(() => false));
                setShowAddService(true);
                if (serviceMedia.images.length === 0) {
                  setShowAddService(false);
                  showSnackBar({
                    message: "Please add atleast one image",
                    state: State.ERROR,
                  });
                  return;
                } else if (serviceMedia.images.length > 5) {
                  setShowAddService(false);
                  showSnackBar({
                    message: "You can add only 5 images",
                    state: State.ERROR,
                  });
                  return;
                }
                const imageurls = await Promise.all(
                  serviceMedia.images.map(async (image) => {
                    const url = await uploadFiletoS3WithProgress({
                      file: image,
                      bucketName: S3BucketName.SERVICE,
                      fileName: image.name + Date.now().toString(),
                      onProgress: (progress) => {
                        setImageUploadProgress((prev) => {
                          const newProgress = [...prev];
                          newProgress[serviceMedia.images.indexOf(image)] =
                            progress;
                          return newProgress;
                        });
                      },
                      onErr: () => {
                        setImageUploadError((prev) => {
                          const newError = [...prev];
                          newError[serviceMedia.images.indexOf(image)] = true;
                          return newError;
                        });
                        setImageUploadProgress((prev) => {
                          const newProgress = [...prev];
                          newProgress[serviceMedia.images.indexOf(image)] = 100;
                          return newProgress;
                        });
                      },
                    });
                    if (!url) {
                      //skip this image
                      return "";
                    }
                    return url;
                  })
                );

                const filteredImageUrls = imageurls.filter((url) => url !== "");
                setImageUploadStatus(true);
                setImageUploadProgress(serviceMedia.images.map(() => 100));

                const res = await addService({
                  imageUrls: filteredImageUrls,
                  videoUrl: null,
                });

                if (res) {
                  setServiceUploadStatus(true);
                  setImageUploadStatus(true);
                  setShowAddService(true);
                  router.push("/console/services");
                } else {
                  setShowAddService(false);
                  setImageUploadStatus(false);
                  setServiceUploadStatus(false);
                }
              }}
              buttonState={buttonState}
              className="bg-success text-white w-full font-medium"
            />
          ) : null}
        </div>
      </div>
      {showAddService ? (
        !serviceUploadStatus ? (
          <Card className="w-full flex flex-col !items-center space-y-5">
            {!imageUploadStatus ? (
              <div className="grid grid-cols-2 items-center justify-items-center w-full gap-3">
                {serviceMedia.images.map((image, index) => (
                  <ImageComponentWithStatus
                    image={image}
                    error={imageUploadError[index]}
                    loading={imageUploadProgress[index]}
                    key={index}
                  />
                ))}
              </div>
            ) : (
              <div className="w-full flex flex-col items-center space-y-3 col-span-3 min-h-full justify-center">
                <p className="text-lg font-medium">Please wait</p>
                <p className="text-base text-textsubtle text-center">
                  We are uploading your images and creating your service
                </p>
              </div>
            )}
          </Card>
        ) : (
          <div className="w-full flex flex-col items-center space-y-3 col-span-3 min-h-full justify-center">
            <p className="text-lg font-medium">Service Added Succesfully</p>
            <p className="text-base text-textsubtle text-center">
              Please wait while we redirect you to the DASHBOARD
            </p>
          </div>
        )
      ) : (
        <div className="col-span-3 w-full py-10 px-10 max-h-screen overflow-y-scroll">
          <AnimatePresence mode="wait">
            {currentStep.index === 0 ? (
              <DesktopHeaderWrapper title="Basic Details" key={1}>
                <ServiceDetailsComponent
                  basicDetails={basicDetails}
                  setBasicDetails={setBasicDetails}
                />
              </DesktopHeaderWrapper>
            ) : currentStep.index === 1 ? (
              <DesktopHeaderWrapper title="Price" key={2}>
                <PriceInputComponent
                  price={price}
                  setPrice={setPrice}
                  discounts={addServiceMetadata.discounts}
                />
              </DesktopHeaderWrapper>
            ) : currentStep.index === 2 ? (
              <DesktopHeaderWrapper title="Preferences" key={3}>
                <Preferences
                  servicePreferences={servicePreferences}
                  setServicePreferences={setServicePreferences}
                />
              </DesktopHeaderWrapper>
            ) : currentStep.index === 3 ? (
              <DesktopHeaderWrapper title="Add Ons" key={4}>
                <SelectAdddOns
                  addOns={addServiceMetadata.addOns}
                  attachedAddOnIds={attachedAddOnIds}
                  setAttachedAddOnIds={setAttachedAddOnIds}
                />
              </DesktopHeaderWrapper>
            ) : currentStep.index === 4 ? (
              <DesktopHeaderWrapper title="Service Type" key={5}>
                <ServiceTypeComponent
                  key={currentStep.toString()}
                  userAddresses={addServiceMetadata.addresses}
                  homeServiceTypeDetails={homeServiceDetails}
                  offlineServiceTypeDetails={offlineServiceDetails}
                  onlineServiceDetails={onlineServiceDetails}
                  serviceType={serviceType}
                  setHomeServiceTypeDetails={setHomeServiceDetails}
                  setOfflineServiceTypeDetails={setOfflineServiceDetails}
                  setOnlineServiceDetails={setOnlineServiceDetails}
                  setServiceType={setServiceType}
                />
              </DesktopHeaderWrapper>
            ) : currentStep.index === 5 ? (
              <DesktopHeaderWrapper title="Media" key={6}>
                <Media
                  serviceMedia={serviceMedia}
                  setServiceMedia={setServiceMedia}
                />
              </DesktopHeaderWrapper>
            ) : (
              <></>
            )}
          </AnimatePresence>
        </div>
      )}
    </DesktopWrapper>
  );
}

function SelectAdddOns({
  addOns,
  attachedAddOnIds,
  setAttachedAddOnIds,
}: {
  addOns: AddOn[];
  attachedAddOnIds: string[];
  setAttachedAddOnIds: Dispatch<SetStateAction<string[]>>;
}) {
  return addOns.length === 0 ? (
    <div className="flex flex-col items-center justify-center w-full space-y-5">
      <p className="text-base text-textsubtle">
        Add-ons are additional services that you can offer to your customers at
        an extra cost. You can create add-ons after downloading the app from the
        play store or app store.
      </p>
      <p className="text-base text-textsubtle">
        Since you have not created any add-ons yet, you can skip this step by
        clicking on the <span className="text-primary font-medium">Next</span>{" "}
        button below
      </p>
    </div>
  ) : (
    <div className="w-full flex flex-col items-center space-y-5">
      {attachedAddOnIds.length > 0 && (
        <div className="flex flex-col items-center justify-start space-y-3 w-full">
          {attachedAddOnIds.map((id, index) => {
            const addOn = addOns.find((addOn) => addOn.id!! === id);
            if (!addOn) return null;
            return (
              <div
                className={`flex flex-row items-center justify-between w-full px-2 py-3 rounded-lg bg-white`}
                key={index}
              >
                <div className="flex flex-col items-start justify-center space-y-1">
                  <p className="text-base font-medium">{addOn.title}</p>
                  <p className="text-sm text-textsubtle font-medium">
                    {addOn.price}
                  </p>
                </div>
                <div className="flex flex-row items-center justify-center space-x-3">
                  <AiFillInfoCircle className="text-2xl text-info" />
                  <AiFillDelete
                    className="text-2xl text-error"
                    onClick={async () => {
                      setAttachedAddOnIds((prev) =>
                        prev.filter((id) => id !== addOn.id!!)
                      );
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
      {addOns.filter((addOn) => !attachedAddOnIds.includes(addOn.id!!)).length >
        0 && (
        <SelectInput
          title="Select Add-Ons"
          options={[
            ...addOns
              .filter((addOn) => !attachedAddOnIds.includes(addOn.id!!))
              .map((addOn) => ({
                text: addOn.title + " - " + priceString(addOn.price),
                value: addOn.id!!,
              })),
          ]}
          onChange={(value) => {
            setAttachedAddOnIds((prev) => [...prev, value.toString()]);
          }}
        />
      )}
    </div>
  );
}

function FormWrapper({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      className="grid grid-cols-1 gap-y-5 gap-x-2 w-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {children}
    </motion.div>
  );
}

function BasicDetailsFormCheckers({ form }: { form: BasicDetails }) {
  return (
    <FormWrapper>
      <Checker text="title" checked={form.title.length > 0} id="title" />
      <Checker
        text="experience"
        checked={form.experience.years > 0 || form.experience.months > 0}
        id="experience"
      />
      <Checker
        text="whatsIncluded"
        checked={form.whatsIncluded.length > 0}
        id="whatsIncluded"
      />
      <Checker
        text="whatsNotIncluded"
        checked={form.whatsNotIncluded.length > 0}
        id="whatsNotIncluded"
      />
    </FormWrapper>
  );
}

function PriceFormCheckers({ price }: { price: Price }) {
  return (
    <FormWrapper>
      <Checker text="price" checked={price.price > 0} id="price" />
      <Checker
        text="pricingType"
        checked={price.pricingType !== null}
        id="pricingType"
      />
      {price.discount ? (
        <div className="grid grid-cols-1 gap-y-5 gap-x-2 w-full col-span-2">
          <Checker
            text="discount"
            checked={price.discount.value > 0}
            id="discount"
          />
          <Checker
            text="Discount Name"
            checked={price.discount.name.length > 0}
            id="discount"
          />
        </div>
      ) : null}
    </FormWrapper>
  );
}

function MediaFormCheckers({ media }: { media: ServiceMedia }) {
  return (
    <FormWrapper>
      <Checker text="images" checked={media.images.length > 0} id="images" />
      {/* <Checker text="video" checked={media.video !== null} id="video" /> */}
    </FormWrapper>
  );
}

function PreferencesFormCheckers({
  preferences,
}: {
  preferences: ServicePreferences;
}) {
  return (
    <FormWrapper>
      <Checker
        text="preferredGender"
        checked={preferences.preferredGender !== null}
        id="preferredGender"
      />
      <Checker
        text="requirements"
        checked={preferences.requirements.length > 0}
        id="requirements"
      />
    </FormWrapper>
  );
}

function ServiceTypeFormCheckers({
  serviceType,
  onlineServiceDetails,
  offlineServiceDetails,
  homeServiceDetails,
}: {
  serviceType: ServiceType;
  onlineServiceDetails: OnlineServiceTypeDetails;
  offlineServiceDetails: OfflineServiceTypeDetails;
  homeServiceDetails: HomeServiceTypeDetails;
}) {
  return (
    <div className="grid grid-cols-1 gap-y-5 gap-x-2 w-full">
      <Checker
        text="serviceType"
        checked={serviceType !== null}
        id="serviceType"
      />
      {serviceType === ServiceType.ONLINE ? (
        <div className="grid grid-cols-1 gap-y-5 gap-x-2 w-full">
          <Checker
            text="preferredOnlinePlatforms"
            checked={onlineServiceDetails.preferredOnlinePlatforms.length > 0}
            id="preferredOnlinePlatforms"
          />
        </div>
      ) : serviceType === ServiceType.HOME ? (
        <div className="grid grid-cols-1 gap-y-5 gap-x-2 w-full">
          {homeServiceDetails.location !== null ? (
            <div className="grid grid-cols-1 gap-y-5 gap-x-2 w-full">
              <Checker
                text="Location"
                checked={homeServiceDetails.location !== null}
                id="homeServiceType"
              />
              <Checker
                text="Location Name"
                checked={homeServiceDetails.locationName.length > 0}
                id="homeServiceType"
              />
            </div>
          ) : (
            <Checker
              text="Location"
              checked={homeServiceDetails.selectedAddress !== null}
              id="homeServiceType"
            />
          )}
        </div>
      ) : null}
    </div>
  );
}

function AddOnFormCheckers({
  attachedAddOnIds,
}: {
  attachedAddOnIds: string[];
}) {
  return (
    <div className="grid grid-cols-1 gap-y-5 gap-x-2 w-full">
      <Checker
        text="attachedAddOns"
        checked={attachedAddOnIds.length > 0}
        id="attachedAddOns"
      />
    </div>
  );
}

function Media({
  serviceMedia,
  setServiceMedia,
}: {
  serviceMedia: ServiceMedia;
  setServiceMedia: Dispatch<SetStateAction<ServiceMedia>>;
}) {
  const [images, setImages] = useState<File[]>(serviceMedia.images);
  const [video, setVideo] = useState<File | null>(null);
  useEffect(() => {
    if (images.length > 5) {
      return;
    } else {
      setServiceMedia((prev) => ({
        ...prev,
        images: images,
      }));
    }
  }, [images]);
  useEffect(() => {
    if (video) {
      setServiceMedia((prev) => ({
        ...prev,
        video: video,
      }));
    }
  }, [video]);
  return (
    <motion.div
      className="w-full flex flex-col items-center space-y-3"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <AnimatePresence mode="wait">
        <ImagesInput images={images} setImages={setImages} />
      </AnimatePresence>
    </motion.div>
  );
}

function Preferences({
  servicePreferences,
  setServicePreferences,
}: {
  servicePreferences: ServicePreferences;
  setServicePreferences: Dispatch<SetStateAction<ServicePreferences>>;
}) {
  const [requirement, setRequirement] = useState("");

  return (
    <div className="w-fit flex flex-col items-start space-y-5">
      <RadioInput
        options={[
          {
            icon: (
              <AiFillStop
                className={`text-xl lg:text-2xl
              ${
                servicePreferences.preferredGender === PreferredGender.UNISEX
                  ? "text-white"
                  : "text-success"
              }
              `}
              />
            ),
            onClick: () => {
              setServicePreferences((prev) => ({
                ...prev,
                preferredGender: PreferredGender.UNISEX,
              }));
              // localStorage.setItem(
              //   "basic-service-details",
              //   JSON.stringify({
              //     ...servicePreferences
              //     preferredGender: PreferredGender.UNISEX,
              //   })
              // );
            },
            title: "Unisex",
            className:
              servicePreferences.preferredGender === PreferredGender.UNISEX
                ? "bg-success"
                : "bg-white",
            textColor:
              servicePreferences.preferredGender === PreferredGender.UNISEX
                ? "text-white"
                : "",
          },
          {
            icon: (
              <BsGenderMale
                className={`text-xl lg:text-2xl
              ${
                servicePreferences.preferredGender === PreferredGender.MALE
                  ? "text-white"
                  : "text-info"
              }
              `}
              />
            ),
            onClick: () => {
              setServicePreferences((prev) => ({
                ...prev,
                preferredGender: PreferredGender.MALE,
              }));
              // localStorage.setItem(
              //   "basic-service-details",
              //   JSON.stringify({
              //     ...servicePreferences,
              //     preferredGender: PreferredGender.MALE,
              //   })
              // );
            },

            title: "Male",
            className:
              servicePreferences.preferredGender === PreferredGender.MALE
                ? "bg-info"
                : "bg-white",
            textColor:
              servicePreferences.preferredGender === PreferredGender.MALE
                ? "text-white"
                : "",
          },
          {
            icon: (
              <BsGenderFemale
                className={`text-xl lg:text-2xl
              ${
                servicePreferences.preferredGender === PreferredGender.FEMALE
                  ? "text-white"
                  : "text-pink-500"
              }
              `}
              />
            ),
            onClick: () => {
              setServicePreferences((prev) => ({
                ...prev,
                preferredGender: PreferredGender.FEMALE,
              }));
              // localStorage.setItem(
              //   "basic-service-details",
              //   JSON.stringify({
              //     ...ServiceDescription,
              //     preferredGender: PreferredGender.FEMALE,
              //   })
              // );
            },
            title: "Female",
            className:
              servicePreferences.preferredGender === PreferredGender.FEMALE
                ? "bg-pink-500"
                : "bg-white",
            textColor:
              servicePreferences.preferredGender === PreferredGender.FEMALE
                ? "text-white"
                : "",
          },
        ]}
      />
      <div className="w-full flex flex-col items-center space-y-6">
        <TextInput
          placeholder="Enter your requirement"
          value={requirement}
          onChange={(value) => {
            setRequirement(value);
          }}
          title="Requirements"
          onClick={
            requirement.length > 2
              ? () => {
                  if (
                    verifyPoint({
                      point: requirement,
                      array: servicePreferences.requirements,
                    })
                  ) {
                    // localStorage.setItem(
                    //   "basic-service-details",
                    //   JSON.stringify({
                    //     ...servicePreferences,
                    //     requirements: [
                    //       ...servicePreferences.requirements,
                    //       requirement,
                    //     ],
                    //   })
                    // );
                    setServicePreferences((prev) => ({
                      ...prev,
                      requirements: [...prev.requirements, requirement],
                    }));
                    setRequirement("");
                  }
                }
              : undefined
          }
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              if (
                verifyPoint({
                  point: requirement,
                  array: servicePreferences.requirements,
                })
              ) {
                // localStorage.setItem(
                //   "basic-service-details",
                //   JSON.stringify({
                //     ...ServiceDescription,
                //     requirements: [
                //       ...ServiceDescription.requirements,
                //       requirement,
                //     ],
                //   })
                // );
                setServicePreferences((prev) => ({
                  ...prev,
                  requirements: [...prev.requirements, requirement],
                }));
                setRequirement("");
              }
            }
          }}
        />
        {servicePreferences.requirements.length > 0 ? (
          <div className="flex flex-col w-full space-y-5 px-1">
            {servicePreferences.requirements.map((point, index) => (
              <Point
                point={point}
                setState={() => {
                  setServicePreferences((prev) => ({
                    ...prev,
                    requirements: prev.requirements.filter(
                      (point, i) => i !== index
                    ),
                  }));
                  // JSON.stringify({
                  //   ...ServiceDescription,
                  //   requirements: [
                  //     ...ServiceDescription.requirements,
                  //     requirement,
                  //   ],
                  // });
                  setRequirement("");
                }}
                index={index}
                key={index}
                icon={
                  <AiOutlineAlert className="text-xl text-danger shrink-0" />
                }
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col w-full space-y-5 px-1">
            <p className="text-base text-textsubtle">Example Requirements</p>
            <Point
              point="Customer should have a laptop"
              setState={() => {}}
              index={0}
              key={0}
              icon={<AiOutlineAlert className="text-xl text-danger shrink-0" />}
              showClose={false}
            />
            <Point
              point="Customer should have a stable internet connection"
              setState={() => {}}
              index={0}
              key={1}
              icon={<AiOutlineAlert className="text-xl text-danger shrink-0" />}
              showClose={false}
            />
          </div>
        )}
      </div>
    </div>
  );
}

function PriceInputComponent({
  price,
  setPrice,
  discounts,
}: {
  price: Price;
  setPrice: Dispatch<SetStateAction<Price>>;
  discounts: Discount[];
}) {
  const [discountType, setDiscountType] = useState<"add" | "select" | null>(
    price.discount == null ? null : price.discount.discountId ? "select" : "add"
  );
  return (
    <motion.div
      className="w-fit flex flex-col items-start` space-y-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <TextInput
        title="Price"
        placeholder="Enter your price"
        showInfo={true}
        infoIcon={
          <Lottie
            animationData={PriceInfoIcon}
            loop={true}
            className="h-56 my-[-3rem]"
          />
        }
        infoText={
          <div className="flex flex-col space-y-2 justify-center align-center text-base py-2">
            <p>Set your price for this service.</p>
            <p className="font-medium">Tips:</p>
            <ul className="list-disc pl-5 justify-center break-word flex flex-col">
              <li>Set a price that is not too high or too low.</li>
              <li>Research competitor pricing for competitiveness.</li>
              <li>Calculate all costs for a sustainable price.</li>
              <li>Factor in your expertise and qualifications.</li>
              <li>Align pricing with perceived service value.</li>
            </ul>
          </div>
        }
        value={price.price > 0 ? price.price.toString() : ""}
        onChange={(value) => {
          if (
            value.length === 0 ||
            isNaN(Number(value)) ||
            Number(value) < 0 ||
            Number(value) > 999999
          ) {
            setPrice((prev) => ({
              ...prev,
              price: 0,
            }));
            return;
          } else {
            setPrice((prev) => ({
              ...prev,
              price: parseInt(value),
            }));
          }
        }}
        type="number"
      />
      <div className="w-full flex flex-col items-start space-y-2">
        <RadioInput
          title="Pricing Type"
          cols="grid-cols-2"
          showInfo={true}
          infoIcon={
            <Lottie
              animationData={PricingTypeInfoIcon}
              loop={true}
              className="h-[14rem]"
            />
          }
          infoText={
            <div className="flex flex-col space-y-2 justify-center text-base py-2">
              <p>Choose a suitable pricing type for your service.</p>
              <p className="font-medium">Choose Per-Hour If</p>
              <ul className="list-disc pl-5 justify-center break-word flex flex-col">
                <li>Service requirements vary; flexibility is key.</li>
                <li>Tasks may need on-the-fly changes.</li>
                <li>Clear correlation between time and cost.</li>
              </ul>
              <p className="font-medium">Choose Per-Session If</p>
              <ul className="list-disc pl-5 justify-center break-word flex flex-col">
                <li>Fixed cost in advance for budgeting.</li>
                <li>Users want service without time constraints</li>
                <li>Simple scheduling with set session durations.</li>
              </ul>
            </div>
          }
          options={[
            {
              title: "Per Hour",
              icon: (
                <FaUserClock
                  className={`text-2xl
              ${
                price.pricingType === PricingType.HOUR
                  ? "text-white"
                  : "text-info"
              }
              `}
                />
              ),
              className:
                price.pricingType === PricingType.HOUR
                  ? "bg-success"
                  : "bg-white",
              textColor:
                price.pricingType === PricingType.HOUR ? "text-white" : "",
              onClick: () => {
                setPrice((prev) => ({
                  ...prev,
                  pricingType: PricingType.HOUR,
                }));
              },
            },
            {
              title: "Per Session",
              icon: (
                <MdWorkHistory
                  className={`text-2xl
              ${
                price.pricingType === PricingType.SESSION
                  ? "text-white"
                  : "text-info"
              }
              `}
                />
              ),
              className:
                price.pricingType === PricingType.SESSION
                  ? "bg-success"
                  : "bg-white",
              textColor:
                price.pricingType === PricingType.SESSION ? "text-white" : "",
              onClick: () => {
                setPrice((prev) => ({
                  ...prev,
                  pricingType: PricingType.SESSION,
                }));
              },
            },
          ]}
        />
      </div>
      <DesktopHeaderWrapper title="Discounts">
        <div className="flex flex-col space-y-5 w-full items-start justify-start">
          <RadioInput
            options={[
              {
                title: "Select",
                onClick: () => {
                  setDiscountType("select");
                  setPrice((prev) => ({
                    ...prev,
                    discount: {
                      name: "",
                      value: 0,
                    },
                  }));
                },
                className: discountType === "select" ? "bg-info" : "bg-white",
                textColor: discountType === "select" ? "text-white" : "",
                icon: (
                  <AiOutlineBars
                    className={`text-3xl ${
                      discountType === "select" ? "text-white" : ""
                    }`}
                  />
                ),
              },
              {
                title: "Add",
                onClick: () => {
                  setDiscountType("add");
                  setPrice((prev) => ({
                    ...prev,
                    discount: {
                      name: "",
                      value: 0,
                      discountId: undefined,
                    },
                  }));
                },
                className: discountType === "add" ? "bg-info" : "bg-white",
                textColor: discountType === "add" ? "text-white" : "",
                icon: (
                  <AiOutlinePlus
                    className={`text-3xl ${
                      discountType === "add" ? "text-white" : ""
                    }`}
                  />
                ),
              },
              {
                title: "None",
                onClick: () => {
                  setDiscountType(null);
                  setPrice((prev) => ({ ...prev, discount: null }));
                },
                className: discountType === null ? "bg-info" : "bg-white",
                textColor: discountType === null ? "text-white" : "",
                icon: (
                  <AiOutlineClose
                    className={`text-3xl ${
                      discountType === null ? "text-white" : ""
                    }`}
                  />
                ),
              },
            ]}
          />
          {discountType === "add" && price.discount != null ? (
            <div className="grid grid-cols-1 gap-y-5 gap-x-2 w-full">
              <TextInput
                title="Name your offer"
                placeholder="Ex. Diwali Offer"
                onChange={(value) => {
                  setPrice((prev) => ({
                    price: prev.price,
                    pricingType: prev.pricingType,
                    currency: prev.currency,
                    discount: {
                      name: value,
                      value: prev.discount != null ? prev.discount!!.value : 0,
                    },
                  }));
                }}
                value={price.discount.name}
              />
              <TextInput
                title="Discount"
                placeholder="Ex. 20%"
                errorText={
                  price.discount.value > 99
                    ? "Discount cannot be more than 99%"
                    : price.discount.value < 1
                    ? "Discount cannot be less than 1%"
                    : ""
                }
                onChange={(value) => {
                  if (
                    value.length == 0 ||
                    isNaN(Number(value)) ||
                    Number(value) < 0
                  ) {
                    console.log("here");
                    setPrice((prev) => ({
                      price: prev.price,
                      pricingType: prev.pricingType,
                      currency: prev.currency,
                      discount: {
                        name: prev.discount != null ? prev.discount!!.name : "",
                        value: 0,
                      },
                    }));
                    return;
                  }
                  setPrice((prev) => ({
                    ...prev,
                    discount: {
                      name: prev.discount != null ? prev.discount!!.name : "",
                      value: parseInt(value),
                    },
                  }));
                }}
                type="number"
                value={price.discount.value.toString()}
              />
            </div>
          ) : discountType === "select" ? (
            <div className="flex flex-col w-full space-y-5 items-center justify-start">
              <SelectInput
                options={discounts.map((discount) => ({
                  text: discount.name + " (" + discount.value + "%)",
                  value: discount.discountId!!,
                }))}
                onChange={(value) => {
                  const discount = discounts.find(
                    (d) => d.discountId === value
                  );
                  if (discount) {
                    setPrice((prev) => ({
                      ...prev,
                      discount: {
                        name: discount.name,
                        value: discount.value,
                        discountId: discount.discountId,
                      },
                    }));
                  }
                }}
                defaultValue={price.discount?.discountId}
              />
            </div>
          ) : null}
        </div>
      </DesktopHeaderWrapper>
      <DesktopHeaderWrapper title="Final Price">
        <PriceComponent price={price} />
      </DesktopHeaderWrapper>
      {/* <PriceComponent price={price} /> */}
    </motion.div>
  );
}

function ExperienceComponent({
  basicDetails,
  setBasicDetails,
}: {
  basicDetails: BasicDetails;
  setBasicDetails: Dispatch<SetStateAction<BasicDetails>>;
}) {
  return (
    <div
      className="flex items-center justify-between w-full space-x-2"
      id="experience"
    >
      <TextInput
        onChange={(value) => {
          if (value.length == 0 || isNaN(Number(value)) || Number(value) < 0) {
            setBasicDetails((prev) => ({
              ...prev,
              experience: {
                months: prev.experience.months,
                years: 0,
              },
            }));
          } else {
            setBasicDetails((prev) => ({
              ...prev,
              experience: {
                months: prev.experience.months,
                years: parseInt(value),
              },
            }));
          }
        }}
        value={
          basicDetails.experience.years > 0
            ? basicDetails.experience.years.toString()
            : ""
        }
        placeholder="Eg. 2"
        id="years"
        title="How many years of experience do you have?"
      />
      <TextInput
        onChange={(value) => {
          if (value.length == 0 || isNaN(Number(value)) || Number(value) < 0) {
            setBasicDetails((prev) => ({
              ...prev,
              experience: {
                years: prev.experience.years,
                months: 0,
              },
            }));
          } else {
            if (parseInt(value) > 11) {
              const years = Math.floor(parseInt(value) / 12);
              const months = parseInt(value) % 12;
              setBasicDetails((prev) => ({
                ...prev,
                experience: {
                  years: prev.experience.years + years,
                  months: months,
                },
              }));
            } else {
              setBasicDetails((prev) => ({
                ...prev,
                experience: {
                  years: prev.experience.years,
                  months: parseInt(value),
                },
              }));
            }
          }
        }}
        value={
          basicDetails.experience.months > 0
            ? basicDetails.experience.months.toString()
            : ""
        }
        placeholder="Eg. 6"
        id="months"
        title="How many months of experience do you have?"
      />
    </div>
  );
}

function ServiceDetailsComponent({
  basicDetails,
  setBasicDetails,
}: {
  basicDetails: BasicDetails;
  setBasicDetails: Dispatch<SetStateAction<BasicDetails>>;
}) {
  const [whatsIncluded, setWhatsIncluded] = useState("");
  const [whatsNotIncluded, setWhatsNotIncluded] = useState("");
  const examplePoints = {
    whatsIncluded: [
      "Eg. Foundation, Concealer, etc. will be provided by the artist",
      "Eg. Full face makeup with false lashes",
      "Eg. No extra charges for travel within the city",
    ],
    whatsNotIncluded: [
      "Eg. Travel charges will be extra",
      "Eg. No hair styling",
    ],
  };
  return (
    <motion.div
      className="w-full flex flex-col items-center space-y-7"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="grid grid-cols-2 gap-y-5 gap-x-2 w-full">
        <TextInput
          title="Service Name"
          placeholder="Enter your service name"
          value={basicDetails.title}
          onChange={(value) => {
            setBasicDetails((prev) => ({
              ...prev,
              title: value,
            }));
          }}
        />
        <div />
      </div>
      <div className="flex items-start justify-between space-x-3 w-full">
        <div className="w-full flex flex-col items-center space-y-7">
          <TextInput
            title="What's Included"
            placeholder="Enter what is included in your service"
            value={whatsIncluded}
            onChange={(value) => {
              setWhatsIncluded(value);
            }}
            onClick={
              whatsIncluded.length > 2
                ? () => {
                    if (
                      verifyPoint({
                        point: whatsIncluded,
                        array: basicDetails.whatsIncluded,
                      })
                    ) {
                      setBasicDetails((prev) => ({
                        ...prev,
                        whatsIncluded: [...prev.whatsIncluded, whatsIncluded],
                      }));
                      setWhatsIncluded("");
                    }
                  }
                : undefined
            }
            onKeyDown={(e) => {
              if (e.key === "Enter" && whatsIncluded.length > 2) {
                if (
                  verifyPoint({
                    point: whatsIncluded,
                    array: basicDetails.whatsIncluded,
                  })
                ) {
                  setBasicDetails((prev) => ({
                    ...prev,
                    whatsIncluded: [...prev.whatsIncluded, whatsIncluded],
                  }));
                  setWhatsIncluded("");
                }
              }
            }}
          />
          {basicDetails.whatsIncluded.length > 0 ? (
            <div className="flex flex-col w-full px-1 space-y-5">
              {basicDetails.whatsIncluded.map((point, index) => (
                <Point
                  point={point}
                  setState={() => {
                    setBasicDetails((prev) => ({
                      ...prev,
                      whatsIncluded: prev.whatsIncluded.filter(
                        (_, i) => i !== index
                      ),
                    }));
                  }}
                  index={index}
                  key={index}
                  icon={
                    <AiOutlineCheck className="text-xl text-success shrink-0" />
                  }
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col w-full px-1 space-y-5">
              <p className="text-base text-textsubtle">Example Points</p>
              {examplePoints.whatsIncluded.map((point, index) => (
                <Point
                  point={point}
                  setState={() => {}}
                  index={index}
                  key={index}
                  icon={
                    <AiOutlineCheck className="text-xl text-success shrink-0" />
                  }
                  showClose={false}
                />
              ))}
            </div>
          )}
        </div>
        <div className="w-full flex flex-col items-center space-y-7">
          <div className="w-full flex flex-col items-center space-y-6">
            <TextInput
              title="What's Not Included"
              placeholder="Enter what is not included in your service"
              value={whatsNotIncluded}
              onChange={(value) => {
                setWhatsNotIncluded(value);
              }}
              onClick={
                whatsNotIncluded.length > 2
                  ? () => {
                      if (
                        verifyPoint({
                          point: whatsNotIncluded,
                          array: basicDetails.whatsNotIncluded,
                        })
                      ) {
                        setBasicDetails((prev) => ({
                          ...prev,
                          whatsNotIncluded: [
                            ...prev.whatsNotIncluded,
                            whatsNotIncluded,
                          ],
                        }));
                        setWhatsNotIncluded("");
                      }
                    }
                  : undefined
              }
              onKeyDown={(e) => {
                if (e.key === "Enter" && whatsNotIncluded.length > 2) {
                  if (
                    verifyPoint({
                      point: whatsNotIncluded,
                      array: basicDetails.whatsNotIncluded,
                    })
                  ) {
                    setBasicDetails((prev) => ({
                      ...prev,
                      whatsNotIncluded: [
                        ...prev.whatsNotIncluded,
                        whatsNotIncluded,
                      ],
                    }));
                    setWhatsNotIncluded("");
                  }
                }
              }}
            />
            {basicDetails.whatsNotIncluded.length > 0 ? (
              <div
                className={`flex flex-col w-full space-y-5 px-1 ${
                  basicDetails.whatsNotIncluded.length === 0 ? "hidden" : ""
                }`}
              >
                {basicDetails.whatsNotIncluded.map((point, index) => (
                  <Point
                    point={point}
                    setState={() => {
                      setBasicDetails((prev) => ({
                        ...prev,
                        whatsNotIncluded: prev.whatsNotIncluded.filter(
                          (_, i) => i !== index
                        ),
                      }));
                    }}
                    index={1}
                    key={1}
                    icon={
                      <AiOutlineClose className="text-xl text-danger shrink-0" />
                    }
                  />
                ))}
              </div>
            ) : (
              <div className="flex flex-col w-full px-1 space-y-5">
                <p className="text-base text-textsubtle">Example Points</p>
                {examplePoints.whatsNotIncluded.map((point, index) => (
                  <Point
                    point={point}
                    setState={() => {}}
                    index={index}
                    key={index}
                    icon={
                      <AiOutlineClose className="text-xl text-danger shrink-0" />
                    }
                    showClose={false}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <ExperienceComponent
        basicDetails={basicDetails}
        setBasicDetails={setBasicDetails}
      />
    </motion.div>
  );
}

function AddLocationComponent({
  userAddresses,
  homeServiceTypeDetails,
  setHomeServiceTypeDetails,
}: {
  userAddresses: Address[];
  homeServiceTypeDetails: HomeServiceTypeDetails;
  setHomeServiceTypeDetails: Dispatch<SetStateAction<HomeServiceTypeDetails>>;
}) {
  const [location, setLocation] = useState<LocationAttributes | null>(null);
  const [locationName, setLocationName] = useState("");

  useEffect(() => {
    if (userAddresses.length > 0) {
      setShowAddAddress(false);
    } else {
      setHomeServiceTypeDetails((prev) => ({
        ...prev,
        selectedAddress: null,
      }));
      setShowAddAddress(true);
    }
  }, [userAddresses]);

  useEffect(() => {
    if (location !== null) {
      setHomeServiceTypeDetails((prev) => ({
        ...prev,
        location: location,
      }));
    }
  }, [location]);

  useEffect(() => {
    if (locationName.length > 0) {
      setHomeServiceTypeDetails((prev) => ({
        ...prev,
        locationName: locationName,
      }));
    }
  }, [locationName]);

  const [showAddAddress, setShowAddAddress] = useState(location !== null);
  return (
    <div className="flex flex-col space-y-3 justify-center items-center w-full">
      {userAddresses.length > 0 && (
        <RadioInput
          cols="grid-cols-2"
          options={[
            {
              title: "Add a new address",
              onClick() {
                setShowAddAddress(true);
                setLocation(null);
                setLocationName("");
                setHomeServiceTypeDetails((prev) => ({
                  ...prev,
                  selectedAddress: null,
                  location: null,
                  locationName: "",
                  serviceType: ServiceType.HOME,
                }));
              },
              className: showAddAddress ? "bg-info" : "bg-white",
              textColor: showAddAddress ? "text-white" : "",
              icon: (
                <AiOutlinePlus
                  className={`${showAddAddress ? "text-white" : ""} text-4xl`}
                />
              ),
            },
            {
              title: "Select existing address",
              onClick() {
                setShowAddAddress(false);
                setHomeServiceTypeDetails((prev) => ({
                  ...prev,
                  selectedAddress: userAddresses[0],
                }));
                setLocation(null);
                setLocationName("");
              },
              className: !showAddAddress ? "bg-info" : "bg-white",
              textColor: !showAddAddress ? "text-white" : "",
              icon: (
                <AiOutlineHome
                  className={`${
                    showAddAddress ? "text-info" : "text-white"
                  } text-4xl`}
                />
              ),
            },
          ]}
        />
      )}
      {showAddAddress || userAddresses.length === 0 ? (
        <div className="w-full flex flex-col items-center space-y-5">
          <div className="w-full flex flex-col items-center space-y-5">
            <AddressNameInput
              addressName={locationName}
              setAddressName={setLocationName}
            />
            <AddressInput location={location} setLocation={setLocation} />
          </div>
        </div>
      ) : (
        <div className="w-full flex flex-col items-center space-y-5">
          <SelectInput
            options={userAddresses.map((address) => ({
              value: address.addressId,
              text: address.name,
            }))}
            onChange={(value) => {
              const address = userAddresses.find((a) => a.addressId === value);
              if (address) {
                setHomeServiceTypeDetails((prev) => ({
                  ...prev,
                  selectedAddress: address,
                }));
              }
            }}
            defaultValue={homeServiceTypeDetails.selectedAddress?.addressId}
          />
          {userAddresses.length > 0 &&
            userAddresses.find(
              (a) =>
                a.addressId ===
                homeServiceTypeDetails.selectedAddress?.addressId
            ) && (
              <LocationCardWithName
                address={homeServiceTypeDetails.selectedAddress!}
              />
            )}
        </div>
      )}
    </div>
  );
}

function OnlineServiceComponent({
  onlineServiceTypeDetails,
  setOnlineServiceTypeDetails,
}: {
  onlineServiceTypeDetails: OnlineServiceTypeDetails;
  setOnlineServiceTypeDetails: Dispatch<
    SetStateAction<OnlineServiceTypeDetails>
  >;
}) {
  return (
    <RadioInput
      cols="grid-cols-4"
      options={Object.values(OnlinePlatform).map((platform) => ({
        title: (platform.charAt(0).toUpperCase() + platform.slice(1)).replace(
          "_",
          " "
        ),
        onClick: () => {
          if (
            onlineServiceTypeDetails.preferredOnlinePlatforms.includes(platform)
          ) {
            setOnlineServiceTypeDetails((prev) => ({
              ...prev,
              preferredOnlinePlatforms: prev.preferredOnlinePlatforms.filter(
                (p) => p !== platform
              ),
            }));
            return;
          }
          setOnlineServiceTypeDetails((prev) => ({
            ...prev,
            preferredOnlinePlatforms: [
              ...prev.preferredOnlinePlatforms,
              platform,
            ],
          }));
        },
        className: onlineServiceTypeDetails.preferredOnlinePlatforms.includes(
          platform
        )
          ? "bg-success"
          : "bg-white",
        textColor: onlineServiceTypeDetails.preferredOnlinePlatforms.includes(
          platform
        )
          ? "text-white"
          : "",
        icon: onlineServiceTypeDetails.preferredOnlinePlatforms.includes(
          platform
        ) ? (
          <AiOutlineCheck className="text-4xl text-white shrink-0" />
        ) : platform === OnlinePlatform.ZOOM ? (
          <SiZoom className="text-4xl" />
        ) : platform === OnlinePlatform.GOOGLE_MEET ? (
          <FcGoogle className="text-4xl" />
        ) : platform === OnlinePlatform.SKYPE ? (
          <SiSkype className="text-4xl text-[#00aff0]" />
        ) : platform === OnlinePlatform.MICROSOFT_TEAMS ? (
          <BsMicrosoftTeams className="text-4xl text-[#464EB8]" />
        ) : platform === OnlinePlatform.CALL ? (
          <FcPhone className="text-4xl -rotate-90" />
        ) : (
          <AiOutlineWifi className="text-4xl" />
        ),
      }))}
    />
  );
}

function ServiceTypeComponent({
  homeServiceTypeDetails,
  offlineServiceTypeDetails,
  onlineServiceDetails,
  setHomeServiceTypeDetails,
  setOfflineServiceTypeDetails,
  setOnlineServiceDetails,
  userAddresses,
  serviceType,
  setServiceType,
}: {
  onlineServiceDetails: OnlineServiceTypeDetails;
  setOnlineServiceDetails: Dispatch<SetStateAction<OnlineServiceTypeDetails>>;
  offlineServiceTypeDetails: OfflineServiceTypeDetails;
  setOfflineServiceTypeDetails: Dispatch<
    SetStateAction<OfflineServiceTypeDetails>
  >;
  homeServiceTypeDetails: HomeServiceTypeDetails;
  setHomeServiceTypeDetails: Dispatch<SetStateAction<HomeServiceTypeDetails>>;
  serviceType: ServiceType;
  setServiceType: Dispatch<SetStateAction<ServiceType>>;
  userAddresses: Address[];
}) {
  return (
    <motion.div
      className="w-fit flex flex-col items-start space-y-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <RadioInput
        options={Object.values(ServiceType).map((type) => ({
          title: type.charAt(0).toUpperCase() + type.slice(1),
          icon:
            type === ServiceType.ONLINE ? (
              <FaLaptop
                className={`text-4xl ${
                  serviceType === type ? "text-white" : ""
                }`}
              />
            ) : type === ServiceType.HOME ? (
              <AiOutlineHome
                className={`text-4xl ${
                  serviceType === type ? "text-white" : ""
                }`}
              />
            ) : (
              <FaCarSide
                className={`text-4xl ${
                  serviceType === type ? "text-white" : ""
                }`}
              />
            ),
          onClick: () => {
            setServiceType(type);
          },
          className: serviceType === type ? "bg-info" : "bg-white",
          textColor: serviceType === type ? "text-white" : "",
        }))}
      />
      <AnimatePresence mode="wait">
        {serviceType === ServiceType.ONLINE && (
          <DesktopHeaderWrapper title="Online Platforms">
            <OnlineServiceComponent
              onlineServiceTypeDetails={onlineServiceDetails}
              setOnlineServiceTypeDetails={setOnlineServiceDetails}
            />
          </DesktopHeaderWrapper>
        )}
        {serviceType === ServiceType.HOME && (
          <DesktopHeaderWrapper title="Location">
            <AddLocationComponent
              homeServiceTypeDetails={homeServiceTypeDetails}
              setHomeServiceTypeDetails={setHomeServiceTypeDetails}
              userAddresses={userAddresses}
              key={userAddresses.length}
            />
          </DesktopHeaderWrapper>
        )}
        {serviceType === ServiceType.OFFLINE && (
          <DesktopHeaderWrapper title="Offline Services">
            <OfflineServiceComponent
              offlineServiceTypeDetails={offlineServiceTypeDetails}
              setOfflineServiceTypeDetails={setOfflineServiceTypeDetails}
            />
          </DesktopHeaderWrapper>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function OfflineServiceComponent({
  offlineServiceTypeDetails,
  setOfflineServiceTypeDetails,
}: {
  offlineServiceTypeDetails: OfflineServiceTypeDetails;
  setOfflineServiceTypeDetails: Dispatch<
    SetStateAction<OfflineServiceTypeDetails>
  >;
}) {
  return (
    <div className="w-full flex flex-col items-center space-y-5">
      <div className="flex flex-row w-full items-center justify-between space-x-3">
        <p className="text-base">Do you charge extra for travel</p>
        <ToggleButton
          state={offlineServiceTypeDetails.travelCharges}
          onClick={() => {
            setOfflineServiceTypeDetails((prev) => ({
              ...prev,
              travelCharges: !prev.travelCharges,
            }));
          }}
        />
      </div>
    </div>
  );
}

function ImageComponentWithStatus({
  image,
  loading,
  error,
}: {
  image: File;
  loading: number;
  error: boolean;
}) {
  return (
    <div className="w-full flex flex-col items-center space-y-3">
      <div className="w-fit relative" style={{ zIndex: 1 }}>
        <ImageComponent
          src={URL.createObjectURL(image)}
          alt="service image"
          className="w-[10rem] h-[10rem] object-cover rounded-md"
        />
        {(loading < 100 || error) && (
          <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center space-y-3 bg-gray bg-opacity-60">
            {loading < 100 && (
              <p className="text-base font-semibold shadow-lg">{loading}%</p>
            )}
            {error && <AiOutlineClose className="text-4xl text-danger" />}
          </div>
        )}
      </div>
    </div>
  );
}
