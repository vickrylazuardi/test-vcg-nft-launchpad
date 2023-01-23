import React from "react";
import { FaChevronRight } from "react-icons/fa";

export default function CheckoutWeb(props) {
  return (
    <div className="block md:hidden">
      <div className="flex mt-10 gap-5">
        <div className="w-4/6">
          <div className="card-dark">
            <p className="font-bold py-3">Your Order</p>
            <div
              className="p-4"
              style={{
                borderTop: "solid 1px #2A334B",
                borderBottom: "solid 1px #2A334B",
              }}
            >
              <div className="flex justify-between items-center">
                <p className="text-sm font-bold">Small Box</p>
                <p className="text-sm font-bold">
                  $1.010 /{" "}
                  <strong className="text-color-light-green">Rp</strong>
                  1.133.010
                </p>
              </div>
              <p className="text-sm font-bold text-color-light-green">
                Cross out
              </p>
              <div className="flex justify-between items-center mt-3">
                <p className="text-sm font-bold">Quantity</p>
                <div className="wrap-input input-qty border-dark type-green">
                  <button
                  // onClick={() => {
                  //   item.supply -= 1;
                  //   props.setList({ ...props.list });
                  // }}
                  // disabled={item.supply == 0}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    min={0}
                    // value={item.supply}
                    placeholder="0"
                    // onChange={(e) => {
                    //   const val = e.target.value.replace(/[^0-9]/g, "");
                    //   if (e.target.value) {
                    //     if (e.target.value === "0") {
                    //       e.target.value = "";
                    //     } else {
                    //       e.target.value = val;
                    //     }
                    //   }
                    //   item.supply = e.target.value;
                    //   props.setList({ ...props.list });
                    // }}
                  />
                  <button
                  // onClick={() => {
                  //   if (!item.supply) {
                  //     item.supply = 0;
                  //   }

                  //   let val = parseInt(item.supply) + 1;
                  //   item.supply = val;
                  //   props.setList({ ...props.list });
                  // }}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-2/6">
          <div className="card-dark">
            <p className="font-bold">Summary Transaction</p>
            <div
              className="input-payment mt-5"
              onClick={() =>
                props.dispatch(
                  props.toggleModalSelectPayment(props.modalSelectPayment)
                )
              }
            >
              <img src="/images/svg/card-payment.svg" alt="" />
              <p>Select Payment Method</p>
              <FaChevronRight className="ml-auto" />
            </div>
            <div
              className="flex justify-between items-center mt-5 pb-1"
              style={{ borderBottom: "solid 1px #2A334B" }}
            >
              <p className="text-sm font-semibold text-color-grey">
                Total Order
              </p>
              <p className="text-sm font-semibold text-color-grey">-</p>
            </div>
            <div style={{ borderBottom: "solid 1px #2A334B" }} className="pb-1">
              <div className="flex justify-between items-center mt-3">
                <p className="text-sm font-semibold text-color-grey">
                  Admin fee for Bank Mandiri VA
                </p>
                <p className="text-sm font-semibold text-color-grey">-</p>
              </div>
              <div className="flex justify-between items-center mt-2">
                <p className="text-sm font-semibold text-color-grey">
                  Total Payment
                </p>
                <p className="text-sm font-semibold text-color-grey">-</p>
              </div>
            </div>
            <button
              className="btn btn-light-green text-sm font-semibold mt-5 w-full"
              style={{ padding: "10px" }}
              onClick={() => {
                props.modalconfirm.isOpen = true;
                props.dispatch(props.toggleModalConfirm(props.modalconfirm));
              }}
            >
              Pay Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
