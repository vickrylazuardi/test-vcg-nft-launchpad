import Link from "next/link";
import React from "react";
import { FaChevronRight } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import CheckoutWeb from "../../../components/Checkout/CheckoutWeb";
import DialogSelectPayment from "../../../components/Common/DialogSelectPayment";
import NavbarMobileWithBack from "../../../components/NavbarMobileWithBack";
import { toggleModalSelectPayment } from "../../../redux/modalReducer";

const modalSelectPayment = {
  loading: false,
  isOpen: true,
  title: {
    en: "Choose Payment Method",
  },
};

export default function Checkout(props) {
  const modal = useSelector((state) => state.modal);
  const dispatch = useDispatch();

  return (
    <>
      <NavbarMobileWithBack title="Checkout" />

      <div className="global-container">
        <div className="container mx-auto">
          <div className="navigation-container flex items-center">
            <Link href="/">
              <a className="flex items-center">
                <img src="/images/icon-home.png" alt="" />
                <p className="mx-3 text-sm font-semibold">Launchpad</p>
              </a>
            </Link>
            <img src="/images/svg/arrow-gray.svg" alt="" />
            <Link href="/">
              <a className="flex items-center">
                <p className="mx-3 text-sm font-semibold">detail project</p>
              </a>
            </Link>
            <img src="/images/svg/arrow-gray.svg" alt="" />
            <p className="ml-3 text-sm font-bold text-color-primary">
              Checkout
            </p>
          </div>

          <CheckoutWeb
            dispatch={dispatch}
            toggleModalSelectPayment={toggleModalSelectPayment}
            modalSelectPayment={modalSelectPayment}
          />

          <div className="hidden md:block">

          </div>
        </div>

        {modal.modalSelectPayment.isOpen && <DialogSelectPayment />}
      </div>
    </>
  );
}
