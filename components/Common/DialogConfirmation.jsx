import {useDispatch, useSelector} from "react-redux";
import {toggleModalConfirmation} from "../../redux/modalReducer";
import {useEffect} from "react";
import { useRouter } from 'next/router'
const {motion} = require("framer-motion");

export default function DialogConfirmation(props) {
	//functional
	const router = useRouter();
	const modal = useSelector(state => state.modal.modalConfirmation);
	const dispatch = useDispatch();
	const modalConfirmation = {
		loading: false,
		isOpen: false,
		isPlain: false,
		isSuccess: false,
		isFailed: false,
		title: {
			en: "Confirmation",
		}
	};
	const modalConfirmationSuccess = {
		loading: true,
		isOpen: true,
		isPlain: false,
		isSuccess: false,
		isFailed: false,
		title: {
			en: "Confirmation",
		}
	};
	const modalConfirmationWhenSuccess = {
		loading: false,
		isOpen: true,
		isPlain: false,
		isSuccess: true,
		isFailed: false,
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
	// useEffect(() => {
	// 	if (modal.loading) {
	// 		setTimeout(() => {
	// 			dispatch(toggleModalConfirmation(modalConfirmationWhenSuccess))
	// 		}, 1000)
	// 	}
	// })
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
						<div className="m-10 flex flex-col items-center">
							<img className="dc-img" src="/loaders/loaders.gif" style={imgLoader} alt=""/>
							<p className="font-bold dib-title mt-2">Please do not close this page until transaction done</p>
						</div>
					</div>
				)}
				{modal.isPlain && (
					<div className="dialog-confirmation-body text-center">
						<img className="dc-img" src="/images/coin-big.png" alt=""/>
						<p className="font-bold dib-title mt-2 mb-2">Are you sure to {props.message}</p>
						{
							props.amount ?
							<p className="font-bold dib-title mt-2 mb-2">Amount : {props.amount}</p> :
							""
						}
						<button 
							onClick={() => {
								dispatch(toggleModalConfirmation(modalConfirmationSuccess))
								props.action();
							}}
							className="btn-orange-light w-full py-2 rounded-lg"
						>
							{props.type}
						</button>
					</div>
				)}
				{modal.isSuccess && (
					<div className="dialog-confirmation-body text-center">
						<img className="dc-img" src="/images/success-img.png" alt=""/>
						<p className="font-bold dib-success-word mt-2 mb-2">Success !</p>
						<p className="dib-title mt-2 mb-2">{props.successMessage}</p>
						{
							props.amount ?
							<p className="font-bold dib-title mt-2 mb-2">Amount : {props.amount}</p> :
							""
						}
						{
							props.redirect ?
							<button 
								onClick={() => {
									dispatch(toggleModalConfirmation(modalConfirmation));
									router.push(props.redirect);
								}}
								className="btn-orange-light w-full py-2 rounded-lg"
							>
								Back
							</button> :
							<button 
								onClick={() => dispatch(toggleModalConfirmation(modalConfirmation))}
								className="btn-orange-light w-full py-2 rounded-lg"
							>
								Back
							</button>
						}
					</div>
				)}
				{modal.isFailed && (
					<div className="dialog-confirmation-body text-center">
						<img className="dc-img" src="/images/failed-img.png" alt=""/>
						<p className="font-bold dib-success-word mt-2 mb-2">Failed !</p>
						<p className="dib-title mt-2 mb-2">{props.failedMessage}</p>
						{
							props.amount ?
							<p className="font-bold dib-title mt-2 mb-2">Amount : {props.amount}</p> :
							""
						}
						<button onClick={() => dispatch(toggleModalConfirmation(modalConfirmation))}
										className="btn-orange-light w-full py-2 rounded-lg">Back
						</button>
					</div>
				)}
			</motion.div>
		</motion.div>
	);
}
