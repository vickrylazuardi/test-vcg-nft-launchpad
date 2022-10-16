import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
	toggleModalBoxes,
	toggleModalTransaction
} from "../../redux/modalReducer";

export default function DashboardHistoryTransactionItem() {
	const [value] = useState([1, 2, 3, 4, 5]);
	const modal = useSelector(state => state.modal);
	const dispatch = useDispatch();

	useEffect(() => {
		if (modal.modalBoxes.isOpen) {
			document.querySelector("body").style.overflow = "hidden";
		} else if (modal.modalImages.isOpen) {
			document.querySelector("body").style.overflow = "hidden";
		} else {
			document.querySelector("body").style.overflow = "auto";
		}

		if (modal.modalBoxes.loading) {
			setTimeout(() => {
				dispatch(toggleModalBoxes({
					loading: false,
					isOpen: true,
					title: {
						en: "Projects",
					}
				}))
			}, 1000)
		}
	});
	const dataModal = {
		modalBoxes: {
			loading: true,
			isOpen: true,
			title: {
				en: "Projects",
			}
		},
		modalDetailTransaction: {
			loading: false,
			isOpen: true,
			title: {
				en: "Projects",
			}
		},
		modalDetailTransactionPrevent: {
			loading: false,
			isOpen: false,
			title: {
				en: "Projects",
			}
		},
	}
	const onClickBoxes = (e) => {
		if (e && e.stopPropagation) {
			e.stopPropagation();
			dispatch(toggleModalBoxes(dataModal.modalBoxes))
		}
	};
	return (
		<div id="history-tr-list" className="p-3">
			{value.map((item, index) => (
				<div onClick={() => dispatch(toggleModalTransaction(dataModal.modalDetailTransaction))}
						 className="history-tr-item py-2" key={index}>
					<div className="hti-count">{index + 1}</div>
					<div className="hti-box">
						<img src="https://placeimg.com/160/160/arch" alt=""/>
						<div className="hti-detailed ml-2">
							<p className="font-bold hti-detailed-title">Box Name</p>
							<p className="font-bold hti-detailed-boxes" onClick={onClickBoxes}>4 Boxes</p>
							<p className="font-semibold hti-detailed-projecct">Project Name</p>
							<p className="font-semibold hti-detailed-time">8/13/2022, 11:30 AM - 10/20/2022, 11:30 AM</p>
						</div>
					</div>
					<div className="hti-btn">
						<button className="refund px-3 py-1 rounded-md">Refund</button>
					</div>
				</div>
			))}
		</div>
	);
}
