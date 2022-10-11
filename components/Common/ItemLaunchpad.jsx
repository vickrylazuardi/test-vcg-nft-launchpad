import React from "react";

export default function ItemLaunchpad(props) {
  return (
    <div id="item-launchpad">
      <div className="img-wrap">
        <img src="/images/item-launchpad.png" alt="web vcgamers" />
      </div>
      <div className="content-item p-4">
        <h3 className="font-bold mb-1">{props?.name}</h3>
        <div className="content-show">
          {
            props?.data?.items ?
            Object.keys(props.data.items).map((item, idx) => {
              const value = props.data.items[item];
              return (
                <div key={idx} className="pre-item">
                  <p className="pre-title">{item}</p>
                  <p>{value}</p>
                </div>
              )
            }) : ""
          }
          <div className="pre-item">
            <p className="pre-title">Owned</p>
            <p>{props?.owned}</p>
          </div>
        </div>
        <div className="see-btn flex items-center justify-center cursor-pointer">
          <p
            className="text-sm font-semibold mr-2"
            style={{ color: "#9aa4bf" }}
          >
            See More
          </p>
          <img
            src="/images/svg/arrow-small.svg"
            alt="web vcgamers"
            className="cursor-pointer"
          />
        </div>
        <div className="price-wrap mt-3">
          <div className="price flex items-center justify-between">
            <p className="title font-semibold text-sm">Price</p>
            <p className="font-semibold text-sm" style={{ color: "#40d04f" }}>
              {props?.data?.price} VCG
            </p>
          </div>
          <div className="price-bar">
            <div
              className={"price-inner-bar"}
              style={{
                width: `${props?.data?.sold / props?.data?.stock * 100}%`
              }}
            />
          </div>
        </div>
        <div className="percentage-wrap mt-3 flex items-center justify-between">
          <p className="font-bold text-sm">
            {(props?.data?.sold / props?.data?.stock * 100).toFixed(0)}%
          </p>
          <p className="font-bold text-sm">
            {props?.data?.sold}/{props?.data?.stock} Boxes
          </p>
        </div>
        <div className="btn-wrap mt-3">
          {
            props?.account ?
            (
              props?.account == props?.project?.owner ?
              <button
                className={
                  props?.data?.finalize
                    ? "btn btn-disabled w-full"
                    : "btn btn-purple-primary w-full"
                }
                onClick={() => props.finalize(props.name)}
              >
                Finalize
              </button> :
              props?.data?.finalize ?
              <button
                className={
                  props?.owned < 1
                    ? "btn btn-disabled w-full"
                    : "btn btn-purple-primary w-full"
                }
                onClick={() => props.claim(props.name)}
              >
                Claim
              </button> :
              <button
                className={
                  props?.data?.sold == props?.data?.stock
                    ? "btn btn-disabled w-full"
                    : "btn btn-purple-primary w-full"
                }
                onClick={() => props.buy(props.name, 1, props.data.price)}
              >
                Buy
              </button>
            ) :
            <button
              className={"btn btn-purple-primary w-full"}
              onClick={() => props.connect("metaMask")}
            >
              Connect Wallet
            </button>
          }
        </div>
      </div>
    </div>
  );
}
