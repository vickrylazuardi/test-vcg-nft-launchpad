import {useDispatch, useSelector} from "react-redux";
import {toggleModalConfirmation} from "../../redux/modalReducer";
import {useEffect} from "react";

export default function DialogConfirmation() {
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
		<div id="dialog-confirmation-overlay">
			<div className="dialog-confirmation rounded-xl">
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
						<img className="dc-img" src="/loaders/loaders.gif" className="mt-5" style={imgLoader} alt=""/>
					</div>
				)}
				{modal.isPlain && (
					<div className="dialog-confirmation-body text-center">
						<img className="dc-img" src="/images/coin-big.png" alt=""/>
						<p className="font-bold dib-title mt-2 mb-2">Are you sure to withdraw this project?</p>
						<button onClick={() => dispatch(toggleModalConfirmation(modalConfirmationSuccess))}
										className="btn-orange-light w-full py-2 rounded-lg">Withdraw
						</button>
					</div>
				)}
				{modal.isSuccess && (
					<div className="dialog-confirmation-body text-center">
						<img className="dc-img" src="/images/success-img.png" alt=""/>
						<p className="font-bold dib-success-word mt-2 mb-2">Success !</p>
						<p className="dib-title mt-2 mb-2">You have bought this box</p>
						{/*<p className="font-semibold">You have bought this box</p>*/}
						<button onClick={() => dispatch(toggleModalConfirmation(modalConfirmation))}
										className="btn-orange-light w-full py-2 rounded-lg">Back
						</button>
					</div>
				)}
			</div>
		</div>
	);
}
