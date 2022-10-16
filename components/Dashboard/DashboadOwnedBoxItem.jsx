import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {toggleModalClaimable, toggleModalConfirmation} from "../../redux/modalReducer";

export default function DashboardOwnedBoxItem() {
	const [value] = useState([1, 2, 3, 4, 5]);
	const modal = useSelector(state => state.modal);
	const dispatch = useDispatch();
	const modalConfirmation = {
		loading: false,
		isOpen: true,
		isPlain: true,
		isSuccess: false,
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
	return (
		<div id="owned-boxes-list" className="grid grid-cols-5 gap-4">
			{value.map((item, index) => (
				<div key={index} className="owned-boxes-item rounded-lg">
					<div className="owned-boxes-item-head">
						<img src="https://placeimg.com/160/160/arch" className="rounded-t-lg" alt=""/>
					</div>
					<div className="owned-boxes-item-body p-3">
						<p className="font-bold obi-name">Box Name [{index + 1}]</p>
						<p className="font-semibold obi-project mt-3">Project Name</p>
						{index === 0 ? (
							<button onClick={() => dispatch(toggleModalConfirmation(modalConfirmation))}
											className="btn-orange-light rounded-md px-3 py-1 mt-3">Refund</button>
						) : (
							<button onClick={()=>dispatch(toggleModalClaimable(modalClaimableItem))} className="btn-orange-light rounded-md px-3 py-1 mt-3">Claim</button>
						)}
					</div>
				</div>
			))}
		</div>
	);
}
