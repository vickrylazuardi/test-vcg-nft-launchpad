import { useDispatch } from "react-redux";
import { toggleModalTransaction } from "../../redux/modalReducer";
const { motion } = require("framer-motion");

export default function DialogDetailTransaction(props) {
  const dispatch = useDispatch();
  const modalDetailTransaction = {
    loading: false,
    isOpen: false,
    title: {
      en: "Photo Box",
    },
  };
  const backdrop = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 },
  };
  const animateModal = {
    hidden: {
      y: "-100vh",
      opacity: 0,
    },
    visible: {
      y: "40px",
      opacity: 1,
      transition: { delay: 0.5 },
    },
  };
  return (
    <motion.div
      id="dialog-detail-transaction-overlay"
      variants={backdrop}
      initial="hidden"
      animate="visible"
      exit="hidden"
    >
      <motion.div
        className="dialog-detail-transaction rounded-xl"
        variants={animateModal}
      >
        <div className="dialog-detail-transaction-head px-4 py-4">
          <div className="dih-left">Detail Transaction</div>
          <div className="dih-right">
            <button>
              <img
                width="20"
                height="20"
                src="/images/svg/icon-cross.svg"
                onClick={() =>
                  dispatch(toggleModalTransaction(modalDetailTransaction))
                }
                alt=""
              />
            </button>
          </div>
        </div>
        <div className="dialog-detail-transaction-body text-center px-4 py-4">
          <div className="w-full flex items-center justify-center">
            <img
              className="dih-img"
              src={
                props.data.image ? props.data.image : "/images/Broken-Image.png"
              }
              alt=""
              style={{
                width: "150px",
                height: "150px",
                aspectRatio: "1/1",
                objectFit: "contain",
              }}
              onError={({ currentTarget }) => {
                currentTarget.onerror = null; // prevents looping
                currentTarget.src = "/images/Broken-Image.png";
              }}
            />
          </div>
          <p className="dih-title mt-2 font-bold">{props.data.name}</p>
          <div className="w-full">
            <div className="dih-detailed-transaction py-1 flex">
              <p className="flex-1 text-left">Amount Box</p>
              <p className="flex-1 text-right font-bold text-green-500">
                {props.data.amount > 1 ? `${props.data.amount} Boxes` : "1 Box"}
              </p>
            </div>
            <div className="dih-detailed-transaction py-1 flex">
              <p className="flex-1 text-left">Price</p>
              {
                (props.data.paymentType = "fiat" ? (
                  <p className="flex-1 text-right font-bold text-yellow-300">
                    Rp. {props.data.paymentDetail?.total}
                  </p>
                ) : (
                  <p className="flex-1 text-right font-bold text-yellow-300">
                    {props.data.price} VCG
                  </p>
                ))
              }
            </div>
            <div className="dih-detailed-transaction py-1 flex">
              <p className="flex-1 text-left">Date</p>
              <p className="flex-1 text-right">
                {new Date(props.data.date).toLocaleString()}
              </p>
            </div>
            <div className="dih-detailed-transaction py-1 flex">
              <p className="flex-1 text-left">Transaction Hash</p>
              <p className="flex-1 text-right">
                {props.data.txHash.slice(0, 7) +
                  "..." +
                  props.data.txHash.slice(-7)}
              </p>
            </div>
            <div className="dih-detailed-transaction py-1 flex">
              <p className="flex-1 text-left">Action</p>
              <p className="flex-1 text-right">
                {props.data.action == 0 ? (
                  <button className="buy px-2 py-0.5 rounded-md">Buy</button>
                ) : props.data.action == 1 ? (
                  <button className="claim px-2 py-0.5 rounded-md">
                    Claim
                  </button>
                ) : (
                  <button className="refund px-2 py-0.5 rounded-md">
                    Refund
                  </button>
                )}
              </p>
            </div>
            <a
              href={`https://testnet.bscscan.com/tx/${props.data.txHash}`}
              rel="nofollow"
              target="_blank"
            >
              <button className="btn-orange-light w-full py-2 mt-3 font-bold rounded-md text-white">
                More Detail
              </button>
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
