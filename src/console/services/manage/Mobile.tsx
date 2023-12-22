import { deleteService } from "@api_functions/service/delete-service";
import {
  FetchEditServiceMetadataResponse,
  editService,
} from "@api_functions/service/edit-service";
import { updateServiceVisibility } from "@api_functions/service/update-service-visibility";
import Button from "@components/Button";
import LineHeader from "@components/LineHeader";
import Loading from "@components/Loading";
import { LocationCardWithName } from "@components/LocationCard";
import PriceComponent from "@components/Price";
import RadioInput from "@components/input/RadioInput";
import SelectInput from "@components/input/SelectInput";
import TextInput from "@components/input/TextInput";
import {
  showCustomJSXPopup,
  showYesNoPopup,
} from "@components/notifications/Popup";
import { PreferredGender, PricingType, S3BucketName } from "@data/enums";
import verifyPoint from "@helper_functions/verifyPoint";
import ListWrapper from "@wrapper/ListWrapper";
import MobileWrapper from "@wrapper/responsive/MobileWrapper";
import { AddOn, Price, StepData } from "@data/types";
import { State } from "@data/enums";
import router from "next/router";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  AiFillDelete,
  AiFillEdit,
  AiFillExclamationCircle,
  AiFillInfoCircle,
  AiOutlineCheck,
} from "react-icons/ai";
import { BsGenderMale, BsGenderFemale, BsGenderTrans } from "react-icons/bs";
import { MdDiscount, MdWork, MdWorkHistory, MdWorkOff } from "react-icons/md";
import Point from "@components/Point";
import AnimatedTabs from "@components/Tabs";
import { ImagesInput } from "@components/input/MediaInput";
import { convertUrlToFile } from "@api_functions/internal/base-functions";
import uploadFileS3 from "@api_functions/utility/upload-file-to-S3";
import { showSnackBar } from "@components/notifications/Snackbar";
import devLog from "@helper_functions/devLog";
import { FaUserClock } from "react-icons/fa";
import Steps from "@components/Steps";
import { addDiscount } from "@api_functions/service/price/add-discount";
import Card from "@components/Card";

export default function Mobile({
  service,
  loading,
  setLoading,
  serviceId,
  setService,
}: {
  service: FetchEditServiceMetadataResponse;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  serviceId: string;
  setService: Dispatch<SetStateAction<FetchEditServiceMetadataResponse | null>>;
}) {
  return (
    <MobileWrapper
      className="flex flex-col items-center"
      header="manage"
      backLink="/console/services"
      showNavBar={false}
    >
      {service && (
        <div className="flex flex-col items-center justify-center w-full space-y-5">
          <div className="flex flex-col items-start justify-start w-full !space-y-2">
            <p className="text-base text-textsubtle font-medium">
              You are currently managing:
            </p>
            <p className="text-md text-text font-medium first-letter:capitalize">
              {service.title}
            </p>
          </div>

          <LineHeader title="General" />
          <RadioInput
            cols="grid-cols-2"
            options={[
              {
                icon: loading ? (
                  <Loading className="w-7 h-7" color="fill-white" />
                ) : service.visible ? (
                  <MdWork className="text-3xl text-white" />
                ) : (
                  <MdWorkOff className="text-3xl text-white" />
                ),
                onClick: () => {
                  setLoading(true);
                  updateServiceVisibility(serviceId, !service.visible).then(
                    (res) => {
                      if (res) {
                        setService((prev) => ({
                          ...prev!,
                          visible: !prev!.visible,
                        }));
                        setLoading(false);
                      } else {
                        setLoading(false);
                      }
                    }
                  );
                },
                title: service.visible
                  ? "Currently Visible"
                  : "Currently Hidden",
                className: service.visible ? "bg-success" : "bg-error",
                textColor: "text-white",
              },
              {
                icon: <AiFillDelete className="text-4xl shrink-0" />,
                title: "Delete Service",
                onClick: async () => {
                  const confirmation = await showYesNoPopup({
                    title: "Delete Service",
                    message:
                      "Are you sure you want to delete this service?  You will lose all appointments, rating and prices associated with this service.",
                    okText: "Delete",
                    cancelText: "Cancel",
                  });
                  if (confirmation) {
                    const response = await deleteService(serviceId);
                    if (response) {
                      router.push("/console/services");
                    }
                  }
                },
              },
            ]}
          />
          <LineHeader title="Edit" />
          <Edit service={service} />
        </div>
      )}
    </MobileWrapper>
  );
}

