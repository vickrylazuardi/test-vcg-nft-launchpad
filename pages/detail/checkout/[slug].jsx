import Link from "next/link";
import React from "react";
import { FaChevronRight } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import CheckoutWeb from "../../../components/Checkout/CheckoutWeb";
import DialogSelectPayment from "../../../components/Common/DialogSelectPayment";
import DialogConfirm from "../../../components/Common/DialogConfirm";
import NavbarMobileWithBack from "../../../components/NavbarMobileWithBack";
import {
  toggleModalConfirm,
  toggleModalConfirmPrivacyPolicy,
  toggleModalSelectPayment,
  toggleModalSendOTP,
} from "../../../redux/modalReducer";
import DialogConfirmPrivacyPolicy from "../../../components/Common/DialogConfirmPrivacyPolicy";
import DialogSendOTP from "../../../components/Common/DialogSendOTP";
import { useRouter } from "next/router";
import CheckoutMobile from "../../../components/Checkout/CheckoutMobile";

const modalSelectPayment = {
  loading: false,
  isOpen: true,
  title: {
    en: "Choose Payment Method",
  },
};

const modalconfirm = {
  loading: false,
  isOpen: true,
  title: {
    en: "Purchase Confirmation",
  },
  text: {
    en: "A wallet is required to purchase Launchpad. VCGamers will generate a wallet address for you automatically. This wallet only stores purchase information.",
  },
};

const modalconfirmPrivacyPolicy = {
  loading: false,
  isOpen: true,
  title: {
    en: "Privacy Policy",
  },
  text: {
    en: `<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi consequat faucibus vehicula. Aenean iaculis magna nec nunc placerat egestas. Integer malesuada sapien non semper venenatis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Mauris id urna finibus, eleifend nisl quis, interdum lacus. Donec vel accumsan erat. Aenean egestas, nunc hendrerit pulvinar pellentesque, orci tellus vulputate urna, sed sodales purus orci vel augue. Integer diam urna, imperdiet nec leo non, faucibus ultricies ex. Sed vel maximus ligula. Integer posuere eros non nibh ullamcorper pharetra.</p>
    <p>In tristique interdum tortor non auctor. Vestibulum nibh massa, interdum iaculis nisi vitae, sodales accumsan erat. Morbi ut leo turpis. Etiam ut augue suscipit, auctor libero nec, mollis nisl. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Cras vel mattis lacus. Phasellus erat lectus, maximus et nisi et, cursus pretium lectus. Ut ligula sapien, i</p>
    <p><br></p>
    <p>nterdum sit amet ornare sed, consectetur eu massa. Suspendisse viverra sagittis urna sit amet eleifend. Phasellus id feugiat ante. Curabitur id sollicitudin lectus. Maecenas purus urna, ornare eget semper ut, condimentum ut lectus. Nulla arcu risus, aliquam eget maximus sit amet, rutrum eu tellus. Sed vitae urna ac turpis tempus posuere. Nulla id justo ut tellus lacinia rhoncus nec nec sapien. Morbi faucibus metus aliquam convallis placerat</p>
    <p><br></p>
    <p>Etiam suscipit convallis lorem, hendrerit tristique justo consectetur sed. Integer vestibulum turpis odio, sodales porttitor elit sodales vel. Maecenas tempor dictum fermentum. Aliquam non sapien vitae felis suscipit hendrerit at id est. Pellentesque eu placerat diam. Proin bibendum dolor volutpat augue aliquet bibendum. Suspendisse viverra magna diam, quis placerat tellus aliquam ac. Curabitur mattis est nisi, ac malesuada erat auctor vitae. Etiam euismod condimentum massa, et mollis nunc. Vivamus imperdiet, nunc ut aliquam sagittis, purus metus tempor turpis, non molestie libero nisi sit amet erat. Morbi non eleifend ante.</p>
    <p><br></p>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi consequat faucibus vehicula. Aenean iaculis magna nec nunc placerat egestas. Integer malesuada sapien non semper venenatis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Mauris id urna finibus, eleifend nisl quis, interdum lacus. Donec vel accumsan erat. Aenean egestas, nunc hendrerit pulvinar pellentesque, orci tellus vulputate urna, sed sodales purus orci vel augue. Integer diam urna, imperdiet nec leo non, faucibus ultricies ex. Sed vel maximus ligula. Integer posuere eros non nibh ullamcorper pharetra.</p>
    <p>In tristique interdum tortor non auctor. Vestibulum nibh massa, interdum iaculis nisi vitae, sodales accumsan erat. Morbi ut leo turpis. Etiam ut augue suscipit, auctor libero nec, mollis nisl. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Cras vel mattis lacus. Phasellus erat lectus, maximus et nisi et, cursus pretium lectus. Ut ligula sapien, i</p>
    <p><br></p>
    <p>nterdum sit amet ornare sed, consectetur eu massa. Suspendisse viverra sagittis urna sit amet eleifend. Phasellus id feugiat ante. Curabitur id sollicitudin lectus. Maecenas purus urna, ornare eget semper ut, condimentum ut lectus. Nulla arcu risus, aliquam eget maximus sit amet, rutrum eu tellus. Sed vitae urna ac turpis tempus posuere. Nulla id justo ut tellus lacinia rhoncus nec nec sapien. Morbi faucibus metus aliquam convallis placerat</p>
    <p><br></p>
    <p>Etiam suscipit convallis lorem, hendrerit tristique justo consectetur sed. Integer vestibulum turpis odio, sodales porttitor elit sodales vel. Maecenas tempor dictum fermentum. Aliquam non sapien vitae felis suscipit hendrerit at id est. Pellentesque eu placerat diam. Proin bibendum dolor volutpat augue aliquet bibendum. Suspendisse viverra magna diam, quis placerat tellus aliquam ac. Curabitur mattis est nisi, ac malesuada erat auctor vitae. Etiam euismod condimentum massa, et mollis nunc. Vivamus imperdiet, nunc ut aliquam sagittis, purus metus tempor turpis, non molestie libero nisi sit amet erat. Morbi non eleifend ante.</p>`,
  },
};

