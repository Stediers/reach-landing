import { favouriteGigWorker } from "@api_functions/user/favourite-gig-worker";
import { FetchMyPartnersResponse } from "@api_functions/user/fetch-my-partners";
import BoxRating from "@components/BoxRating";
import Card from "@components/Card";
import ImageComponent from "@components/ImageComponent";
import TextInput from "@components/input/TextInput";
import ListWrapper from "@wrapper/ListWrapper";
import MobileWrapper from "@wrapper/responsive/MobileWrapper";
import { motion } from "framer-motion";
import debounce from "lodash/debounce";
import router from "next/router";
import { Dispatch, SetStateAction, useState } from "react";
import { BiError } from "react-icons/bi";
import { FcLike, FcLikePlaceholder } from "react-icons/fc";

export default function Mobile({
  response,
  filter,
  setFilter,
}: {
  response: FetchMyPartnersResponse[];
  filter: "favourite" | "appointments" | null;
  setFilter: Dispatch<SetStateAction<"favourite" | "appointments" | null>>;
}) {
  const [filteredResponse, setFilteredResponse] =
    useState<FetchMyPartnersResponse[]>(response);
  const [searchQuery, setSearchQuery] = useState("");
  return (
    <MobileWrapper
      className="flex flex-col space-y-4 w-full items-center justify-start"
      header="My Partners"
    >
      {response.length > 0 ? (
        <TextInput
          title="Search"
          onChange={(value) => {
            setSearchQuery(value);
            _debounce({
              query: value,
              response,
              setFilteredResponse,
            });
          }}
          value={searchQuery}
          placeholder="Search for a gig"
        />
      ) : null}
      {filteredResponse.length === 0 ? (
        <Card className="flex flex-col items-center justify-center !space-y-3">
          <BiError className="text-4xl" />
          <div className="flex flex-col items-center justify-center !space-y-2">
            <p className="text-lg font-medium">You have no partners yet.</p>
            <p className="text-sm font-normal text-gray-400 text-center">
              Book a service with a partner to add them to your partners list.
            </p>
          </div>
        </Card>
      ) : (
        <ListWrapper>
          {filteredResponse.map((res) => (
            <GigCard
              response={res}
              setFilteredResponse={setFilteredResponse}
              key={res.id}
              onClick={() => {
                router.push(`/partner/${res.id}?backLink=/user/my-partners`);
              }}
            />
          ))}
        </ListWrapper>
      )}
    </MobileWrapper>
  );
}

function GigCard({
  response,
  setFilteredResponse,
  onClick,
}: {
  response: FetchMyPartnersResponse;
  setFilteredResponse: Dispatch<SetStateAction<FetchMyPartnersResponse[]>>;
  onClick?: () => void;
}) {
  return (
    <Card
      className="flex flex-col !items-start justify-start !space-y-5 w-full"
      onClick={onClick}
    >
      <div className="flex flex-row items-start justify-center w-full space-x-4">
        <ImageComponent
          className="rounded-md w-[6.2rem] h-[6.2rem] shrink-0"
          src={response.imageUrl}
          alt="Profile Picture"
        />
        <div className="flex flex-col items-start justify-between w-full min-h-full">
          <div className="flex flex-col items-start justify-start w-full">
            <div className="flex items-center justify-between w-full space-x-3">
              <p className="text-md font-medium w-full pt-1 first-letter:capitalize">
                {response.name.length > 15
                  ? response.name.substring(0, 15) + "..."
                  : response.name}
              </p>
              {/* <BoxRating rating={response.rating} /> */}
              {response.favourite ? (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3 }}
                  whileTap={{ scale: 0.8 }}
                  onClick={async (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setFilteredResponse((prev) => {
                      return prev.map((prevRes) => {
                        if (prevRes.id === response.id) {
                          return {
                            ...prevRes,
                            favourite: false,
                          };
                        }
                        return prevRes;
                      });
                    });
                    const res = await favouriteGigWorker({
                      favourite: false,
                      userId: response.id,
                    });
                    if (!res) {
                      //set favourite to false
                      setFilteredResponse((prev) => {
                        return prev.map((prevRes) => {
                          if (prevRes.id === response.id) {
                            return {
                              ...prevRes,
                              favourite: true,
                            };
                          }
                          return prevRes;
                        });
                      });
                    }
                  }}
                >
                  <FcLike className="text-xl" />
                </motion.div>
              ) : (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3 }}
                  whileTap={{ scale: 0.8 }}
                >
                  <FcLikePlaceholder
                    className="text-xl"
                    onClick={async () => {
                      setFilteredResponse((prev) => {
                        return prev.map((prevRes) => {
                          if (prevRes.id === response.id) {
                            return {
                              ...prevRes,
                              favourite: true,
                            };
                          }
                          return prevRes;
                        });
                      });
                      const res = await favouriteGigWorker({
                        favourite: true,
                        userId: response.id,
                      });
                      if (!res) {
                        //set favourite to false
                        setFilteredResponse((prev) => {
                          return prev.map((prevRes) => {
                            if (prevRes.id === response.id) {
                              return {
                                ...prevRes,
                                favourite: false,
                              };
                            }
                            return prevRes;
                          });
                        });
                      }
                    }}
                  />
                </motion.div>
              )}
            </div>
            <p className="text-sm font-normal text-gray-400">
              {response.designation.length > 15
                ? response.designation.substring(0, 15) + "..."
                : response.designation}
            </p>
          </div>
          <BoxRating rating={response.rating} />
        </div>
      </div>
    </Card>
  );
}

function searchGig({
  query,
  response,
  setFilteredResponse,
}: {
  query: string;
  response: FetchMyPartnersResponse[];
  setFilteredResponse: Dispatch<SetStateAction<FetchMyPartnersResponse[]>>;
}) {
  setFilteredResponse(
    response.filter((res) => {
      return res.name.toLowerCase().includes(query.toLowerCase());
    })
  );
}

const _debounce = debounce(searchGig, 500);
