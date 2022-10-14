import React, { useEffect, useState } from "react";

export default function LoadingVcg({info, count, down}) {
  return (
    <div id="loading-vcg" className="loadingPage d-none">
      <div
        style={{ width: "100%", height: "100%" }}
        className="d-flex flex-column align-items-center justify-content-center"
      >
        <img
          width={240}
          height={240}
          src="/assets-home-marketplace/loading-vcg.gif"
        />
        {info ? <h2>{info}</h2> : ""}
        {count ? <h2>{count - down}</h2> : ""}
      </div>
    </div>
  );
}
