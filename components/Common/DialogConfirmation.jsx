import {useDispatch, useSelector} from "react-redux";
import {toggleModalConfirmation} from "../../redux/modalReducer";
import {useEffect} from "react";
const {motion} = require("framer-motion");

export default function DialogConfirmation({status}) {
	//functional
	const modal = useSelector(state => state.modal.modalConfirmation);
	const dispatch = useDispatch();
	const modalConfirmation = {
		loading: false,
		isOpen: false,
		isPlain: false,
		isSuccess: false,
		title: {
			en: "Confirmation",
		}
	};
	const modalConfirmationSuccess = {
		loading: true,
		isOpen: true,
		isPlain: false,
		isSuccess: false,
		title: {
			en: "Confirmation",
		}
	};
	const modalConfirmationWhenSuccess = {
		loading: false,
		isOpen: true,
		isPlain: false,
		isSuccess: true,
		title: {
			en: "Confirmation",
		}
	};
	const backdrop = {
		visible: {opacity: 1},
		hidden: {opacity: 0}
	};
	const animateModal = {
		hidden: {
			y: "-100vh",
			opacity: 0
		},
		visible: {
			y: "40px",
			opacity: 1,
			transition: {delay: 0.5}
		}
	};
	useEffect(() => {
		if (modal.loading) {
			setTimeout(() => {
				dispatch(toggleModalConfirmation(modalConfirmationWhenSuccess))
			}, 1000)
		}
	})
	//styling
	const imgLoader = {
		width: "150px",
		height: "150px",
		objectFit: "cover"
	}
	return (
		<motion.div id="dialog-confirmation-overlay" variants={backdrop} initial="hidden" animate="visible" exit="hidden">
			<motion.div className="dialog-confirmation rounded-xl" variants={animateModal}>
				{!modal.loading && !modal.isSuccess && (
					<div className="dialog-confirmation-head px-4 py-3">
						<div className="dbh-left">
							Confirmation
						</div>
						<div className="dbh-right">
							<button>
								<img width="20" height="20" src="/images/svg/icon-cross.svg"
										 onClick={() => dispatch(toggleModalConfirmation(modalConfirmation))} alt=""/>
							</button>
						</div>
					</div>
				)}
				{modal.loading && (
					<div className="dialog-confirmation-body text-center">
						<img className="dc-img mt-5" src="/loaders/loaders.gif" style={imgLoader} alt=""/>
					</div>
				)}
				{modal.isPlain && (
					<div className="dialog-confirmation-body text-center">
						<img className="dc-img" src="/images/coin-big.png" alt=""/>
						{status === "refund" ? (
							<p className="font-bold dib-title mt-2 mb-2">Are you sure to refund this project?</p>
						) : (
							<p className="font-bold dib-title mt-2 mb-2">Are you sure to withdraw this project?</p>
						)}
						<button onClick={() => dispatch(toggleModalConfirmation(modalConfirmationSuccess))}
										className="btn-orange-light w-full py-2 rounded-lg">
							{status === "refund" ? (
								<span>Refund</span>
							) : (
								<span>Withdraw</span>
							)}
						</button>
					</div>
				)}
				{modal.isSuccess && (
					<div className="dialog-confirmation-body text-center">
						<img className="dc-img" src="/images/success-img.png" alt=""/>
						<p className="font-bold dib-success-word mt-2 mb-2">Success !</p>
						{status === "refund" ? (
							<p className="dib-title mt-2 mb-2">You have refund this box</p>
						) : (
							<p className="dib-title mt-2 mb-2">You have bought this box</p>
						)}
						<button onClick={() => dispatch(toggleModalConfirmation(modalConfirmation))}
										className="btn-orange-light w-full py-2 rounded-lg">Back
						</button>
					</div>
				)}
			</motion.div>
		</motion.div>
	);
}