function Edit({ service }: { service: FetchEditServiceMetadataResponse }) {
  const [gender, setGender] = useState(service.preferredGender);
  const [requirements, setRequirements] = useState(
    service.additionalRequirements
  );

  const [price, setPrice] = useState<Price>(service.price);

  const [requirement, setRequirement] = useState("");

  const [location, setLocation] = useState(service.location);

  const [buttonState, setButtonState] = useState<State>(State.SUCCESS);
  // const [images, setImages] = useState(URL.createObjectURL(service.imageUrls));
  const [images, setImages] = useState<File[]>([]);
  const [attachedAddOnIds, setAttachedAddOnIds] = useState<string[]>(
    service.addOns.attachedAddOnIds
  );
  const steps: StepData[] = [
    {
      title: "General",
      description: "Edit general information about your service",
      index: 0,
      state: true,
    },
    {
      title: "Price",
      description: "Edit price for your service",
      index: 1,
      state: true,
    },
    {
      title: "Add-Ons",
      description: "Edit add-ons for your service",
      index: 2,
      state: true,
    },
    {
      title: "Images",
      description: "Edit images for your service",
      index: 3,
      state: true,
    },
  ];
  const [currentStep, setCurrentStep] = useState<StepData>(steps[0]);

  useEffect(() => {
    console.log(gender);
  }, [gender]);

  useEffect(() => {
    if (service.imageUrls.length > 0) {
      var fileName = service.imageUrls[0].split("/").pop() || "";
      service.imageUrls.forEach((url) => {
        convertUrlToFile(url, fileName).then((file) => {
          //remove files with smae file name
          setImages((prev) => [...prev, file]);
        });
      });
    }
  }, []);
  return (
    <div className="flex flex-col items-center justify-center space-y-5 w-full">
      <Steps
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
        steps={steps}
        title="Select Step"
      />
      {currentStep.index === 0 && (
        <ServiceRequirements
          preferredGender={gender}
          setPreferredGender={setGender}
          requirements={requirements}
          setRequirements={setRequirements}
        />
      )}
      {currentStep.index === 1 && (
        <PriceInput
          price={price}
          setPrice={setPrice}
          discounts={service.discounts}
        />
      )}
      {currentStep.index === 2 &&
        (service.addOns.addOns.length > 0 ? (
          <AddOns
            addOns={service.addOns.addOns}
            attachedAddOnIds={attachedAddOnIds}
            setAttachedAddOnIds={setAttachedAddOnIds}
          />
        ) : (
          <Card className="flex flex-col items-center justify-center !space-y-3 w-full">
            <AiFillExclamationCircle className="w-10 h-10 text-error" />
            <p className="text-base text-text font-medium text-center">
              You have no add-ons attached to this service
            </p>
            <Button
              text="Add Add-Ons"
              className="bg-info text-white font-medium w-full self-center"
              link={`/console/services/add-ons/create-add-on?backLink=/console/services/manage?serviceId=${service.serviceId}`}
            />
          </Card>
        ))}
      {currentStep.index === 3 && (
        <Images images={images} setImages={setImages} />
      )}
      <Button
        text="Save"
        buttonState={buttonState}
        className="bg-success text-white font-medium w-full self-center"
        onClick={async () => {
          // await showCustomJSXPopup({
          //   jsx: (
          //     //show all changes made
          //     <div className="flex flex-col space-y-5 items-center justify-start">
          //       asdads
          //     </div>
          //   ),
          // });
          setButtonState(State.LOADING);
          devLog("edit service");
          const imageUrls = (
            await Promise.all(
              images.map((image, index) =>
                uploadFileS3({
                  bucketName: S3BucketName.SERVICE,
                  file: image,
                  fileName: `${service.serviceId}-${index}`,
                })
              )
            )
          ).filter((url) => url !== null) as string[];
          if (images.length === 0) {
            showSnackBar({
              message: "Please upload at least one image",
              state: State.ERROR,
            });
            setButtonState(State.SUCCESS);
            return;
          }
          const response = await editService({
            preferredGender: gender,
            serviceId: service.serviceId,
            additionalRequirements: requirements,
            price: price,
            selectedAddressId: location ? location.selectedAddressId : null,
            imageUrls: imageUrls,
            discountId: price.discount ? price.discount.discountId!! : null,
            addOnIds: attachedAddOnIds,
          });
          if (response) {
            router.push(`/console/services`);
          }
          setButtonState(State.SUCCESS);
        }}
      />
    </div>
  );
}

