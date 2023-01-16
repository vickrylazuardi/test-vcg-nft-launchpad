import React from "react";

export default function Step1(props) {
  return (
    <div className="">
      <p className="text-lg font-bold">Personal Info</p>
      <div className="mt-8">
        <div className="wrap-input">
          <label className="label-input">Full Name (Contact Person)*</label>
          <input
            type="text"
            maxLength={100}
            className="w-full"
            placeholder="Full name"
            value={props?.data?.contactName ?? ""}
            onChange={(e) => props.getData("contactName", e.target.value)}
          />
        </div>
        <div className="wrap-input mt-8">
          <label className="label-input">Wallet Address*</label>
          <input
            type="text"
            maxLength={100}
            className="w-full"
            placeholder="0xi93..."
            value={props?.data?.owner ?? ""}
            onChange={(e) => props.getData("owner", e.target.value)}
          />
        </div>
        <div className="wrap-input mt-8">
          <label className="label-input">Email Address (Contact Person)</label>
          <input
            type="text"
            maxLength={100}
            className={
              props?.data?.validEmail == undefined
                ? "w-full"
                : props?.data?.validEmail
                ? "w-full"
                : "w-full !border-rose-600"
            }
            placeholder="Email Address"
            value={props?.data?.contactEmail ?? ""}
            onChange={(e) => {
              const at = e.target.value.indexOf("@");
              const dot = e.target.value.lastIndexOf(".");
              if (at < 1 || dot < at + 2 || dot + 2 >= e.target.value.length) {
                props.getData("contactEmail", e.target.value, false);
              } else {
                props.getData("contactEmail", e.target.value, true);
              }
            }}
          />
        </div>
      </div>
    </div>
  );
}
