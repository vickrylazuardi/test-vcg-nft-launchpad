import React from "react";
import CardNfts from "../Common/CardNfts";

export default function ContentItems(props) {
  return (
    <>
      {/* <div className="grid grid-cols-2 md:grid-cols-1">
        <img className="w-full" src="/images/banner-crossout-1.png" alt="" />
        <div className="p-4 self-center text-left md:text-center">
          <p className="mb-2 text-2xl font-bold md:text-sm">
            Get these items and trade them with other players on VCGamers NFT
            Marketplace
          </p>
          <button
            className="btn btn-orange-light md:text-sm"
            style={{ padding: "10px 16px" }}
          >
            Visit NFT Marketplace
          </button>
        </div>
      </div> */}
      <div className="grid grid-cols-6 gap-5 md:grid-cols-4 sm:grid-cols-2">
        {props.dataItems.items.map((item, idx) => {
          return (
            <div key={idx} className="list-card-items">
              <CardNfts item={item} showCreator={true} />
            </div>
          );
        })}
      </div>
    </>
  );
}
