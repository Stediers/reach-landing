import {
  Currency,
  PreferredGender,
  PricingType,
  ServiceType,
  State,
} from "@data/enums";
import ConsoleWrapper from "@wrapper/ConsoleWrapper";
import { Price, StepData } from "@data/types";
import verifyLocation from "@helper_functions/verifyLocation";
import getVitalLocalStoragStingData from "@api_functions/utility/get-vital-local-storage-data";
import router from "next/router";
import chatCompletion from "@api_functions/openai/chat-completion";
import Mobile from "@src/console/services/add-service/Mobile";
import devLog from "@helper_functions/devLog";
import {
  BasicDetails,
  CreateHomeServiceRequest,
  CreateOfflineServiceRequest,
  CreateOnlineServiceRequest,
  HomeServiceTypeDetails,
  OfflineServiceTypeDetails,
  OnlineServiceTypeDetails,
  ServiceMedia,
  ServicePreferences,
  addHomeService,
  addOfflineService,
  addOnlineService,
} from "@api_functions/service/add-service";
import { useState, useEffect } from "react";
import {
  deleteItemsFromLocalStorage,
  getItemsFromLocalStorage,
  setItemsToLocalStorage,
} from "@api_functions/internal/local-storage";
import {
  FetchAddServiceMetadataResponse,
  fetchAddServiceMetadata,
} from "@api_functions/service/fetch-add-service-metadata";
import Desktop from "@src/console/services/add-service/Desktop";

