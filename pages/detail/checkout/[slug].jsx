import Link from "next/link";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CheckoutWeb from "../../../components/Checkout/CheckoutWeb";
import DialogSelectPayment from "../../../components/Common/DialogSelectPayment";
import DialogConfirm from "../../../components/Common/DialogConfirm";
import NavbarMobileWithBack from "../../../components/NavbarMobileWithBack";
import {
  toggleModalConfirm,
  toggleModalConfirmation,
  toggleModalConfirmPrivacyPolicy,
  toggleModalSelectPayment,
  toggleModalSendOTP,
} from "../../../redux/modalReducer";
import DialogConfirmPrivacyPolicy from "../../../components/Common/DialogConfirmPrivacyPolicy";
import DialogSendOTP from "../../../components/Common/DialogSendOTP";
import { useRouter } from "next/router";
import CheckoutMobile from "../../../components/Checkout/CheckoutMobile";
import axios from "axios";
import { API, CHAIN_ID } from "../../../utils/globalConstant";
import { useState } from "react";
import DialogConfirmation from "../../../components/Common/DialogConfirmation";
import { vcgEnableToken } from "../../../utils/contractConfig";
import { ethers } from "ethers";
import abiLaunchpad from "../../../abi/launchpad.json";
import useMetaMask from "../../../wallet/hook";
import { hashCode } from "../../../utils/globalFunction";
import cookeieParser from "cookieparser";

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

const modalConfirmation = {
  loading: false,
  isOpen: true,
  isPlain: true,
  isSuccess: false,
  isFailed: false,
  title: {
    en: "Confirmation",
  },
};

const modalConfirmationWhenFailed = {
  loading: false,
  isOpen: true,
  isPlain: false,
  isSuccess: false,
  isFailed: true,
  title: {
    en: "Confirmation",
  },
};

const modalConfirmationWhenSuccess = {
  loading: false,
  isOpen: true,
  isPlain: false,
  isSuccess: true,
  isFailed: false,
  title: {
    en: "Confirmation",
  },
};

