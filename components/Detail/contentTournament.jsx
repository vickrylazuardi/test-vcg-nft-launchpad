import React from "react";
import { AiOutlineArrowDown } from "react-icons/ai";
import moment from "moment";

export default function ContentTournament(props) {
  return (
    <>
      {props.tournamentList ? (
        <div className="grid gap-x-4 gap-y-4 grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
          {props.tournamentList.map((item, idx) => {
            return (
              <div key={idx} className="card-tournament">
                <div className="card-img">
                  <img
                    src={item.banner ? item.banner : "/images/Broken-Image.png"}
                    alt=""
                    onError={({ currentTarget }) => {
                      currentTarget.onerror = null; // prevents looping
                      currentTarget.src = "/images/Broken-Image.png";
                    }}
                  />
                  {/* <p className="label-status open">{item.status_text}</p> */}
                </div>
                <div className="card-detail py-4 px-5">
                  <h4 className="font-bold text-lg max-1-line">{item.name}</h4>
                  <p className="font-bold text-sm mt-4">
                    <img
                      className="creator-img inline mr-2"
                      src={
                        item.game_icon
                          ? item.game_icon
                          : "/images/Broken-Image.png"
                      }
                      alt=""
                      onError={({ currentTarget }) => {
                        currentTarget.onerror = null; // prevents looping
                        currentTarget.src = "/images/Broken-Image.png";
                      }}
                    />
                    {item.game_name}
                  </p>
                  <div className="mt-4">
                    <div className="flex justify-between">
                      <p className="font-bold">Team Slots</p>
                      <p className="font-bold">
                        {parseInt(item.number_participant_in)}/
                        <span className="text-color-grey">
                          {parseInt(item.number_participant)}
                        </span>
                      </p>
                    </div>
                    <div className="progress-bar mt-2">
                      <div
                        className={`progress-bar-inner-bar ${
                          (parseInt(item.number_participant_in) /
                            parseInt(item.number_participant)) *
                            100 ==
                          100
                            ? "full"
                            : ""
                        }`}
                        style={{
                          width: `${
                            (parseInt(item.number_participant_in) /
                              parseInt(item.number_participant)) *
                            100
                          }%`,
                        }}
                      />
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="grid grid-cols-2 gap-x-1">
                      <div
                        className="text-center p-2"
                        style={{
                          background: "#161B28",
                          borderRadius: "10px 0px 0px 10px",
                        }}
                      >
                        <p className="text-xs font-bold mb-2">Registration</p>
                        <p className="text-color-grey text-xs mb-1">
                          {moment(item.registration_date_from).format(
                            "MMMM DD, YYYY"
                          )}
                        </p>
                        <AiOutlineArrowDown className="m-auto" />
                        <p className="text-color-grey text-xs mt-1">
                          {moment(item.registration_date_to).format(
                            "MMMM DD, YYYY"
                          )}
                        </p>
                      </div>
                      <div
                        className="text-center p-2"
                        style={{
                          background: "#161B28",
                          borderRadius: "0px 10px 10px 0px",
                        }}
                      >
                        <p className="text-xs font-bold mb-2">
                          Tournament Schedule
                        </p>
                        <p className="text-color-grey text-xs mb-1">
                          {moment(item.tournament_date_from).format(
                            "MMMM DD, YYYY"
                          )}
                        </p>
                        <AiOutlineArrowDown className="m-auto" />
                        <p className="text-color-grey text-xs mt-1">
                          {moment(item.tournament_date_to).format(
                            "MMMM DD, YYYY"
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="flex justify-between">
                      <p className="text-xs font-bold">Registration fee</p>
                      <p className="text-xs font-bold">
                        {item.registration_fee_text == "0"
                          ? "Gratis"
                          : `Rp. ${item.registration_fee_text}`}
                      </p>
                    </div>
                    <div className="flex justify-between mt-2">
                      <p className="text-xs font-bold">Total prize</p>
                      <p className="text-xs font-bold">
                        Rp. {item.grandprize_text}
                      </p>
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="flex gap-x-2">
                      <div className="flex-none">
                        <a
                          href={`https://arena.vcg.asia/tournament/${item.url}`}
                          target="_blank"
                        >
                          <button
                            className="btn btn-outline-white"
                            style={{ padding: "5px 20px" }}
                          >
                            Details
                          </button>
                        </a>
                      </div>
                      <div className="flex-1">
                        <a
                          href={`https://arena.vcg.asia/tournament/terms-conditions?tournament_id=${item.id}&game_id=${item.game_id}&game_name=${item.game_name}&slug=${item.url}`}
                          target="_blank"
                        >
                          <button
                            className="btn btn-light-green w-full"
                            style={{ padding: "5px 20px" }}
                          >
                            Join the Tournament
                          </button>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="mx-auto my-20 flex flex-col items-center">
          <img className="mb-5 w-64" src="/images/data-not-found.png" alt="" />
          <p className="pnd-title font-semibold">No Data Found</p>
        </div>
      )}
    </>
  );
}
