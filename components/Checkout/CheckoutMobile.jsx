import Link from "next/link";
import React from "react";
import { FaChevronRight } from "react-icons/fa";

export default function CheckoutMobile(props) {
  function handleTotalPayment() {
    // console.log(
    //   typeof props.boxItem.price,
    //   typeof props.amount,
    //   typeof props.selectedPayment.payment_fee
    // );
    // console.log(
    //   parseInt(props.boxItem.price) * parseInt(props.amount) +
    //     parseInt(props.selectedPayment.payment_fee)
    // );
    if (props.typePayment == "fiat") {
      return "-";
    } else if (props.typePayment == "crypto") {
      let total = "-";
      if (props.boxItem.price && props.amount) {
        total = parseInt(props.boxItem.price) * parseInt(props.amount);
      }
      return total;
    } else {
      return "-";
    }
  }

  return (
    <div className="hidden md:block">
      <div className="card-dark" style={{ borderRadius: "0" }}>
        <p className="text-sm font-bold py-3">Your Order</p>
        <div
          className="p-4"
          style={{
            borderTop: "solid 1px #2A334B",
            borderBottom: "solid 1px #2A334B",
          }}
        >
          <div className="flex justify-between items-center">
            <p className="text-sm font-bold">{props.boxItem.name}</p>
            {/* <p className="text-sm font-bold">
              $1.010 / <strong className="text-color-light-green">Rp</strong>
              1.133.010
            </p> */}
            <p className="text-sm font-bold">{props.boxItem.price} VCG</p>
          </div>
          <p className="text-sm font-bold text-color-light-green">
            {props.project.name}
          </p>
          <div className="flex justify-between items-center mt-3">
            <p className="text-sm font-bold">Quantity</p>
            <div className="wrap-input input-qty border-dark type-green">
              <button
                onClick={() => {
                  let amnt = props.amount;
                  amnt -= 1;
                  props.setAmount(amnt == 0 ? "" : amnt);
                }}
                disabled={props.amount == 0}
              >
                -
              </button>
              <input
                type="number"
                min={0}
                value={props.amount}
                placeholder="0"
                onChange={(e) => {
                  const val = e.target.value.replace(/[^0-9]/g, "");
                  if (e.target.value) {
                    if (e.target.value === "0") {
                      e.target.value = "";
                    } else if (
                      e.target.value >=
                      props.boxItem.stock - props.boxItem.sold
                    ) {
                      e.target.value = props.boxItem.stock - props.boxItem.sold;
                    } else {
                      e.target.value = val;
                    }
                  }
                  props.setAmount(e.target.value);
                }}
              />
              <button
                onClick={() => {
                  let amnt = props.amount;
                  if (!amnt) {
                    amnt = 0;
                  }
                  let val = parseInt(amnt) + 1;
                  props.setAmount(val);
                }}
                disabled={
                  props.amount >= props.boxItem.stock - props.boxItem.sold
                }
              >
                +
              </button>
            </div>
          </div>
        </div>
        <div>
          <p className="text-sm font-bold py-4">Payment Method</p>
          <div
            className="input-payment"
            onClick={() => {
              // props.modalSelectPayment.isOpen = true;
              // props.dispatch(
              //   props.toggleModalSelectPayment(props.modalSelectPayment)
              // );
              props.handleShowSelectPaymentMethod();
            }}
          >
            {props.selectedPayment ? (
              <>
                <img
                  style={{
                    width: "43px",
                    height: "43px",
                    borderRadius: "10px",
                    objectFit: "contain",
                    marginRight: "10px",
                  }}
                  src={
                    props.selectedPayment.payment_method_image
                      ? props.selectedPayment.payment_method_image
                      : "/images/Broken-Image.png"
                  }
                  onError={({ currentTarget }) => {
                    currentTarget.onerror = null; // prevents looping
                    currentTarget.src = "/images/Broken-Image.png";
                  }}
                  alt=""
                />
                <p>{props.selectedPayment.payment_method_name}</p>
              </>
            ) : (
              <>
                <img src="/images/svg/card-payment.svg" alt="" />
                <p>Select Payment Method</p>
              </>
            )}
            <FaChevronRight className="ml-auto" />
          </div>
        </div>
      </div>
      <div className="card-dark mt-3" style={{ borderRadius: "0" }}>
        <p className="text-sm font-bold">Summary Transaction</p>
        <div className="pb-1">
          <div
            className="flex justify-between items-center mt-3 pb-2"
            style={{ borderBottom: "solid 1px #2A334B" }}
          >
            <p className="text-sm font-semibold text-color-grey">Total Order</p>
            <p className="text-sm font-semibold text-color-grey">
              {props.boxItem.price * props.amount}
            </p>
          </div>
          {props.typePayment == "fiat" && (
            <div
              className="flex justify-between items-center mt-2 pb-2"
              // style={{ borderBottom: "solid 1px #2A334B" }}
            >
              <p className="text-sm font-semibold text-color-grey">
                Admin fee{" "}
                {`for ${
                  props.selectedPayment
                    ? props.selectedPayment.payment_method_name
                    : ""
                }`}
              </p>
              <p className="text-sm font-semibold text-color-grey">
                {props.selectedPayment
                  ? props.selectedPayment.payment_fee_text
                    ? props.selectedPayment.payment_fee_text
                    : "-"
                  : "-"}
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="bottom-action">
        <div className="grid grid-cols-2 gap-2">
          <div>
            <p className="text-sm font-semibold text-color-grey">
              Total Payment
            </p>
            <p className="text-sm font-semibold text-color-light-green">
              {handleTotalPayment()}
            </p>
          </div>
          {props.typePayment == "fiat" && (
            <button
              className="btn btn-light-green text-sm font-semibold w-full"
              style={{ padding: "10px" }}
              onClick={() => {
                props.modalconfirm.isOpen = true;
                props.dispatch(props.toggleModalConfirm(props.modalconfirm));
              }}
              disabled
            >
              Pay Now
            </button>
          )}
          {props.typePayment == "crypto" &&
            (props.account ? (
              <button
                className="btn btn-light-green text-sm font-semibold w-full"
                style={{ padding: "10px" }}
                onClick={() => {
                  props.handleBuyCrypto({
                    name: props.boxItem.name,
                    amount: props.amount,
                    price: props.boxItem.price,
                  });
                }}
                disabled={!props.amount || !props.boxItem.price}
              >
                Pay Now
              </button>
            ) : (
              <Link href="/connect-wallet">
                <a>
                  <button
                    className="btn btn-light-green text-sm font-semibold w-full"
                    style={{ padding: "10px" }}
                  >
                    Connect Wallet
                  </button>
                </a>
              </Link>
            ))}
          {props.typePayment == "" && (
            <button
              className="btn btn-light-green text-sm font-semibold w-full"
              style={{ padding: "10px" }}
              disabled
            >
              Pay Now
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
