import Link from "next/link";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {toggleModalClaimable, toggleModalConfirmation} from "../../redux/modalReducer";

export default function DashboardOwnedNftItem(props) {
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
	});

	if (props?.nft?.length) {
		return (
			<div id="owned-boxes-list" className="grid grid-cols-5 gap-4">
				{
					props?.nft?.map((item, index) => (
						<div key={index} className="owned-boxes-item rounded-lg">
							<div className="owned-boxes-item-head">
								<img 
									src={item.nftDetail.image} 
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
								<p className="font-bold obi-name">{item.name}</p>
								<Link href={`/detail/${item.projectDetail._id}`}>
									<a>
										<p className="font-semibold obi-project mt-3">{item.projectName}</p>
									</a>
								</Link>
								<p className="font-normal obi-name">
									{/* {item.description.split("- ")[1]} */}
									{item.nftDetail.description}
								</p>
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
