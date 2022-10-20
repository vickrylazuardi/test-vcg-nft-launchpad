import {useDispatch, useSelector} from "react-redux";
import {toggleModalConfirmation} from "../../redux/modalReducer";
import {useEffect} from "react";

const {motion} = require("framer-motion");

export default function DialogSliderMobile({status}) {
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
	const modalConfirmationClaimable = {
		loading: false,
		isOpen: false,
		isPlain: false,
		isSuccess: false,
		claimableMobile: true,
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
			y: "100vh",
			opacity: 0
		},
		visible: {
			y: "5vh",
			opacity: 1,
			transition: {delay: 0.5}
		}
	};
	const finishAction = () => {
		if (status === "claim") {
			dispatch(toggleModalConfirmation(modalConfirmationClaimable))
		} else {
			console.log("kaga");
			dispatch(toggleModalConfirmation(modalConfirmation))
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
		<motion.div id="dialog-slider-mobile-overlay" variants={backdrop} initial="hidden" animate="visible" exit="hidden">
			<motion.div className="dialog-slider-mobile rounded-t-xl" variants={animateModal}>
				{!modal.loading && !modal.isSuccess && (
					<div className="dialog-slider-mobile-header px-3 py-4">
						<div className="dsmh-left flex-1">
							Confirmation
						</div>
						<div className="dsmh-right flex-1 flex justify-end">
							<img onClick={() => dispatch(toggleModalConfirmation(modalConfirmation))} src="/images/svg/icon-cross.svg"
									 alt=""/>
						</div>
					</div>
				)}
				{modal.loading && (
					<div className="dialog-slider-mobile-body px-3 py-4">
						<div className="dsmb-img-bundle w-full flex items-center justify-center">
							<img src="/loaders/loaders.gif" style={imgLoader} alt=""/>
						</div>
					</div>
				)}
				{modal.isPlain && (
					<div className="dialog-slider-mobile-body px-3 py-4">
						<div className="dsmb-img-bundle w-full flex items-center justify-center mb-2">
							{status === "claim" ? (
								<img src="/images/gift-img.png" alt=""/>
							) : (
								<img src="/images/coin-big.png" alt=""/>
							)}
						</div>
						{status === "refund" && (
							<p>Are you sure refund this project?</p>
						)}
						{!status && (
							<p>Are you sure withdraw this project?</p>
						)}
						{status === "claim" && (
							<p>Are you sure to claim this box?</p>
						)}
						<button onClick={() => dispatch(toggleModalConfirmation(modalConfirmationSuccess))}
										className="w-full btn-orange-light font-semibold py-2 mt-2 text-white rounded-md">
							{status === "refund" && (
								<span>Refund</span>
							)}
							{status === "claim" && (
								<span>Claim</span>
							)}
							{!status && (
								<span>Withdraw</span>
							)}
						</button>
					</div>
				)}
				{modal.isSuccess && (
					<div className="dialog-slider-mobile-body px-3 py-4">
						<div className="dsmb-img-bundle w-full mb-2 flex items-center justify-center">
							<img src="/images/success-img.png" alt=""/>
						</div>
						<p className="font-bold text-white">Success !</p>
						{status === "refund" && (
							<p>You have refund this project</p>
						)}
						{!status && (
							<p>You have withdraw this project</p>
						)}
						{status === "claim" && (
							<p>You have claim this project</p>
						)}
						<button onClick={finishAction}
										className="w-full btn-orange-light font-semibold py-2 mt-2 text-white rounded-md">
							{status === "refund" && (
								<span>Refund</span>
							)}
							{status === "claim" && (
								<span>Claim</span>
							)}
							{!status && (
								<span>Withdraw</span>
							)}
						</button>
					</div>
				)}
			</motion.div>
		</motion.div>
	);
}
