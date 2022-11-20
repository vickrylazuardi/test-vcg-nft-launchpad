import {useDispatch} from "react-redux";
import {toggleNavbar} from "../../../redux/navbarReducer";
import {useRouter} from "next/router";
import {toggleModalConfirmation} from "../../../redux/modalReducer";

export default function ProjectItemMobile(props) {
	//function
	const dispatch = useDispatch();

	const dataModal = {
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
	const router = useRouter();
	const navbarImages = {
		title: "Project Photo",
		status: 1,
	};
	const navbarDetailProject = {
		title: "Ragnarok X Next Generation",
		status: 2,
	};

	const toggleNavbarActions = (params, e) => {
		if (params === 1) {
			e.stopPropagation();
			dispatch(toggleNavbar(navbarImages))
			router.push("/profile/projects/image?=ragnarok2")
		} else if (params === 2) {
			dispatch(toggleNavbar(navbarDetailProject))
			router.push("/profile/projects/detail?=ragnarok2")
		}else if (params === 99) {
			e.stopPropagation();
			dispatch(toggleModalConfirmation(dataModal.modalConfirmation))
		}
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
	const borderedPrevent = {
		border: "1px solid #616A82 !important"
	};
	return (
		<div onClick={(e) => toggleNavbarActions(2, e)} className="project-item px-2 py-2 mb-3">
			<div className="project-item-head pb-2">
				<img onClick={(e) => toggleNavbarActions(1, e)} className="rounded-md" src="https://placeimg.com/160/160/arch"
						 alt=""/>
				<div className="project-item-head-detailed ml-3">
					<div className="pih-title">Ragnarok X Next Generation</div>
					<div className="pih-boxes">4 Boxes</div>
					<div className="pih-time">8/13/2022, 11:30 AM - 10/20/2022, 11:30 AM</div>
				</div>
			</div>
			<div className="project-item-body py-1">
				<div className="grid grid-cols-3 gap-3">
					<div className="pih-status">
						<p>Status</p>
						<p className="mt-4">Approved</p>
					</div>
					<div className="pih-status">
						<p>Balance</p>
						<p className="mt-4 vcg-amount">1.000 VCG</p>
					</div>
					<div className="pih-status">
						<p>Balance</p>
						<div className="mt-4 px-0 py-0.5 rounded-md" style={bgChipsRequest}>Request</div>
					</div>
				</div>
				<div className="btn-project-item grid grid-cols-2 gap-4 mt-2">
					<button style={borderedPrevent} className="btn-bordered rounded-md px-2 py-1">Social Media</button>
					<button onClick={(e) => toggleNavbarActions(99, e)} className="btn-gray rounded-md px-2 py-1 active">Withdraw</button>
				</div>
			</div>
		</div>
	)
}
