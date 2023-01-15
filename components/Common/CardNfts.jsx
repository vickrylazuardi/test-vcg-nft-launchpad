import React from "react";
import { domainMp } from "../../utils/globalConstant";

export default function CardNfts(props) {
  return (
    <div className="card card-nfts">
      {props.item?.images ? (
        <a
          href={`${domainMp.dev}/item/detail/${props.item?.collectionId?.nftAddress}/${props.item?.tokenId}`}
        >
          <img
            src={
              props.item.images.nft.url
                ? props.item.images.nft.url.slice(0, 7) === "ipfs://"
                  ? `https://cloudflare-ipfs.com/ipfs/${props.item.images.nft.url.slice(
                      7
                    )}`
                  : props.item.images.nft.url
                : "/images/Broken-Image.png"
            }
            className="card-img-top"
            onError={({ currentTarget }) => {
              currentTarget.onerror = null; // prevents looping
              currentTarget.src = "/images/Broken-Image.png";
            }}
          />
        </a>
      ) : (
        <div className="card-img-top shimmer" />
      )}

      <div className="card-body">
        <h6 className="font-bold max-1-line mb-2">
          {props.item?.name ? (
            props.item?.name
          ) : props.item?.metadataName ? (
            props.item?.metadataName
          ) : (
            <div
              className="h-3 bg-slate-700 mb-3 animate-pulse"
              style={{ borderRadius: "3px" }}
            ></div>
          )}
        </h6>
        <p className="nfts-price mb-2 flex items-center">
          <img
            style={{ width: "18px", height: "18px" }}
            className="mr-1"
            src="/images/coin-vcg.png"
            alt="vcg-token"
          />
          {props.item?.price
            ? Intl.NumberFormat("en-US").format(Number(props.item?.price))
            : "0"}{" "}
          VCG
        </p>

        <p className="collection-name mb-2">
          {props.item?.collectionId?.collectionName}
        </p>
        {props.showCreator && (
          <a
            href={`${domainMp.dev}/profile/${props.item?.creator?.walletAddress}`}
          >
            <div className="flex mb-2">
              <div>
                <div
                  className="mask mask-hexagon profile-pict-container relative m-auto"
                  style={{ width: "20px", height: "20px" }}
                >
                  <div
                    className="mask mask-hexagon profile-wrap"
                    style={{ background: "#3f485f" }}
                  >
                    <img
                      width={10}
                      src={
                        props?.creatorImage?.length
                          ? props?.creatorImage
                          : "/images/default-avatar.png"
                      }
                      className="mask mask-hexagon object-contain h-full w-full"
                    />
                  </div>
                </div>
              </div>
              <p className="mb-0 creator-name d-flex align-items-center ml-2">
                {props.item?.creator?.name
                  ? props.item?.creator?.name
                  : props.item?.owner[0]
                  ? props.item?.owner[0]?.slice(0, 7) +
                    "..." +
                    props.item?.owner[0]?.slice(-7)
                  : ""}{" "}
                {props.item?.creator?.verified && (
                  <img
                    style={{ width: "12px", height: "12px" }}
                    src="/assets-home-marketplace/verifed.png"
                  />
                )}
              </p>
            </div>
          </a>
        )}

        {props.isClaimRoyalty && (
          <button
            className="btn btn-outline-grey mt-3 w-100"
            style={{ fontSize: "12px" }}
            data-bs-toggle="modal"
            data-bs-target="#modalClaimRoyalty"
            onClick={() => {
              props.action(props.item);
              props.getRoyalty(props.item);
            }}
          >
            Claim Royalty
          </button>
        )}
      </div>
    </div>
  );
}
