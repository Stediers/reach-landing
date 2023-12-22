import { FetchAppointmentResponse } from "@api_functions/appointment/fetch-appointment";
import { requestRating } from "@api_functions/feedback/request-rating";
import Card from "@components/Card";
import LineHeader from "@components/LineHeader";
import Loading from "@components/Loading";
import { LocationCard, LocationCardWithName } from "@components/LocationCard";
import Rating from "@components/Rating";
import Setting from "@components/Setting";
import RadioInput from "@components/input/RadioInput";
import { showCustomJSXPopup } from "@components/notifications/Popup";
import { showSnackBar } from "@components/notifications/Snackbar";
import { AppointmentStatus, State } from "@data/enums";
import ListWrapper from "@wrapper/ListWrapper";
import MobileWrapper from "@wrapper/responsive/MobileWrapper";
import router from "next/router";
import {
  AiFillStar,
  AiOutlineAlert,
  AiOutlineCheckCircle,
  AiOutlineCloseCircle,
  AiOutlineQuestionCircle,
} from "react-icons/ai";
import { FaBriefcase, FaLaptop, FaUser } from "react-icons/fa";
import { FcRating } from "react-icons/fc";

export default function Mobile({
  response,
  requestRatingButtonState,
  setRequestRatingButtonState,
}: {
  response: FetchAppointmentResponse;
  setResponse: React.Dispatch<
    React.SetStateAction<FetchAppointmentResponse | null>
  >;
  paymentButtonState: State;
  setPaymentButtonState: React.Dispatch<React.SetStateAction<State>>;
  requestRatingButtonState: State;
  setRequestRatingButtonState: React.Dispatch<React.SetStateAction<State>>;
  cancelButtonState: State;
  setCancelButtonState: React.Dispatch<React.SetStateAction<State>>;
}) {
  console.log(response);
  return (
    <MobileWrapper
      className="flex flex-col items-center space-y-5"
      header="View Appointment"
      backLink="/console/appointments"
      showNavBar={false}
    >
      {response && (
        <Appointment
          bookedAt={null}
          cancelledAt={response.cancelledAt}
          completedAt={response.completedAt}
          ratedAt={response.ratedAt}
          scheduledAt={response.scheduledAt}
          status={response.appointment.status}
          id={response.appointment.id}
          setRequestRatingButtonState={setRequestRatingButtonState}
          requestRatingButtonState={requestRatingButtonState}
        />
      )}
      <LineHeader title="Primary Details" />
      {response.onlineSnapShotData ? (
        <Setting
          title={response.onlineSnapShotData.service.title}
          subtitle="Tap to view service details"
          icon={<FaBriefcase className="text-2xl shrink-0 " />}
          onClick={() => {
            showCustomJSXPopup({
              jsx: (
                <ServicePopup service={response.onlineSnapShotData!!.service} />
              ),
            });
          }}
        />
      ) : response.offlineSnapShotData ? (
        <Setting
          title={response.offlineSnapShotData.service.title}
          subtitle="Tap to view service details"
          icon={<FaBriefcase className="text-2xl shrink-0" />}
          onClick={() => {
            showCustomJSXPopup({
              jsx: (
                <ServicePopup
                  service={response.offlineSnapShotData!!.service}
                />
              ),
            });
          }}
        />
      ) : response.homeSnapShotData ? (
        <Setting
          title={response.homeSnapShotData.service.title}
          subtitle="Tap to view service details"
          icon={<FaBriefcase className="text-2xl shrink-0 " />}
          onClick={() => {
            showCustomJSXPopup({
              jsx: (
                <ServicePopup service={response.homeSnapShotData!!.service} />
              ),
            });
          }}
        />
      ) : (
        <Setting
          title="Service Details"
          subtitle="No service details found"
          icon={<FaBriefcase className="text-2xl shrink-0 " />}
        />
      )}
      {response.customer.name ? (
        <Setting
          title={
            response.customer.name.length > 20
              ? response.customer.name.substring(0, 20) + "..."
              : response.customer.name
          }
          subtitle="Tap to view user profile"
          icon={<FaUser className="text-2xl shrink-0 " />}
          onClick={() => {
            router.push(
              "/user/" +
                response.customer.id +
                "?backLink=/console/appointments/view-appointment/" +
                response.appointment.id
            );
          }}
        />
      ) : (
        <Setting
          title={response.customer.mobileNumber}
          subtitle="User has not registered on reach yet"
          icon={<AiOutlineQuestionCircle className="text-2xl shrink-0 " />}
        />
      )}
      {response.onlineSnapShotData &&
      response.onlineSnapShotData.addOns &&
      response.onlineSnapShotData.addOns.length > 0 ? (
        <Setting
          title="Add-ons"
          subtitle="Tap to view add-ons"
          icon={<FaBriefcase className="text-2xl shrink-0 " />}
          onClick={() => {
            showCustomJSXPopup({
              jsx: (
                <AddOnsPopup addOns={response.onlineSnapShotData!!.addOns} />
              ),
            });
          }}
        />
      ) : response.offlineSnapShotData &&
        response.offlineSnapShotData.addOns &&
        response.offlineSnapShotData.addOns.length > 0 ? (
        <Setting
          title="Add-ons"
          subtitle="Tap to view add-ons"
          icon={<FaBriefcase className="text-2xl shrink-0 " />}
          onClick={() => {
            showCustomJSXPopup({
              jsx: (
                <AddOnsPopup addOns={response.offlineSnapShotData!!.addOns} />
              ),
            });
          }}
        />
      ) : response.homeSnapShotData &&
        response.homeSnapShotData.addOns &&
        response.homeSnapShotData.addOns.length > 0 ? (
        <Setting
          title="Add-ons"
          subtitle="Tap to view add-ons"
          icon={<FaBriefcase className="text-2xl shrink-0 " />}
          onClick={() => {
            showCustomJSXPopup({
              jsx: <AddOnsPopup addOns={response.homeSnapShotData!!.addOns} />,
            });
          }}
        />
      ) : null}
      {response.appointment.feedback ? (
        <div className="w-full" id="feedback">
          <RadioInput
            options={[
              {
                icon: (
                  <div className="flex flex-row items-center justify-center space-x-1">
                    <p className="text-xl">
                      {response.appointment.feedback.serviceQualityRating}
                    </p>
                    <AiFillStar className="text-xl text-yellow-500" />
                  </div>
                ),
                title: "Service Quality",
                onClick: () => {},
              },
              {
                icon: (
                  <div className="flex flex-row items-center justify-center space-x-1">
                    <p className="text-xl">
                      {response.appointment.feedback.userBehaviourRating}
                    </p>
                    <AiFillStar className="text-xl text-yellow-500" />
                  </div>
                ),
                title: "User Behaviour",
                onClick: () => {},
              },
            ]}
            cols="grid-cols-2"
          />
        </div>
      ) : null}
      <LineHeader title="Secondary Details" />
      {response.onlineSnapShotData ? (
        <OnlineServiceDetails
          onlineSnapShotData={response.onlineSnapShotData}
        />
      ) : response.offlineSnapShotData ? (
        <OfflineServiceDetails
          offlineSnapShotData={response.offlineSnapShotData}
        />
      ) : response.homeSnapShotData ? (
        <HomeServiceDetails homeSnapShotData={response.homeSnapShotData} />
      ) : (
        <Card className="flex flex-col items-start justify-start !space-y-3 w-full">
          <AiOutlineQuestionCircle className="text-2xl shrink-0 " />
          <p className="text-md/3 font-medium">No service details found</p>
          <p className="text-base/7 font-medium">
            This appointment has no service details
          </p>
        </Card>
      )}
    </MobileWrapper>
  );
}

