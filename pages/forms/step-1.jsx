import React from "react";

export default function Step1(props) {
  return (
    <div className="">
      <p className="text-lg font-bold">Personal Info</p>
      <div className="mt-8">
        <div className="flex md:block items-center mt-5">
          <div className="w-1/4 md:w-full mb-2 text-sm font-semibold" style={{ color: "#9AA4BF", fontSize: "14px" }}>
            <p>Full Name (Contact Person)</p>
          </div>
          <div className="wrap-input flex-1">
            <input type="text" className="w-full" placeholder="Full name" />
          </div>
        </div>
        <div className="flex md:block items-center mt-5">
          <div className="w-1/4 md:w-full mb-2 text-sm font-semibold" style={{ color: "#9AA4BF", fontSize: "14px" }}>
            <p>Wallet Address</p>
          </div>
          <div className="wrap-input flex-1">
            <input type="text" className="w-full" placeholder="0xi93..." />
          </div>
        </div>
        <div className="flex md:block items-center mt-5">
          <div className="w-1/4 md:w-full mb-2 text-sm font-semibold" style={{ color: "#9AA4BF", fontSize: "14px" }}>
            <p>Email Address (Contact Person)</p>
          </div>
          <div className="wrap-input flex-1">
            <input type="text" className="w-full" placeholder="Email Address" />
          </div>
        </div>
      </div>
    </div>
  );
}
