import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
	toggleModalBoxes,
	toggleModalTransaction
} from "../../redux/modalReducer";

export default function DashboardHistoryTransactionItem(props) {
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
			{
				props?.history?.length ?
				props?.history?.map((item, index) => (
					<div onClick={() => dispatch(toggleModalTransaction(dataModal.modalDetailTransaction))}
							className="history-tr-item py-2" key={index}>
						<div className="hti-count">{index + 1}</div>
						<div className="hti-box">
							<img 
								src={item.image} 
								className="rounded-t-lg" 
								alt=""
								style={{
									width: "75px",
									height: "75px",
									aspectRatio: "1/1",
									objectFit: "contain"
								}}/>
							<div className="hti-detailed ml-2">
								<p className="font-bold hti-detailed-title">{item.name}</p>
								<p className="font-bold hti-detailed-boxes" onClick={onClickBoxes}>
									{item.amount > 1 ? `${item.amount} Boxes` : "1 Box"}
								</p>
								<p className="font-semibold hti-detailed-projecct">{item.projectName}</p>
								<p className="font-semibold hti-detailed-time">{(new Date(item.date)).toLocaleString()}</p>
							</div>
						</div>
						<div className="hti-btn">
							{
								item.action == 0 ?
								<button className="buy px-3 py-1 rounded-md">Buy</button> :
								item.action == 1 ?
								<button className="claim px-3 py-1 rounded-md">Claim</button> :
								<button className="refund px-3 py-1 rounded-md">Refund</button>
							}
						</div>
					</div>
				)) :
				<div className="history-tr-item py-2">
					<div className="hti-count">1</div>
					<div className="hti-box">
						<div className="hti-detailed ml-2">
							<p className="font-bold hti-detailed-title">No Data</p>
						</div>
					</div>
				</div>
			}
		</div>
	);
}
