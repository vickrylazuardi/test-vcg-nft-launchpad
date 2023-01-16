import React, { useState } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { toggleModalConfirmation } from "../../redux/modalReducer";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

export default function ItemLaunchpadv2(props) {
  const modal = useSelector((state) => state.modal);
  const dispatch = useDispatch();

  const [amount, setAmount] = useState(0);
  const [isCollepse, setIsCollepse] = useState(false);

  const dataModal = {
    modalConfirmation: {
      loading: false,
      isOpen: true,
      isPlain: true,
      isSuccess: false,
      isFailed: false,
      title: {
        en: "Confirmation",
      },
    },
  };

  return (
    <div id="item-launchpad" style={{ maxWidth: "100%" }}>
      <div className="img-wrap">
        <img
          src={props.data.image}
          alt="web vcgamers"
          style={{ aspectRatio: "1/1", objectFit: "cover", width: "100%" }}
          onError={({ currentTarget }) => {
            currentTarget.onerror = null; // prevents looping
            currentTarget.src = "/images/Broken-Image.png";
          }}
        />
      </div>
      <div className="content-item p-4">
        <h3 className="font-bold mb-1 text-center">{props?.name}</h3>
        <div
          className={`${
            isCollepse
              ? "visible opacity-100 h-auto"
              : "invisible opacity-0 h-0"
          }`}
          style={{ transition: "visibility 0s, opacity 0.5s linear" }}
        >
          {props?.data?.items
            ? Object.keys(props.data.items).map((item, idx) => {
                const value = props.data.items[item];
                return (
                  <div key={idx} className="pre-item">
                    <p className="pre-title">{item}</p>
                    <p>{value}</p>
                  </div>
                );
              })
            : ""}
          <div className="pre-item">
            <p className="pre-title">Owned</p>
            <p>{props?.owned}</p>
          </div>
        </div>
        <p
          onClick={() => setIsCollepse(!isCollepse)}
          className="text-sm font-semibold text-color-grey text-center cursor-pointer"
        >
          {isCollepse ? "See Less" : "See More"}
          {isCollepse ? (
            <FiChevronUp className="text-lg inline ml-1" />
          ) : (
            <FiChevronDown className="text-lg inline ml-1" />
          )}
        </p>
        <div className="price-wrap mt-3">
          {/* <div className="price flex items-center justify-between">
            <p className="title font-semibold text-sm">Price</p>
            <p className="font-semibold text-sm" style={{ color: "#40d04f" }}>
              {props?.data?.price} VCG
            </p>
          </div> */}
          <div className="price-bar">
            <div
              className={
                (props?.data?.sold / props?.data?.stock) * 100 == 100
                  ? "price-inner-bar full"
                  : "price-inner-bar"
              }
              style={{
                width: `${(props?.data?.sold / props?.data?.stock) * 100}%`,
              }}
            />
          </div>
        </div>
        <div className="percentage-wrap mt-3 flex items-center justify-between">
          <p className="font-bold text-sm">
            {((props?.data?.sold / props?.data?.stock) * 100).toFixed(0)}%
          </p>
          <p className="font-bold text-sm">
            {props?.data?.sold}/{props?.data?.stock} Boxes
          </p>
        </div>
        {/* TODO NEW PRICE */}
        {/* <div className="py-2 mt-2" style={{ borderTop: "1px solid #2A334B" }}>
          <p className="text-sm font-semibold text-color-grey mb-2">Price</p>
          <div className="flex justify-between">
            <p className="text-sm font-bold">
              <img
                className="inline mr-1"
                src="/images/svg/icon-price.svg"
                alt=""
              />
              1.010
            </p>
            <p className="text-sm font-bold">
              ~<strong style={{ color: "#40D04F" }}>Rp</strong> 1.125.998
            </p>
          </div>
        </div> */}
        {/* /NEW PRICE */}
        <div
          className="price-wrap mt-3"
          style={{ borderTop: "1px solid #2A334B" }}
        >
          <div className="price flex items-center justify-between mt-2">
            <p className="title font-semibold text-sm">Price</p>
            <p className="font-semibold text-sm">{props?.data?.price} VCG</p>
          </div>
        </div>
        <div className="btn-wrap mt-3">
          {props?.account ? (
            props?.account == props?.project?.owner ? (
              <button
                className={
                  new Date() < new Date(props.project.startedAt)
                    ? "btn btn-disabled w-full"
                    : props?.data?.finalize
                    ? "btn btn-disabled w-full"
                    : "btn btn-orange-light w-full"
                }
                disabled={
                  new Date() < new Date(props.project.startedAt)
                    ? true
                    : props?.data?.finalize
                    ? true
                    : false
                }
                onClick={() => {
                  dispatch(
                    toggleModalConfirmation(dataModal.modalConfirmation)
                  );
                  props.action({
                    type: "finalize",
                    name: props.name,
                  });
                }}
              >
                Finalize
              </button>
            ) : props?.data?.finalize ? (
              <div className="wrap-input flex-1">
                <input
                  type="text"
                  className="w-full mb-3"
                  style={{ padding: "8px 12px" }}
                  placeholder="Insert Amount"
                  onChange={(e) => {
                    if (!/[0-9]/i.test(e.nativeEvent.data))
                      e.target.value = e.target.value.slice(0, -1);
                    if (e.target.value <= 0) e.target.value = "";
                    if (e.target.value > props?.owned)
                      e.target.value = props?.owned;
                    setAmount(e.target.value);
                  }}
                />
                <button
                  className={
                    amount < 1
                      ? "btn btn-disabled w-full"
                      : "btn btn-orange-light w-full"
                  }
                  disabled={amount < 1 ? true : false}
                  onClick={() => {
                    dispatch(
                      toggleModalConfirmation(dataModal.modalConfirmation)
                    );
                    props.action({
                      type: "claim",
                      name: props.name,
                      amount,
                    });
                  }}
                >
                  Claim
                </button>
              </div>
            ) : (
              <div className="wrap-input flex-1">
                <input
                  type="text"
                  className="w-full mb-3"
                  style={{ padding: "8px 12px" }}
                  placeholder="Insert Amount"
                  onChange={(e) => {
                    if (!/[0-9]/i.test(e.nativeEvent.data))
                      e.target.value = e.target.value.slice(0, -1);
                    if (e.target.value <= 0) e.target.value = "";
                    if (e.target.value > props?.data?.stock - props?.data?.sold)
                      e.target.value = props?.data?.stock - props?.data?.sold;
                    setAmount(e.target.value);
                  }}
                />
                <button
                  className={
                    new Date() < new Date(props.project.startedAt)
                      ? "btn btn-disabled w-full"
                      : !props?.data?.sell
                      ? "btn btn-disabled w-full"
                      : amount < 1
                      ? "btn btn-disabled w-full"
                      : props?.data?.sold == props?.data?.stock
                      ? "btn btn-disabled w-full"
                      : "btn btn-orange-light w-full"
                  }
                  disabled={
                    new Date() < new Date(props.project.startedAt)
                      ? true
                      : !props?.data?.sell
                      ? true
                      : amount < 1
                      ? true
                      : props?.data?.sold == props?.data?.stock
                      ? true
                      : false
                  }
                  onClick={() => {
                    dispatch(
                      toggleModalConfirmation(dataModal.modalConfirmation)
                    );
                    props.action({
                      type: "buy",
                      name: props.name,
                      amount,
                      price: props.data.price,
                    });
                  }}
                >
                  {props?.data?.sell ? "Buy" : "Coming Soon"}
                </button>
              </div>
            )
          ) : (
            <Link href="/connect-wallet">
              <a>
                <button className={"btn btn-orange-light w-full"}>
                  Connect Wallet
                </button>
              </a>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
