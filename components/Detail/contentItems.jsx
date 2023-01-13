import React from "react";
import { domainMp } from "../../utils/globalConstant";
import CardNfts from "../Common/CardNfts";
import { PaginationMp } from "../Common/PaginationMp";

export default function ContentItems(props) {
  return (
    <>
      {props.dataItems ? (
        <>
          <div className="grid grid-cols-6 gap-5 md:grid-cols-4 sm:grid-cols-2">
            {props.dataItems.map((item, idx) => {
              return (
                <div key={idx} className="list-card-items">
                  <CardNfts item={item} showCreator={true} />
                </div>
              );
            })}
          </div>
          <PaginationMp page={props.page} pageAction={props.getFilterItems} />
        </>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-1">
          <a href={domainMp.pro}>
            <img className="w-full" src="/images/Default_Item.png" alt="" />
          </a>
          <div className="p-4 self-center text-left md:text-center">
            <p className="mb-2 text-2xl font-bold md:text-sm">
              Get these items and trade them with other players on VCGamers NFT
              Marketplace
            </p>
            <a href={domainMp.pro}>
              <button
                className="btn btn-orange-light md:text-sm"
                style={{ padding: "10px 16px" }}
              >
                Visit NFT Marketplace
              </button>
            </a>
          </div>
        </div>
      )}
    </>
  );
}