function Appointment({
  cancelledAt,
  completedAt,
  scheduledAt,
  bookedAt,
  status,
  ratedAt,
  setRequestRatingButtonState,
  requestRatingButtonState,
  id,
}: {
  scheduledAt: Date;
  bookedAt: Date | null;
  completedAt: Date | null;
  cancelledAt: Date | null;
  status: AppointmentStatus;
  ratedAt: Date | null;
  setRequestRatingButtonState: React.Dispatch<React.SetStateAction<State>>;
  id: string;
  requestRatingButtonState: State;
}) {
  return (
    <ListWrapper className="flex flex-col items-center justify-start w-full space-y-5">
      {status == AppointmentStatus.COMPLETED ||
      status == AppointmentStatus.RATED ? (
        <RadioInput
          options={[
            {
              icon: completedAt ? (
                <AiOutlineCheckCircle className="text-4xl text-white shrink-0 " />
              ) : (
                <AiOutlineCloseCircle className="text-4xl text-white shrink-0 " />
              ),
              title: "Completed",
              onClick: () => {},
              className: completedAt ? "bg-success" : "bg-danger",
              textColor: "text-white",
            },
            {
              icon:
                requestRatingButtonState === State.SUCCESS ? (
                  status == AppointmentStatus.RATED ? (
                    <AiOutlineCheckCircle className="text-4xl text-white shrink-0 " />
                  ) : (
                    <AiOutlineCloseCircle className="text-4xl text-white shrink-0 " />
                  )
                ) : (
                  <Loading className="w-8 h-8 text-white" />
                ),

              title: status == AppointmentStatus.RATED ? "Rated" : "Not Rated",
              onClick: () => {
                if (status == AppointmentStatus.COMPLETED) {
                  showCustomJSXPopup({
                    jsx: (
                      <div className="flex flex-col items-center justify-center w-full space-y-5">
                        <div className="flex flex-col items-center justify-center w-full space-y-3">
                          <FcRating className="w-12 h-12 shrink-0 text-success" />
                          <p className="text-lg text-center font-medium">
                            No Feedback provided
                          </p>
                          <p className="text-base text-center">
                            It is very important to get feedback from the user
                            to improve your profile. Hurry up and request
                            feedback from the user.
                          </p>
                        </div>
                      </div>
                    ),
                    okText: "Request Feedback",
                    okButtonClassName: "bg-success text-white font-medium",
                    onOk: async () => {
                      setRequestRatingButtonState(State.LOADING);
                      const res = await requestRating({
                        appointmentId: id,
                      });
                      if (res) {
                        showSnackBar({
                          message: "Feedback requested successfully",
                          state: State.SUCCESS,
                        });
                      }
                      setRequestRatingButtonState(State.SUCCESS);
                    },
                    showCancelButton: false,
                    preventDefault: true,
                  });
                } else if (status === AppointmentStatus.RATED) {
                  //scroll to div with id feedback
                  document.getElementById("feedback")?.scrollIntoView();
                }
              },
              //
              className:
                status == AppointmentStatus.RATED ? "bg-success" : "bg-danger",
              textColor: "text-white",
            },
          ]}
          cols="grid-cols-2"
        />
      ) : status === AppointmentStatus.CANCELLED ? (
        <RadioInput
          options={[
            {
              icon: (
                <AiOutlineCloseCircle className="text-4xl text-white shrink-0 " />
              ),
              title: "Cancelled",
              onClick: () => {},
              className: "bg-danger",
              textColor: "text-white",
            },
          ]}
          cols="grid-cols-1"
        />
      ) : (
        <RadioInput
          options={[
            {
              icon: (
                <AiOutlineAlert className="text-4xl text-white shrink-0 " />
              ),
              title: "Pending",
              onClick: () => {},
              className: "bg-warning",
              textColor: "text-white",
            },
          ]}
          cols="grid-cols-2"
        />
      )}
    </ListWrapper>
  );
}