const modalSendOTP = {
  loading: false,
  isOpen: true,
  title: {
    en: "OTP Verification",
  },
};

export default function Checkout(props) {
  const modal = useSelector((state) => state.modal);
  const dispatch = useDispatch();
  const router = useRouter();

  function handleContinue(val) {
    modalconfirm.isOpen = false;
    modalconfirmPrivacyPolicy.isOpen = true;
    console.log("//",modalconfirmPrivacyPolicy);

    dispatch(toggleModalConfirm(modalconfirm));
    dispatch(toggleModalConfirmPrivacyPolicy(modalconfirmPrivacyPolicy));
  }

  function handleConfirm(val) {
    modalconfirmPrivacyPolicy.isOpen = false;
    modalSendOTP.isOpen = true;

    dispatch(toggleModalConfirmPrivacyPolicy(modalconfirmPrivacyPolicy));
    dispatch(toggleModalSendOTP(modalSendOTP));
  }

  function handleVerification(val) {
    modalSendOTP.isOpen = false;

    dispatch(toggleModalSendOTP(modalSendOTP));
    router.push(`/detail/transaction/63c4fc3d4ed10026b249e8c7`);
  }

  return (
    <>
      <NavbarMobileWithBack title="Checkout" />

      <div className="global-container">
        <div className="container mx-auto md:p-0">
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
            toggleModalConfirm={toggleModalConfirm}
            modalSelectPayment={modalSelectPayment}
            modalconfirm={modalconfirm}
          />

          <CheckoutMobile
            dispatch={dispatch}
            toggleModalSelectPayment={toggleModalSelectPayment}
            toggleModalConfirm={toggleModalConfirm}
            modalSelectPayment={modalSelectPayment}
            modalconfirm={modalconfirm}
          />
        </div>

        {modal.modalSelectPayment.isOpen && <DialogSelectPayment />}
        {modal.modalconfirm.isOpen && (
          <DialogConfirm onContinue={handleContinue} />
        )}
        {modal.modalconfirmPrivacyPolicy.isOpen && (
          <DialogConfirmPrivacyPolicy onConfirm={handleConfirm} />
        )}
        {modal.modalSendOTP.isOpen && (
          <DialogSendOTP onVerification={handleVerification} />
        )}
      </div>
    </>
  );
}
