import Link from "next/link";
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

	if (props?.history?.length) {
		return (
			<div id="history-tr-list" className="p-3">
				{
					props?.history?.map((item, index) => (
						<div 
							key={index}
							className="history-tr-item py-2" 
							onClick={() => {
								props.setData(item);
								dispatch(toggleModalTransaction(dataModal.modalDetailTransaction));
							}}
						>
							<div className="hti-count">{((props.page.currentPage - 1) * 5) + index + 1}</div>
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
									<p className="font-bold hti-detailed-boxes">
										{item.amount > 1 ? `${item.amount} Boxes` : "1 Box"}
									</p>
									<Link href={`/detail/${item.projectDetail._id}`} >
										<a>
											<p 
												className="font-semibold hti-detailed-projecct"
												onClick={(e) => {
													if (e && e.stopPropagation) {
														e.stopPropagation();
													}
												}}
											>{item.projectName}</p>
										</a>
									</Link>
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
					))
				}
			</div>
		);
	} else {
		return (
			<div className="my-16 flex flex-col items-center">
				<img className="mb-5 w-64" src="/images/data-not-found.png" alt=""/>
				<p className="pnd-title">No Data Found</p>
			</div>
		);
	}
}