export default function Main() {
  const [buttonState, setButtonState] = useState(State.SUCCESS);
  const [basicDetails, setBasicDetails] = useState<BasicDetails>({
    experience: {
      years: 0,
      months: 0,
    },
    title: "",
    whatsIncluded: [],
    whatsNotIncluded: [],
  });

  const [price, setPrice] = useState<Price>({
    currency: Currency.INR,
    discount: null,
    price: 0,
    pricingType: PricingType.HOUR,
  });

  const [serviceType, setServiceType] = useState<ServiceType>(
    ServiceType.ONLINE
  );

  const [onlineServiceDetails, setOnlineServiceDetails] =
    useState<OnlineServiceTypeDetails>({
      preferredOnlinePlatforms: [],
      serviceType: ServiceType.ONLINE,
    });

  const [offlineServiceDetails, setOfflineServiceDetails] =
    useState<OfflineServiceTypeDetails>({
      travelCharges: true,
      serviceType: ServiceType.OFFLINE,
    });

  const [homeServiceDetails, setHomeServiceDetails] =
    useState<HomeServiceTypeDetails>({
      location: null,
      locationName: "",
      serviceType: ServiceType.HOME,
      selectedAddress: null,
    });

  const [serviceMedia, setServiceMedia] = useState<ServiceMedia>({
    images: [],
    video: null,
  });

  const [servicePreferences, setServicePreferences] =
    useState<ServicePreferences>({
      preferredGender: PreferredGender.UNISEX,
      requirements: [],
    });

  const [addServiceMetadata, setAddServiceMetadata] =
    useState<FetchAddServiceMetadataResponse | null>(null);

  const [steps, setSteps] = useState<StepData[]>([
    {
      title: "Basic Details",
      index: 0,
      state: verifyBasicServiceDetails(basicDetails),
      description: "Enter the details of your service",
    },
    {
      title: "Set a price",
      index: 1,
      state: verifyServicePrice(
        price,
        addServiceMetadata
          ? addServiceMetadata.discounts.map(
              (discount) => discount.discountId!!
            )
          : []
      ),
      description: "Enter the description of your service",
    },
    {
      title: "Your Preferences",
      index: 2,
      state: verifyServicePreferences(servicePreferences),
      description: "Enter the preferences of your service",
    },
    {
      title: "Add Ons",
      index: 3,
      state: true,
      description: "Add add ons to your service",
    },
    {
      title: "How and Where",
      index: 4,
      state:
        serviceType === ServiceType.ONLINE
          ? verifyOnlineServiceTypeDetails(onlineServiceDetails)
          : serviceType === ServiceType.OFFLINE
          ? verifyOfflineServiceTypeDetails(offlineServiceDetails)
          : verifyHomeServiceTypeDetails(homeServiceDetails),
      description: "Select the type of your service",
    },
    {
      title: "Images & Videos",
      index: 5,
      state: verifyServiceMedia(serviceMedia),
      description: "Add media to your service",
    },
  ]);

  const [currentStep, setCurrentStep] = useState<StepData>(steps[0]);
  const [pageState, setPageState] = useState(State.LOADING);
  useEffect(() => {
    const basicDetails = getItemsFromLocalStorage<BasicDetails>({
      key: "basicDetails",
    });
    if (basicDetails) {
      setBasicDetails(basicDetails);
    }
    const price = getItemsFromLocalStorage<Price>({ key: "price" });
    if (price) {
      setPrice(price);
    }

    const serviceType = getItemsFromLocalStorage<ServiceType>({
      key: "serviceType",
    });
    if (serviceType) {
      setServiceType(serviceType);
    }

    const onlineServiceDetails =
      getItemsFromLocalStorage<OnlineServiceTypeDetails>({
        key: "onlineServiceDetails",
      });
    if (onlineServiceDetails) {
      setOnlineServiceDetails(onlineServiceDetails);
    }

    const offlineServiceDetails =
      getItemsFromLocalStorage<OfflineServiceTypeDetails>({
        key: "offlineServiceDetails",
      });
    if (offlineServiceDetails) {
      setOfflineServiceDetails(offlineServiceDetails);
    }

    const homeServiceDetails = getItemsFromLocalStorage<HomeServiceTypeDetails>(
      {
        key: "homeServiceDetails",
      }
    );
    if (homeServiceDetails) {
      setHomeServiceDetails(homeServiceDetails);
    }

    const servicePreferences = getItemsFromLocalStorage<ServicePreferences>({
      key: "servicePreferences",
    });
    if (servicePreferences) {
      setServicePreferences(servicePreferences);
    }
    setPageState(State.LOADING);
    fetchAddServiceMetadata().then((res) => {
      if (res) {
        setAddServiceMetadata(res);
      } else {
        setPageState(State.ERROR);
      }
      setPageState(State.SUCCESS);
    });
  }, []);

  useEffect(() => {
    setItemsToLocalStorage({
      key: "basicDetails",
      item: basicDetails,
    });

    setItemsToLocalStorage({
      key: "price",
      item: price,
    });

    setItemsToLocalStorage({
      key: "serviceType",
      item: serviceType,
    });

    setItemsToLocalStorage({
      key: "onlineServiceDetails",
      item: onlineServiceDetails,
    });

    setItemsToLocalStorage({
      key: "offlineServiceDetails",
      item: offlineServiceDetails,
    });

    setItemsToLocalStorage({
      key: "homeServiceDetails",
      item: homeServiceDetails,
    });

    setItemsToLocalStorage({
      key: "serviceMedia",
      item: serviceMedia,
    });

    setItemsToLocalStorage({
      key: "servicePreferences",
      item: servicePreferences,
    });

    setSteps((prev) => {
      const newSteps = [...prev];
      newSteps[0].state = verifyBasicServiceDetails(basicDetails);
      newSteps[1].state = verifyServicePrice(
        price,
        addServiceMetadata
          ? addServiceMetadata.discounts.map(
              (discount) => discount.discountId!!
            )
          : []
      );
      newSteps[2].state = verifyServicePreferences(servicePreferences);
      newSteps[3].state = true;
      newSteps[4].state =
        serviceType === ServiceType.ONLINE
          ? verifyOnlineServiceTypeDetails(onlineServiceDetails)
          : serviceType === ServiceType.OFFLINE
          ? verifyOfflineServiceTypeDetails(offlineServiceDetails)
          : verifyHomeServiceTypeDetails(homeServiceDetails);
      newSteps[5].state = verifyServiceMedia(serviceMedia);

      return newSteps;
    });
  }, [
    currentStep,
    onlineServiceDetails,
    offlineServiceDetails,
    homeServiceDetails,
    price,
    basicDetails,
    servicePreferences,
    serviceMedia,
    serviceType,
  ]);

  const [showAddService, setShowAddService] = useState<boolean>(false);
  const [attachedAddOnIds, setAttachedAddOnIds] = useState<string[]>([]);

  return (
    <ConsoleWrapper
      title="Add Service"
      state={pageState}
      mobileJSX={
        addServiceMetadata && (
          <Mobile
            serviceType={serviceType}
            setServiceType={setServiceType}
            showAddService={showAddService}
            setShowAddService={setShowAddService}
            addService={addService}
            basicDetails={basicDetails}
            setBasicDetails={setBasicDetails}
            price={price}
            setPrice={setPrice}
            onlineServiceDetails={onlineServiceDetails}
            setOnlineServiceDetails={setOnlineServiceDetails}
            offlineServiceDetails={offlineServiceDetails}
            setOfflineServiceDetails={setOfflineServiceDetails}
            homeServiceDetails={homeServiceDetails}
            setHomeServiceDetails={setHomeServiceDetails}
            serviceMedia={serviceMedia}
            setServiceMedia={setServiceMedia}
            servicePreferences={servicePreferences}
            setServicePreferences={setServicePreferences}
            buttonState={buttonState}
            setButtonState={setButtonState}
            addServiceMetadata={addServiceMetadata}
            steps={steps}
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
            attachedAddOnIds={attachedAddOnIds}
            setAttachedAddOnIds={setAttachedAddOnIds}
            key="mobile"
          />
        )
      }
      desktopJSX={
        addServiceMetadata && (
          <Desktop
            serviceType={serviceType}
            setServiceType={setServiceType}
            showAddService={showAddService}
            setShowAddService={setShowAddService}
            addService={addService}
            basicDetails={basicDetails}
            setBasicDetails={setBasicDetails}
            price={price}
            setPrice={setPrice}
            onlineServiceDetails={onlineServiceDetails}
            setOnlineServiceDetails={setOnlineServiceDetails}
            offlineServiceDetails={offlineServiceDetails}
            setOfflineServiceDetails={setOfflineServiceDetails}
            homeServiceDetails={homeServiceDetails}
            setHomeServiceDetails={setHomeServiceDetails}
            serviceMedia={serviceMedia}
            setServiceMedia={setServiceMedia}
            servicePreferences={servicePreferences}
            setServicePreferences={setServicePreferences}
            buttonState={buttonState}
            setButtonState={setButtonState}
            addServiceMetadata={addServiceMetadata}
            steps={steps}
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
            attachedAddOnIds={attachedAddOnIds}
            setAttachedAddOnIds={setAttachedAddOnIds}
            key="desktop"
          />
        )
      }
    />
  );

  async function addService({
    imageUrls,
    videoUrl,
  }: {
    imageUrls: string[];
    videoUrl: string | null;
  }): Promise<boolean> {
    const mobileNumber = getVitalLocalStoragStingData({ key: "mobileNumber" });
    if (!mobileNumber) {
      return false;
    }
    setButtonState(State.LOADING);
    if (serviceType === ServiceType.HOME) {
      const request: CreateHomeServiceRequest = {
        price: price,
        basicDetails: basicDetails,
        serviceMedia: {
          images: imageUrls,
          video: videoUrl,
        },
        servicePreferences: servicePreferences,
        serviceTypeDetails: homeServiceDetails,
        addOnIds: attachedAddOnIds,
      };
      const response = await addHomeService(request);
      if (response) {
        deleteItemsFromLocalStorage({
          keys: [
            "basicDetails",
            "price",
            "serviceType",
            "onlineServiceDetails",
            "offlineServiceDetails",
            "homeServiceDetails",
            "serviceMedia",
            "servicePreferences",
          ],
        });
        router.push("/console/services");
        return true;
      }
      setButtonState(State.SUCCESS);
      return false;
    } else if (serviceType === ServiceType.ONLINE) {
      const request: CreateOnlineServiceRequest = {
        basicDetails: basicDetails,
        serviceMedia: {
          images: imageUrls,
          video: null,
        },
        servicePreferences: servicePreferences,
        price: price,
        serviceTypeDetails: onlineServiceDetails,
        addOnIds: attachedAddOnIds,
      };
      const response = await addOnlineService(request);
      if (response) {
        deleteItemsFromLocalStorage({
          keys: [
            "basicDetails",
            "price",
            "serviceType",
            "onlineServiceDetails",
            "offlineServiceDetails",
            "homeServiceDetails",
            "serviceMedia",
            "servicePreferences",
          ],
        });
        router.push("/console/services");
        return true;
      }
      setButtonState(State.SUCCESS);
      return false;
    } else if (serviceType === ServiceType.OFFLINE) {
      const request: CreateOfflineServiceRequest = {
        basicDetails: basicDetails,
        serviceMedia: {
          images: imageUrls,
          video: null,
        },
        servicePreferences: servicePreferences,
        price: price,
        serviceTypeDetails: offlineServiceDetails,
        addOnIds: attachedAddOnIds,
      };
      const response = await addOfflineService(request);
      if (response) {
        deleteItemsFromLocalStorage({
          keys: [
            "basicDetails",
            "price",
            "serviceType",
            "onlineServiceDetails",
            "offlineServiceDetails",
            "homeServiceDetails",
            "serviceMedia",
            "servicePreferences",
          ],
        });
        router.push("/console/services");
        return true;
      }
      setButtonState(State.SUCCESS);
      return false;
    }
    return false;
  }
}

