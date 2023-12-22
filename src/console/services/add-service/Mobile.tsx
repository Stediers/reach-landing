import {
  BasicDetails,
  HomeServiceTypeDetails,
  OfflineServiceTypeDetails,
  OnlineServiceTypeDetails,
  ServiceMedia,
  ServicePreferences,
} from "@api_functions/service/add-service";
import devLog from "@helper_functions/devLog";
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
  TabData,
} from "@data/types";
import MobileWrapper from "@wrapper/responsive/MobileWrapper";
import { AnimatePresence, motion } from "framer-motion";
import {
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { StepData } from "@data/types";
import Button from "@components/Button";
import LineHeader from "@components/LineHeader";
import { LocationCardWithName } from "@components/LocationCard";
import PriceComponent from "@components/Price";
import AddressInput, { AddressNameInput } from "@components/input/AddressInput";
import { ImagesInput } from "@components/input/MediaInput";
import RadioInput from "@components/input/RadioInput";
import TextInput from "@components/input/TextInput";
import verifyPoint from "@helper_functions/verifyPoint";
import {
  AiFillStop,
  AiOutlineAlert,
  AiOutlineCheck,
  AiOutlineClose,
  AiOutlinePlus,
  AiOutlineHome,
  AiOutlineWifi,
  AiOutlineBars,
  AiFillDelete,
  AiFillInfoCircle,
  AiOutlineInfoCircle,
} from "react-icons/ai";
import { BsGenderMale, BsGenderFemale, BsMicrosoftTeams } from "react-icons/bs";
import Point from "@components/Point";
import { uploadFiletoS3WithProgress } from "@api_functions/utility/upload-file-to-S3";
import Card from "@components/Card";
import router from "next/router";
import { SiZoom, SiSkype } from "react-icons/si";
import { FcGoogle, FcPhone } from "react-icons/fc";
import ImageComponent from "@components/ImageComponent";
import { showSnackBar } from "@components/notifications/Snackbar";
import { showInfoPopup } from "@components/notifications/Popup";
import { FaCarSide, FaLaptop, FaUserClock } from "react-icons/fa";
import ToggleButton from "@components/ToggleButton";
import { MdWorkHistory } from "react-icons/md";
import Steps from "@components/Steps";
import { FetchAddServiceMetadataResponse } from "@api_functions/service/fetch-add-service-metadata";
import priceString from "@helper_functions/priceString";
import Lottie from "lottie-react";
import WhatsIncludedIcon from "@public/lottie/whats-included.json";
import WhatsNotIncludedICon from "@public/lottie/whats-not-included.json";
import PriceInfoIcon from "@public/lottie/price-info.json";
import PricingTypeInfoIcon from "@public/lottie/pricing-type-info.json";
import GenderInfoIcon from "@public/lottie/gender-info.json";
import RequirementsInfoIcon from "@public/lottie/requirements-info.json";
import DiscountInfoIcon from "@public/lottie/discount-info.json";
import SelectInput from "@components/input/SelectInput";

export default function Mobile({
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
  return (
    <MobileWrapper
      header="Add Service"
      className="flex flex-col items-center space-y-5 justify-start w-full transition-all ease-in-out duration-150 pb-5"
      showNavBar={false}
      backLink="/console/services"
      warnBeforeLeaving={true}
    >
      <Header
        buttonState={buttonState}
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
        setShowAddService={setShowAddService}
        steps={steps}
        showAddService={showAddService}
        setButtonState={setButtonState}
        addService={addService}
        serviceMedia={serviceMedia}
      >
        <AnimatePresence mode="wait">
          {currentStep.index === 0 && (
            <ServiceDetailsComponent
              basicDetails={basicDetails}
              setBasicDetails={setBasicDetails}
              key={currentStep.toString()}
            />
          )}
          {currentStep.index === 1 && (
            <PriceInputComponent
              price={price}
              setPrice={setPrice}
              discounts={addServiceMetadata.discounts}
            />
          )}
          {currentStep.index === 2 && (
            <Preferences
              servicePreferences={servicePreferences}
              setServicePreferences={setServicePreferences}
              key={currentStep.toString()}
            />
          )}
          {currentStep.index === 4 && (
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
          )}
          {currentStep.index === 3 && (
            <SelectAdddOns
              addOns={addServiceMetadata.addOns}
              attachedAddOnIds={attachedAddOnIds}
              setAttachedAddOnIds={setAttachedAddOnIds}
              key={currentStep.toString()}
            />
          )}
          {currentStep.index === 5 && (
            <Media
              serviceMedia={serviceMedia}
              setServiceMedia={setServiceMedia}
              key={currentStep.toString()}
            />
          )}
        </AnimatePresence>
      </Header>
    </MobileWrapper>
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
      <Card className="w-full flex flex-col items-center justify-center space-y-5">
        <p className="text-base text-textsubtle text-center">
          Add-ons are additional services that you can offer to your customers
          at an extra cost. You can create add-ons after downloading the app
          from the play store or app store.
        </p>
        <p className="text-base text-textsubtle text-center">
          Since you have not created any add-ons yet, you can skip this step by
          clicking on the <span className="text-primary font-medium">Next</span>{" "}
          button below
        </p>
      </Card>
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
    <div className="w-full flex flex-col items-center space-y-3">
      <AnimatePresence mode="wait">
        <ImagesInput images={images} setImages={setImages} />
      </AnimatePresence>
    </div>
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
    <div className="w-full flex flex-col items-center space-y-5">
      <RadioInput
        title="Preferred Gender"
        showInfo
        infoIcon={
          <Lottie
            animationData={GenderInfoIcon}
            loop={true}
            className="h-[10rem]"
          />
        }
        infoText={
          <div className="flex flex-col space-y-2 justify-center align-center text-base py-2">
            <p>Choose the preferred gender for your service.</p>
            <p className="font-medium">For Example:</p>
            <ul className="list-disc pl-5 justify-center break-word flex flex-col">
              <li>Grooming services are preferred for male clients.</li>
              <li>Makeup services are preferred for female clients.</li>
              <li>Spa services can caters to both male and female clients.</li>
              <li>
                Photography services do not have a preferred gender, so unisex
                can be selected.
              </li>
            </ul>
          </div>
        }
        options={[
          {
            icon: (
              <AiFillStop
                className={`text-xl
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
                className={`text-xl
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
                className={`text-xl
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
          title="Requirements"
          placeholder="Enter your requirement"
          showInfo={true}
          infoIcon={
            <Lottie
              animationData={RequirementsInfoIcon}
              loop={true}
              className="h-[14rem]"
            />
          }
          infoText={
            <div className="flex flex-col space-y-2 justify-center text-base py-2">
              <p>
                Please provide everything that you offer inside the service.
              </p>
              <p className="font-medium">Do&apos;s</p>
              <ul className="list-disc pl-5 justify-center break-word flex flex-col">
                <li>Highlight the essentials for your service.</li>
                <li>Offer examples if needed.</li>
                <li>Be realistic with the requirements.</li>
              </ul>
              <p className="font-medium">Don&apos;ts</p>
              <ul className="list-disc pl-5 justify-center break-word flex flex-col">
                <li>Avoid ambiguity- Be specific.</li>
                <li>Don&apos;t assume that the customer will know.</li>
                <li>Don&apos;t make last minute changes.</li>
              </ul>
            </div>
          }
          value={requirement}
          onChange={(value) => {
            setRequirement(value);
          }}
          onClick={
            requirement.length > 2
              ? () => {
                  if (
                    verifyPoint({
                      point: requirement,
                      array: servicePreferences.requirements,
                    })
                  ) {
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
    <div className="w-full flex flex-col items-center space-y-5">
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
      <div className="flex flex-col space-y-2 w-full items-start justify-start">
        <div className="flex flex-row items-center space-x-1">
          <p className="text-base font-medium">Discounts</p>
          <AiOutlineInfoCircle
            className="text-lg shrink-0 text-info"
            onClick={() => {
              showInfoPopup({
                icon: (
                  <Lottie
                    animationData={DiscountInfoIcon}
                    loop={true}
                    className="h-32"
                  />
                ),
                title: "Discounts",
                message: (
                  <div className="flex flex-col space-y-2 justify-center text-base py-2">
                    <p>
                      Optionally add a discount to your service. A discount may
                      increase your chances of getting bookings.
                    </p>
                    <p className="font-medium">Tips:</p>
                    <ul className="list-disc pl-5 justify-center break-word flex flex-col">
                      <li>Calculate all costs to ensure profitability.</li>
                      <li>Set specific goals for offering discounts.</li>
                      <li>Create urgency with limited-time discounts.</li>
                      <li>Research competitor pricing for competitiveness.</li>
                    </ul>
                  </div>
                ),
              });
            }}
          />
        </div>
        {discountType ? (
          <div className="flex flex-col space-y-5 w-full items-start justify-start">
            <LineHeader title="Add an offer" />
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
                      className={`text-4xl ${
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
                      className={`text-4xl ${
                        discountType === "add" ? "text-white" : ""
                      }`}
                    />
                  ),
                },
                {
                  title: "Remove",
                  onClick: () => {
                    setDiscountType(null);
                    setPrice((prev) => ({ ...prev, discount: null }));
                  },
                  className: discountType === null ? "bg-info" : "bg-white",
                  textColor: discountType === null ? "text-white" : "",
                  icon: (
                    <AiOutlineClose
                      className={`text-4xl ${
                        discountType === null ? "text-white" : ""
                      }`}
                    />
                  ),
                },
              ]}
            />
            {discountType === "add" && price.discount != null ? (
              <div className="flex flex-col w-full space-y-5 items-center justify-start">
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
                        value:
                          prev.discount != null ? prev.discount!!.value : 0,
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
                          name:
                            prev.discount != null ? prev.discount!!.name : "",
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
                {discounts.length === 0 ? (
                  <Card className="text-base text-textsubtle text-center">
                    <p className="text-base text-textsubtle text-center">
                      You have not created any offers yet
                    </p>
                  </Card>
                ) : (
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
                )}
              </div>
            ) : (
              <p className="text-base text-textsubtle text-center">
                Adding an offer will boost your chances of getting a booking
              </p>
            )}
          </div>
        ) : (
          <div className="flex flex-col space-y-5 w-full items-start justify-start">
            <div className="flex items-center justify-between w-full space-x-3">
              <Button
                text="Add an offer"
                className="bg-info text-white font-medium"
                onClick={() => {
                  setDiscountType("select");
                  setPrice((prev) => ({
                    ...prev,
                    discount: {
                      name: "",
                      value: 0,
                    },
                  }));
                }}
              />
            </div>
            <Card className="w-full flex flex-col items-center justify-center space-y-2">
              <p className="text-base text-textsubtle text-center">
                Adding an offer will boost your chances of getting a booking
              </p>
            </Card>
          </div>
        )}
      </div>
      <LineHeader title="Final Price" />
      <PriceComponent price={price} />
      {/* <PriceComponent price={price} /> */}
    </div>
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
          basicDetails.experience.years >= 0
            ? basicDetails.experience.years.toString()
            : ""
        }
        placeholder="Eg. 2"
        id="years"
        title="Years"
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
          basicDetails.experience.months >= 0
            ? basicDetails.experience.months.toString()
            : ""
        }
        placeholder="Eg. 6"
        id="months"
        title="Months"
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
    <div className="w-full flex flex-col items-center space-y-7">
      <TextInput
        title="Name your service"
        placeholder="Ex: Bridal Makeup"
        value={basicDetails.title}
        onChange={(value) => {
          setBasicDetails((prev) => ({ ...prev, title: value }));
        }}
      />
      <div className="w-full flex flex-col items-center space-y-6">
        <TextInput
          title="What's Included"
          placeholder="Enter what is included in your service"
          value={whatsIncluded}
          infoIcon={
            <Lottie
              animationData={WhatsIncludedIcon}
              loop={true}
              className="h-[14rem] my-[-1rem] mr-[-2rem]"
            />
          }
          showInfo={true}
          infoText={
            <div className="flex flex-col space-y-2 justify-center text-base py-2">
              <p>
                Please provide everything that you offer inside the service.
              </p>
              <p className="font-medium">Do&apos;s</p>
              <ul className="list-disc pl-5 justify-center break-word flex flex-col">
                <li>Clearly list each included item.</li>
                <li>Specify quantities or durations.</li>
                <li>Be transparent with what you offer.</li>
              </ul>
              <p className="font-medium">Don&apos;ts</p>
              <ul className="list-disc pl-5 justify-center break-word flex flex-col">
                <li>Avoid ambiguity- Be specific.</li>
                <li>Avoid complexity- Keep it simple.</li>
                <li>Use simple language. </li>
              </ul>
            </div>
          }
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
        <div className="w-full flex flex-col items-center space-y-6">
          <TextInput
            title="What's Not Included"
            placeholder="Enter what is not included in your service"
            infoIcon={
              <Lottie
                animationData={WhatsNotIncludedICon}
                loop={true}
                reversed={true}
                className="h-[14rem] -m-5"
              />
            }
            showInfo={true}
            infoText={
              <div className="flex flex-col space-y-2 justify-center text-base py-2">
                <p>
                  Please provide a list of things not offered inside the
                  service.
                </p>
                <p className="font-medium">Do&apos;s</p>
                <ul className="list-disc pl-5 justify-center break-word flex flex-col">
                  <li>Clearly state what&apos;s not included.</li>
                  <li>Suggest add-ons or alternatives</li>
                  <li>Define the service scope clearly.</li>
                </ul>
                <p className="font-medium">Don&apos;ts</p>
                <ul className="list-disc pl-5 justify-center break-word flex flex-col">
                  <li>Avoid confusions- use simple language</li>
                  <li>Don&apos;t overlook common exclusions.</li>
                  <li>Avoid surprises after service initiation.</li>
                </ul>
              </div>
            }
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
      <ExperienceComponent
        basicDetails={basicDetails}
        setBasicDetails={setBasicDetails}
      />
    </div>
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
      cols="grid-cols-2"
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
    <div className="w-full flex flex-col items-center space-y-5">
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
      <Card className="w-full flex flex-col items-center !space-y-3">
        {/* <Lottie
          animationData={
            serviceType === ServiceType.ONLINE
              ? onlineServiceLottie
              : serviceType === ServiceType.HOME
              ? homeServiceLottie
              : offlineServiceLottie
          }
          className="w-56 h-56"
        /> */}
        {serviceType === ServiceType.ONLINE && (
          <p className="text-base  text-center">
            You can provide your service online through video calling platforms
            like Zoom, Google Meet, Skype, etc.
          </p>
        )}
        {serviceType === ServiceType.HOME && (
          <p className="text-base  text-center">
            You can provide your service at your location.
          </p>
        )}
        {serviceType === ServiceType.OFFLINE && (
          <p className="text-base  text-center">
            You can provide your service at your customer&apos;s location.
          </p>
        )}
      </Card>
      <LineHeader title="Tell us more" />
      {/* <div className="flex flex-col text-textsubtle items-center !space-y-3 text-center">
        {serviceType === ServiceType.ONLINE && (
          <p className="text-base">
            You can provide your service online through video calling platforms
            like Zoom, Google Meet, Skype, etc.
          </p>
        )}
        {serviceType === ServiceType.HOME && (
          <p className="text-base">
            You can provide your service at your location.
          </p>
        )}
        {serviceType === ServiceType.OFFLINE && (
          <p className="text-base">
            You can provide your service at your customer&apos;s location.
          </p>
        )}
      </div> */}
      <AnimatePresence mode="wait">
        {serviceType === ServiceType.ONLINE && (
          <motion.div
            className="w-full flex flex-col items-center space-y-5"
            key={1}
            initial={{ originX: 0, opacity: 0 }}
            animate={{ originX: 0, opacity: 1 }}
            exit={{ originX: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <OnlineServiceComponent
              onlineServiceTypeDetails={onlineServiceDetails}
              setOnlineServiceTypeDetails={setOnlineServiceDetails}
            />
          </motion.div>
        )}
        {serviceType === ServiceType.HOME && (
          <motion.div
            className="w-full flex flex-col items-center space-y-5"
            key={2}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <AddLocationComponent
              homeServiceTypeDetails={homeServiceTypeDetails}
              setHomeServiceTypeDetails={setHomeServiceTypeDetails}
              userAddresses={userAddresses}
              key={userAddresses.length}
            />
          </motion.div>
        )}
        {serviceType === ServiceType.OFFLINE && (
          <motion.div
            className="w-full flex flex-col items-center space-y-5"
            key={3}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <OfflineServiceComponent
              offlineServiceTypeDetails={offlineServiceTypeDetails}
              setOfflineServiceTypeDetails={setOfflineServiceTypeDetails}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
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

function Header({
  children,
  currentStep,
  setCurrentStep,
  skip = false,
  showAddService,
  setShowAddService,
  buttonState,
  steps,
  serviceMedia,
  addService,
}: PropsWithChildren<{
  currentStep: StepData;
  setCurrentStep: Dispatch<SetStateAction<StepData>>;
  skip?: boolean;
  showAddService: boolean;
  setShowAddService: Dispatch<SetStateAction<boolean>>;
  buttonState: State;
  setButtonState: Dispatch<SetStateAction<State>>;
  steps: StepData[];
  serviceMedia: ServiceMedia;
  addService: ({
    imageUrls,
    videoUrl,
  }: {
    imageUrls: string[];
    videoUrl: string | null;
  }) => Promise<boolean>;
}>) {
  const [serviceUploadStatus, setServiceUploadStatus] = useState(false);
  const [imageUploadProgress, setImageUploadProgress] = useState(
    serviceMedia.images.map(() => 0)
  );
  const [imageUploadError, setImageUploadError] = useState(
    serviceMedia.images.map(() => false)
  );
  const [imageUploadStatus, setImageUploadStatus] = useState(false);
  return !showAddService ? (
    <motion.div
      className="w-full flex flex-col items-center space-y-7"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col items-center space-y-5 w-full">
        <Steps
          currentStep={currentStep}
          steps={steps}
          setCurrentStep={setCurrentStep}
          title="Select Step"
        />
      </div>
      <div className="w-full flex flex-col items-center space-y-5">
        <LineHeader title="Fill in the details" />
        {children}
      </div>
      <div className="w-full flex flex-col items-center space-y-3">
        <div className="w-full flex space-x-3">
          {currentStep.index !== 0 && (
            <Button
              text="Back"
              className="w-full border border-primary text-primary"
              onClick={() => {
                localStorage.setItem("step", currentStep.index.toString());
                setCurrentStep(steps[currentStep.index - 1]);
              }}
            />
          )}
          {currentStep.index !== 5 && (
            <Button
              text={skip ? "Skip" : "Next"}
              className="w-full font-medium bg-primary text-white"
              onClick={() => {
                setCurrentStep(steps[currentStep.index + 1]);
                localStorage.setItem("step", currentStep.index.toString());
              }}
              disabled={steps[currentStep.index].state === false}
            />
          )}
        </div>
        {!steps.some((step) => step.state === false) && (
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
        )}
      </div>
    </motion.div>
  ) : !serviceUploadStatus ? (
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
        <div className="w-full flex flex-col items-center space-y-3">
          <p className="text-lg font-medium">Adding your service</p>
          <p className="text-base text-textsubtle text-center">
            Please wait while we add your service
          </p>
        </div>
      )}
    </Card>
  ) : (
    <div className="w-full flex flex-col items-center space-y-3">
      <p className="text-lg font-medium">Service Added Succesfully</p>
      <p className="text-base text-textsubtle text-center">
        Please wait while we redirect you to the DASHBOARD
      </p>
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
