import Link from "next/link";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {toggleModalClaimable, toggleModalConfirmation} from "../../redux/modalReducer";

export default function DashboardOwnedBoxItem(props) {
	const [value] = useState([1, 2, 3, 4, 5]);
	const modal = useSelector(state => state.modal);
	const dispatch = useDispatch();
	const modalConfirmation = {
		loading: false,
		isOpen: true,
		isPlain: true,
		isSuccess: false,
		isFailed: false,
		title: {
			en: "Confirmation",
		}
	};
	const modalClaimableItem = {
		loading: true,
		isOpen: true,
		showItem: false,
		title: {
			en: "Confirmation",
		}
	};
	useEffect(() => {
		if (modal.modalClaimable.isOpen) {
			document.querySelector("body").style.overflow = "hidden";
		} else if (modal.modalConfirmation.isOpen) {
			document.querySelector("body").style.overflow = "hidden";
		} else {
			document.querySelector("body").style.overflow = "auto";
		}
	})

	if (props?.boxes?.length) {
		return (
			<div id="owned-boxes-list" className="grid grid-cols-5 gap-4">
				{props?.boxes?.map((item, index) => (
					<div key={index} className="owned-boxes-item rounded-lg">
						<div className="owned-boxes-item-head">
							<img 
								src={item.image} 
								className="rounded-t-lg" 
								alt=""
								style={{
									width: "165px",
									height: "165px",
									aspectRatio: "1/1",
									objectFit: "contain"
								}}
							/>
						</div>
						<div className="owned-boxes-item-body p-3">
							<p className="font-bold obi-name">{item.itemName} {item.amount > 1 ? `[${item.amount}]` : ""}</p>
							<Link href={`/detail/${item.projectDetail._id}`}>
								<a>
									<p className="font-semibold obi-project mt-3">{item.projectName}</p>
								</a>
							</Link>
							{/* {index === 0 ? (
								<button onClick={() => dispatch(toggleModalConfirmation(modalConfirmation))}
												className="btn-orange-light rounded-md px-3 py-1 mt-3">Refund</button>
							) : (
								)} */}
							<button 
								onClick={() => {
									dispatch(toggleModalConfirmation(modalConfirmation))
									props.action({
										type: "claim",
										name: item.itemName, 
										amount: item.amount,
										projectDetail: item.projectDetail
									})
								}} 
								disabled={item.finalize ? false : true}
								className={
									item.finalize ?
									"btn-orange-light rounded-md px-3 py-1 mt-3" :
									"btn-disabled rounded-md px-3 py-1 mt-3"
								}
							>
								Claim
							</button>
						</div>
					</div>
				))}
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