function verifyBasicServiceDetails(serviceDetails: BasicDetails) {
  if (serviceDetails.title.length <= 0) {
    return false;
  }
  if (
    serviceDetails.whatsIncluded.length <= 0 ||
    serviceDetails.whatsNotIncluded.length <= 0
  ) {
    return false;
  }
  if (
    serviceDetails.experience.months <= 0 &&
    serviceDetails.experience.years <= 0
  ) {
    return false;
  }
  return true;
}

function verifyServicePrice(price: Price, discountIds: string[]): boolean {
  if (price.price <= 0) {
    return false;
  }
  if (price.discount) {
    if (price.discount.discountId) {
      if (discountIds.length <= 0) {
        return false;
      } else {
        if (!discountIds.includes(price.discount.discountId)) {
          return false;
        }
      }
    } else if (
      price.discount.value <= 0 ||
      price.discount.name.length <= 0 ||
      price.discount.value > 99
    ) {
      return false;
    }
  }
  return true;
}

function verifyServicePreferences(servicePreferences: ServicePreferences) {
  if (servicePreferences.requirements.length <= 0) {
    return false;
  }
  return true;
}

function verifyOfflineServiceTypeDetails(
  offlineServiceTypeDetails: OfflineServiceTypeDetails
) {
  if (offlineServiceTypeDetails.travelCharges === null) {
    devLog("travelCharges", offlineServiceTypeDetails.travelCharges);
    return false;
  }
  return true;
}

function verifyOnlineServiceTypeDetails(
  onlineServiceTypeDetails: OnlineServiceTypeDetails
) {
  if (onlineServiceTypeDetails.preferredOnlinePlatforms.length <= 0) {
    return false;
  }
  return true;
}

function verifyHomeServiceTypeDetails(
  homeServiceTypeDetails: HomeServiceTypeDetails
) {
  if (homeServiceTypeDetails.location === null) {
    return homeServiceTypeDetails.selectedAddress ? true : false;
  } else {
    return verifyLocation(homeServiceTypeDetails.location);
  }
}

function verifyServiceMedia(serviceMedia: ServiceMedia) {
  if (serviceMedia.images.length <= 0) {
    return false;
  }
  return true;
}
