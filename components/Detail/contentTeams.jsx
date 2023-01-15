import React from "react";

export default function ContentTeams(props) {
  return (
    <div className="grid grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-6">
      {Object.keys(props.project.team).map((item, idx) => {
        const value = props.project?.team[item];
        return (
          <div
            key={idx}
            className="flex flex-wrap md:justify-center md:text-center gap-x-3"
          >
            <div
              className="mask mask-hexagon profile-pict-container relative"
              style={{ width: "100px", height: "100px" }}
            >
              <div
                className="mask mask-hexagon profile-wrap"
                style={{ background: "#3f485f" }}
              >
                <img
                  src={value.image}
                  className="mask mask-hexagon object-contain h-full w-full"
                />
              </div>
            </div>
            <div className="self-center md:w-full md:mt-3">
              <p className="text-sm font-bold">{item}</p>
              <p className="text-sm font-semibold text-color-grey">
                {value.position}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
