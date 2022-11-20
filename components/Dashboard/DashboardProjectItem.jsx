import Link from "next/link";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {toggleModalBoxes, toggleModalImages, toggleModalConfirmation} from "../../redux/modalReducer";

export default function DashboardProjectItem(props) {
	//functional
	const [items] = useState([1, 2, 3, 4, 5]);
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
	})
	const dataModal = {
		modalBoxes: {
			loading: true,
			isOpen: true,
			title: {
				en: "Projects",
			}
		},
		modalImages: {
			loading: true,
			isOpen: true,
			title: {
				en: "Projects",
			}
		},
		modalConfirmation: {
			loading: false,
			isOpen: true,
			isPlain: true,
			isSuccess: false,
			title: {
				en: "Confirmation",
			}
		},
	}

	//styling
	const bgChipsRequest = {
		backgroundColor: "#FFD4C2",
		color: "#E28058"
	};
	const bgChipsApproved = {
		backgroundColor: "#C4FBCA",
		color: "#40D04F"
	};
	return (
		<tbody>
		{
			props?.project?.length ?
			props.project.map((item, index) => (
				<tr key={index}>
					<td className="text-center">{((props.page.currentPage - 1) * 5) + index + 1}</td>
					<td className="project-name">
						<img 
							src={item.icon}
							alt=""
							// onClick={() => dispatch(toggleModalImages(dataModal.modalImages))} 
						/>
						<div className="project-name-detailed ml-2.5">
							<p className="pnd-title">{item.name}</p>
							<p 
								className="pnd-boxes" 
								// onClick={() => dispatch(toggleModalBoxes(dataModal.modalBoxes))}
							>
								{Object.keys(item.boxes).length > 1 ? `${Object.keys(item.boxes).length} Boxes` : `${Object.keys(item.boxes).length} Box`}
							</p>
							<p className="pnd-times">{new Date(item.startedAt).toLocaleString()} - {new Date(item.finishedAt).toLocaleString()}</p>
						</div>
					</td>
					<td className="text-center project-socmed">
						{
							item.socialMedia?.website ?
							<a href={`https://${item.socialMedia?.website}`} rel="nofollow" target="_blank">
								<img className="px-1" src="/images/svg/icon-browser.svg" alt=""/>
							</a> : ""
						}
						{
							item.socialMedia?.discord ?
							<a href={`https://${item.socialMedia?.discord}`} rel="nofollow" target="_blank">
								<img className="px-1" src="/images/svg/icon-discord.svg" alt=""/>
							</a> : ""
						}
						{
							item.socialMedia?.telegram ?
							<a href={`https://${item.socialMedia?.telegram}`} rel="nofollow" target="_blank">
								<img className="px-1" src="/images/svg/icon-telegram.svg" alt=""/>
							</a> : ""
						}
						{
							item.socialMedia?.youtube ?
							<a href={`https://${item.socialMedia?.youtube}`} rel="nofollow" target="_blank">
								<img className="px-1" src="/images/svg/icon-yt.svg" alt=""/>
							</a> : ""
						}
						{
							item.socialMedia?.medium ?
							<a href={`https://${item.socialMedia?.medium}`} rel="nofollow" target="_blank">
								<img className="px-1" src="/images/svg/icon-yt.svg" alt=""/>
							</a> : ""
						}
					</td>
					<td className="text-center">
						<div className="approval-chips px-1 py-0.5 rounded-md" style={bgChipsRequest}>
							{item.approved ? "Approved" : "Requested"}
						</div>
					</td>
					<td className="text-center">
						{
							item.approved && new Date(item.startedAt) > new Date() ? 
							"On Going" :
							item.approved && new Date(item.finishedAt) > new Date() ? 
							"Finished" : "Not Started"
						}
					</td>
					<td className="text-center project-balance">{item.address ? "1000" : "0"} VCG</td>
					<td className="text-center project-withdraw">
						<button 
							// onClick={() => dispatch(toggleModalConfirmation(dataModal.modalConfirmation))}
							className="btn-gray rounded-md px-2 py-1 active"
						>
								Withdraw
						</button>
					</td>
				</tr>
			)) :
			<tr>
				<td className="text-center" colSpan={7}>
					<div className="my-16">
						<img className="mx-auto mb-5 w-64" src="/images/data-not-found.png" alt=""/>
						<p className="pnd-title">No Data Found</p>
					</div>
				</td>
			</tr>
		}
		</tbody>
	);
}