function OnlineServiceDetails({
  onlineSnapShotData,
}: {
  onlineSnapShotData: FetchAppointmentResponse["onlineSnapShotData"];
}) {
  return (
    <Card className="flex flex-col items-center justify-center !space-y-3 w-full">
      <FaLaptop className="text-4xl shrink-0 " />
      <p className="text-md/3 font-medium">
        {onlineSnapShotData?.platform.replace("_", " ").toUpperCase()}
      </p>
      <p className="text-base text-center">
        The appointment has taken place online.
      </p>
    </Card>
  );
}

function OfflineServiceDetails({
  offlineSnapShotData,
}: {
  offlineSnapShotData: FetchAppointmentResponse["offlineSnapShotData"];
}) {
  return (
    <LocationCard
      location={offlineSnapShotData!!.location}
      getDirections={true}
    />
  );
}

function HomeServiceDetails({
  homeSnapShotData,
}: {
  homeSnapShotData: FetchAppointmentResponse["homeSnapShotData"];
}) {
  return <LocationCardWithName address={homeSnapShotData!!.address} />;
}

function ServicePopup({
  service,
}: {
  service: {
    title: string;
    whatsIncluded: string[];
    whatsNotIncluded: string[];
    requirements: string[];
    serviceId: string;
    imageUrls: string[];
  };
}) {
  return (
    <div className="flex flex-col items-start justify-start !space-y-5 w-full">
      <div className="flex flex-col items-start justify-start space-y-2 w-full">
        <p className="text-lg font-medium">{service.title}</p>
        <Rating rating={4} />
      </div>
      <div className="flex flex-col items-start justify-start space-y-1 w-full">
        <p className="text-md font-medium">What&apos;s Included</p>
        {service.whatsIncluded.length > 3
          ? service.whatsIncluded.slice(0, 3).map((item) => (
              <p className="text-base/7" key={item}>
                {item}
              </p>
            ))
          : service.whatsIncluded.map((item) => (
              <p className="text-base/7" key={item}>
                {item}
              </p>
            ))}
        {service.whatsIncluded.length > 3 && (
          <p className="text-base/7">
            +{service.whatsIncluded.length - 3} more
          </p>
        )}
      </div>
      <div className="flex flex-col items-start justify-start space-y-1 w-full">
        <p className="text-md font-medium">What&apos;s Not Included</p>
        {service.whatsNotIncluded.length > 3
          ? service.whatsNotIncluded.slice(0, 3).map((item) => (
              <p className="text-base/7" key={item}>
                {item}
              </p>
            ))
          : service.whatsNotIncluded.map((item) => (
              <p className="text-base/7" key={item}>
                {item}
              </p>
            ))}
        {service.whatsNotIncluded.length > 3 && (
          <p className="text-base/7">
            +{service.whatsNotIncluded.length - 3} more
          </p>
        )}
      </div>
      <div className="flex flex-col items-start justify-start space-y-1 w-full">
        <p className="text-md font-medium">Requirements</p>
        {service.requirements.length > 3 ? (
          service.requirements.slice(0, 3).map((item) => (
            <p className="text-base/7" key={item}>
              {item}
            </p>
          ))
        ) : (
          <p className="text-base/7">{service.requirements}</p>
        )}
        {service.requirements.length > 3 && (
          <p className="text-base/7">+{service.requirements.length - 3} more</p>
        )}
      </div>
    </div>
  );
}

function AddOnsPopup({
  addOns,
}: {
  addOns: {
    title: string;
    description: string;
    price: number;
    id: string;
  }[];
}) {
  return (
    <div className="flex flex-col items-start justify-start !space-y-5 w-full">
      {addOns.map((addOn) => (
        <Card
          className="flex flex-col items-start justify-start !space-y-3 w-full"
          key={addOn.id}
        >
          <div className="flex flex-row items-center justify-between w-full">
            <div className="flex flex-row items-center justify-start space-x-2">
              <p className="text-base font-medium">{addOn.title}</p>
              <AiOutlineQuestionCircle className="text-base text-textsubtle" />
            </div>
            <p className="text-base font-medium">₹{addOn.price}</p>
          </div>
          <p className="text-base/7">{addOn.description}</p>
        </Card>
      ))}
    </div>
  );
}