export default function Checkout(props) {
  console.log("???>>>", props);
  const modal = useSelector((state) => state.modal);
  const dispatch = useDispatch();
  const router = useRouter();
  const { account, chainId, signer, connectContract } = useMetaMask();

  const [isLoading, setIsLoading] = useState(false);
  const [project, setProject] = useState({});
  const [boxItem, setBoxItem] = useState({});
  const [amount, setAmount] = useState(1);
  const [listPayment, setListPayment] = useState("");
  const [selectedPayment, setSelectedPayment] = useState("");
  const [typePayment, setTypePayment] = useState("");

  const [dataModal, setDataModal] = useState({});
  const [modalMessage, setModalMessage] = useState({});

  function handleContinue(val) {
    modalconfirm.isOpen = false;
    modalconfirmPrivacyPolicy.isOpen = true;

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

  function handleShowSelectPaymentMethod(val) {
    modalSelectPayment.isOpen = true;
    dispatch(toggleModalSelectPayment(modalSelectPayment));
    // if (account) {
    //   modalSelectPayment.isOpen = true;
    //   dispatch(toggleModalSelectPayment(modalSelectPayment));
    // } else {
    //   router.push("/connect-wallet");
    // }
  }

  const getDetailProject = (id, name) => {
    setIsLoading(true);
    try {
      axios
        .get(API.launchpad.local + API.launchpad.project.detail, {
          params: { id },
        })
        .then((res) => {
          if (res.status === 204) return;
          const value = res.data.data.boxes[name];
          value.name = name;
          // console.log("RES", res.data.data);
          // console.log("Val", value);
          setProject(res.data.data);
          setBoxItem({ ...value });
          setTimeout(() => {
            setIsLoading(false);
          }, 1000);
        });
    } catch (error) {
      console.log("getDetailProject err->", error);
    }
  };

  function handleSelectPayment(payment, typePayment) {
    console.log(payment);
    // setSelectedPayment({
    //   payment_method_name: payment.payment_method_name,
    //   payment_method_image: payment.payment_method_image,
    //   payment_fee: payment.payment_fee_text,
    // });
    setTypePayment(typePayment);
    setSelectedPayment(payment);
    modalSelectPayment.isOpen = false;
    dispatch(toggleModalSelectPayment({ ...modalSelectPayment }));
  }

  function handleBuyFiat() {
    let total = router.query.price * router.query.qty;
    const code = hashCode(
      "desktop",
      selectedPayment.payment_method_id,
      (Math.round(total * 100) / 100).toFixed(2)
    );

    console.log("??", code, ">>", selectedPayment.payment_method_id);
    // setTimeout(() => {
    //   router.push(
    //     `/detail/transaction/${code}?paymentType=${selectedPayment.payment_method_id}`
    //   );
    // }, 1500);
    router.replace(
      `/detail/checkout/${router.query.slug}?name=${router.query.name}&price=${boxItem.price}&qty=${amount}&hash=${code}-${selectedPayment.payment_method_id}`
    );
  }

  function handleBuyCrypto(data) {
    modalMessage.type = "Buy";
    modalMessage.amount = data.amount;
    modalMessage.message = "buy this box?";
    modalMessage.successMessage = "You have successfully bought this box";
    modalMessage.failedMessage = "Failed to buy this box";
    setModalMessage({ ...modalMessage });

    for (const key in data) {
      dataModal[key] = data[key];
    }
    setDataModal({ ...dataModal });

    modalConfirmation.isOpen = true;
    dispatch(toggleModalConfirmation(modalConfirmation));
  }

  const actionModal = () => {
    //ACTION HANYA BUY
    checkAllowance(dataModal.name, dataModal.amount, dataModal.price);
  };

  const checkAllowance = async (box, amount, price) => {
    console.log(box, amount, price);
    try {
      if (chainId != CHAIN_ID) {
        dispatch(toggleModalConfirmation(modalConfirmationWhenFailed));
        return;
      }
      // GET token currency contract
      const tokenContract = connectContract(
        vcgEnableToken.address,
        vcgEnableToken.abi
      );

      // Check allowance of token currency
      const getAllowance = await tokenContract
        .connect(signer)
        .allowance(account, project.address);

      const allowance = Number(ethers.utils.formatEther(getAllowance));
      if (allowance > Number(price) * amount) buyBox(box, amount);
      else setAllowance(box, amount);
    } catch (error) {
      console.log("checkAllowance err->", error);
    }
  };

  const setAllowance = async (box, amount) => {
    try {
      const tokenContract = connectContract(
        vcgEnableToken.address,
        vcgEnableToken.abi
      );

      const totalSupply = await tokenContract.connect(signer).totalSupply();
      const tx = await tokenContract
        .connect(signer)
        .approve(project.address, totalSupply);

      tx.wait().then((res) => {
        if (res.status == 1) buyBox(box, amount);
      });
    } catch (error) {
      console.log(error);
      dispatch(toggleModalConfirmation(modalConfirmationWhenFailed));
    }
  };

  const buyBox = async (box, amount) => {
    try {
      let historyId = "";
      const boxIds = Object.keys(project.boxes);
      const boxId = boxIds.indexOf(box) + 1;

      const launchpadContract = connectContract(project.address, abiLaunchpad);

      const buy = await launchpadContract
        .connect(signer)
        .buyBox(boxId, amount, vcgEnableToken.address);

      buy.hash;
      buy
        .wait()
        .then(async (res) => {
          if (res.status == 1) {
            axios
              .post(API.launchpad.local + API.launchpad.project.buy, {
                id: project._id,
                box,
                amount: Number(amount),
                price: project.boxes[box].price * Number(amount),
              })
              .then((res) => {
                if (res.status === 204) return;
                // setProject(res.data.data);
              });
            axios.post(API.launchpad.local + API.launchpad.item.buy, {
              owner: account,
              itemName: box,
              amount: Number(amount),
              image: project.boxes[box].image,
              projectName: project.name,
              projectDetail: project._id,
            });
            axios
              .post(API.launchpad.local + API.launchpad.history.add, {
                name: box,
                image: project.boxes[box].image,
                amount: Number(amount),
                price: project.boxes[box].price * Number(amount),
                action: 0,
                owner: account,
                txHash: res.transactionHash,
                projectName: project.name,
                projectDetail: project._id,
              })
              .then((res) => {
                if (res.status === 204) return;
                historyId = res.data.data.addedHistory._id;
              });
          }
        })
        .finally(() => {
          modalConfirmationWhenSuccess.loading = false;
          modalConfirmationWhenSuccess.isOpen = false;
          dispatch(toggleModalConfirmation(modalConfirmationWhenSuccess));
          setTimeout(() => {
            router.push(
              `/detail/transaction/${historyId}?isPaymentSuccess=true&paymentType=crypto`
            );
          }, 1500);
        });
    } catch (error) {
      console.log(error);
      dispatch(toggleModalConfirmation(modalConfirmationWhenFailed));
    }
  };

  function launch_toast(isError, msg) {
    let x = document.getElementById("toast");
    let text = document.getElementById("toast-text");

    x.style.top = "30px";

    if (isError) {
      x.className = "show failed";
    } else {
      x.className = "show success";
    }

    text.innerHTML = msg;

    setTimeout(function () {
      x.className = x.className.replace("show", "");
      setTimeout(() => {
        text.innerHTML = "";
      }, 1000);
    }, 3000);
  }

  useEffect(() => {
    if (router.query && boxItem.price) {
      let name = router.query.name?.replace("-", " ");
      // getListPayment(name);
      router.replace(
        `/detail/checkout/${router.query.slug}?name=${router.query.name}&price=${boxItem.price}&qty=${amount}`
      );
    }
  }, [amount, boxItem.price]);

  useEffect(() => {
    if (router.query) {
      let name = router.query.name?.replace("-", " ");
      getDetailProject(router.query.slug, name);
    }
  }, [router.query]);

  useEffect(() => {
    if (props.paymentList) {
      setListPayment(props.paymentList);
    }
  }, [props.paymentList]);

  useEffect(() => {
    if (props.transaction) {
      console.log("TRX", props.transaction);
      if (props.transaction.status) {
        localStorage.setItem(
          "detailTRX",
          JSON.stringify(props.transaction.data)
        );
        router.push(
          `/detail/transaction/${router.query.slug}?paymentType=fiat`
        );
      } else {
        launch_toast(true, props.transaction.message);
      }
    }
  }, [props.transaction]);

  return (
    <>
      <NavbarMobileWithBack title="Checkout" />

      {!isLoading ? (
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
              <Link href={`/detail/${project._id}`}>
                <a className="flex items-center">
                  <p className="mx-3 text-sm font-semibold">{project.name}</p>
                </a>
              </Link>
              <img src="/images/svg/arrow-gray.svg" alt="" />
              <p className="ml-3 text-sm font-bold text-color-primary">
                Checkout
              </p>
            </div>

            <CheckoutWeb
              account={account}
              project={project}
              boxItem={boxItem}
              amount={amount}
              setAmount={setAmount}
              dispatch={dispatch}
              toggleModalSelectPayment={toggleModalSelectPayment}
              toggleModalConfirm={toggleModalConfirm}
              modalSelectPayment={modalSelectPayment}
              modalconfirm={modalconfirm}
              selectedPayment={selectedPayment}
              typePayment={typePayment}
              handleBuyCrypto={handleBuyCrypto}
              handleShowSelectPaymentMethod={handleShowSelectPaymentMethod}
              handleBuyFiat={handleBuyFiat}
            />

            <CheckoutMobile
              account={account}
              project={project}
              boxItem={boxItem}
              amount={amount}
              setAmount={setAmount}
              dispatch={dispatch}
              toggleModalSelectPayment={toggleModalSelectPayment}
              toggleModalConfirm={toggleModalConfirm}
              modalSelectPayment={modalSelectPayment}
              modalconfirm={modalconfirm}
              selectedPayment={selectedPayment}
              typePayment={typePayment}
              handleBuyCrypto={handleBuyCrypto}
              handleShowSelectPaymentMethod={handleShowSelectPaymentMethod}
            />
          </div>

          {modal.modalSelectPayment.isOpen && (
            <DialogSelectPayment
              listPayment={listPayment}
              handleSelectPayment={handleSelectPayment}
            />
          )}
          {modal.modalconfirm.isOpen && (
            <DialogConfirm onContinue={handleContinue} />
          )}
          {modal.modalconfirmPrivacyPolicy.isOpen && (
            <DialogConfirmPrivacyPolicy onConfirm={handleConfirm} />
          )}
          {modal.modalSendOTP.isOpen && (
            <DialogSendOTP onVerification={handleVerification} />
          )}
          {modal.modalConfirmation.isOpen && (
            <DialogConfirmation
              type={modalMessage.type}
              amount={modalMessage.amount}
              message={modalMessage.message}
              successMessage={modalMessage.successMessage}
              failedMessage={modalMessage.failedMessage}
              action={actionModal}
            />
          )}
        </div>
      ) : (
        <div className="global-container">
          <div className="container mx-auto md:p-0">
            <img
              width={200}
              height={200}
              src="/loaders/loaders.gif"
              className="m-auto"
              alt=""
            />
          </div>
        </div>
      )}
    </>
  );
}

export async function getServerSideProps({
  query: { name, price, qty, hash },
  ...ctx
}) {
  const tokenAuth = ctx.req.headers.cookie
    ? cookeieParser.parse(ctx.req.headers.cookie).VcgAuth
    : null;

  let data = {
    t: "desktop",
    token: name.replace("-", " "),
    price: price,
    qty: qty,
  };

  let transaction = null;

  const res = await axios
    .post(API.marketplaceV2 + "api/marketplace/fiatpayment?t=desktop", data, {
      headers: {
        common: {
          Authorization: tokenAuth ? tokenAuth : ctx.req.cookies.tokenVcg,
        },
      },
    })
    .then((res) => {
      // console.log("??then>>>", res);
      if (res.data.status) {
        // console.log("??then", res.data.data);
        // paymentList = res.data.data;
        return res.data.data;
      }
    })
    .catch((error) => {
      console.log("??cat>>", error);
      return null;
    });

  if (hash) {
    let hasharams = hash.split("-");
    let dataTRX = {
      id: hasharams[1],
      pin: "",
      type: "desktop",
      token: hasharams[0],
      phone: "",
    };

    transaction = await axios
      .post(
        API.marketplaceV2 + "api/marketplace/fiatpayment/payprocessnew",
        dataTRX,
        {
          headers: {
            common: {
              Authorization: tokenAuth ? tokenAuth : ctx.req.cookies.tokenVcg,
            },
          },
        }
      )
      .then((res) => {
        console.log("??then>>>", res.data);
        if (res.data.status) {
          return res.data;
        } else {
          return { status: false, message: "Transaksi Gagal" };
        }
      })
      .catch((error) => {
        // console.log("??cat>>", error.response.data);
        return error.response.data;
      });
  }

  return {
    props: {
      paymentList: res,
      transaction: transaction ? transaction : null,
    },
  };
}