function AddOns({
  addOns,
  attachedAddOnIds,
  setAttachedAddOnIds,
}: {
  addOns: AddOn[];
  attachedAddOnIds: string[];
  setAttachedAddOnIds: Dispatch<SetStateAction<string[]>>;
}) {
  return (
    <div className="flex flex-col items-center justify-center space-y-5 w-full">
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
                  {/* <Button
                    text="Remove"
                    className="bg-error text-white font-medium"
                    onClick={() => {
                      setAttachedAddOnIds((prev) =>
                        prev.filter((id) => id !== addOn.id!!)
                      );
                    }}
                  /> */}
                  <AiFillInfoCircle className="text-2xl text-info" />
                  <AiFillDelete
                    className="text-2xl text-error"
                    onClick={async () => {
                      const confirmation = await showYesNoPopup({
                        message: "Are you sure you want to remove this add-on?",
                        title: "Remove Add-On",
                      });
                      if (!confirmation) return;
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
                text: addOn.title + " - " + addOn.price + "%",
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

function ServiceRequirements({
  requirements,
  setRequirements,
  preferredGender,
  setPreferredGender,
}: {
  requirements: string[];
  setRequirements: Dispatch<SetStateAction<string[]>>;
  preferredGender: PreferredGender;
  setPreferredGender: Dispatch<SetStateAction<PreferredGender>>;
}) {
  const [requirement, setRequirement] = useState("");
  return (
    <ListWrapper>
      <RadioInput
        title="Preferred Gender"
        options={[
          {
            icon: (
              <BsGenderMale
                className={`text-xl
        ${preferredGender === PreferredGender.MALE ? "text-white" : "text-info"}
        `}
              />
            ),
            onClick: () => setPreferredGender(PreferredGender.MALE),
            title: "Male",
            className:
              preferredGender === PreferredGender.MALE ? "bg-info" : "bg-white",
            textColor:
              preferredGender === PreferredGender.MALE ? "text-white" : "",
          },
          {
            icon: (
              <BsGenderFemale
                className={`text-xl
        ${
          preferredGender === PreferredGender.FEMALE
            ? "text-white"
            : "text-pink-500"
        }
        `}
              />
            ),
            onClick: () => setPreferredGender(PreferredGender.FEMALE),
            title: "Female",
            className:
              preferredGender === PreferredGender.FEMALE
                ? "bg-pink-500"
                : "bg-white",
            textColor:
              preferredGender === PreferredGender.FEMALE ? "text-white" : "",
          },
          {
            icon: (
              <BsGenderTrans
                className={`text-xl
        ${
          preferredGender === PreferredGender.UNISEX
            ? "text-white"
            : "text-success"
        }
        `}
              />
            ),
            onClick: () => setPreferredGender(PreferredGender.UNISEX),
            title: "Unisex",
            className:
              preferredGender === PreferredGender.UNISEX
                ? "bg-success"
                : "bg-white",
            textColor:
              preferredGender === PreferredGender.UNISEX ? "text-white" : "",
          },
        ]}
      />
      <div className="w-full flex flex-col items-center space-y-5">
        <TextInput
          placeholder="Enter what is included in your service"
          title="Additional Requirements"
          value={requirement}
          onChange={(value) => {
            setRequirement(value);
          }}
          onClick={() => {
            if (verifyPoint({ point: requirement, array: requirements })) {
              setRequirements((prev) => [...prev, requirement]);
              setRequirement("");
            }
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              if (verifyPoint({ point: requirement, array: requirements })) {
                setRequirements((prev) => [...prev, requirement]);
                setRequirement("");
              }
            }
          }}
        />
        {requirements.length > 0 && (
          <div
            className={`flex flex-col w-full space-y-5 px-1 ${
              requirements.length === 0 ? "hidden" : ""
            }`}
          >
            {requirements.map((point, index) => (
              <Point
                point={point}
                setState={() => {
                  setRequirements((prev) => prev.filter((_, i) => i !== index));
                }}
                index={index}
                key={index}
                icon={
                  <AiOutlineCheck className="text-xl text-success shrink-0" />
                }
              />
            ))}
          </div>
        )}
      </div>
    </ListWrapper>
  );
}

function PriceInput({
  price,
  setPrice,
  discounts,
}: {
  price: Price;
  setPrice: Dispatch<SetStateAction<Price>>;
  discounts: Price["discount"][];
}) {
  return (
    <div className="flex flex-col items-center justify-center space-y-7 w-full">
      <TextInput
        title="Price"
        placeholder="Enter your price"
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
        options={[
          {
            title: "Per Hour",
            icon: (
              <FaUserClock
                className={`text-2xl
  ${price.pricingType === PricingType.HOUR ? "text-white" : "text-info"}
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
  ${price.pricingType === PricingType.SESSION ? "text-white" : "text-info"}
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
      {/* <RadioInput
        title="Discounts"
        cols="grid-cols-2"
        options={[
          {
            title: "Set Offer",
            icon: <MdDiscount className={`text-2xl ${"text-white"}`} />,
            className: "bg-success",
            textColor: "text-white",
            onClick: () => {},
          },
          {
            title: "Manage Offers",
            icon: <AiFillEdit className={`text-2xl ${"text-info"}`} />,
            className: "bg-white",
            textColor: "",
            onClick: () => {},
          },
        ]}
      /> */}
      {discounts.length > 0 &&
        !discounts.find((discount) => discount === null) && (
          <div className="flex flex-col items-center justify-center space-y-5 w-full">
            <SelectInput
              title="Select Offer"
              options={[
                ...discounts.map((discount) => ({
                  text: discount!!.name + " - " + discount!!.value + "%",
                  value: discount!!.discountId!!,
                })),
              ]}
              defaultValue={
                discounts.find(
                  (discount) =>
                    discount!!.discountId === price.discount?.discountId
                )?.discountId
              }
              onChange={(value) => {
                const discount = discounts.find(
                  (discount) => discount!!.discountId === value
                );
                if (discount) {
                  setPrice((prev) => ({
                    ...prev,
                    discount: discount,
                  }));
                } else {
                  showSnackBar({
                    message: "Cannot find discount",
                    state: State.ERROR,
                  });
                  setPrice((prev) => ({
                    ...prev,
                    discount: null,
                  }));
                }
              }}
            />
          </div>
        )}
      <PriceComponent price={price} />
    </div>
  );
}

function Images({
  images,
  setImages,
}: {
  images: File[];
  setImages: Dispatch<SetStateAction<File[]>>;
}) {
  const [loading, setLoading] = useState(false);
  return (
    <div className="flex flex-col items-center justify-center space-y-5 w-full">
      {loading ? (
        <Loading className="w-7 h-7" color="fill-white" />
      ) : (
        <ImagesInput images={images} setImages={setImages} />
      )}
    </div>
  );
}
