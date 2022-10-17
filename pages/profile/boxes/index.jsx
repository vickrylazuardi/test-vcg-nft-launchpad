import Link from "next/link";
import ProfileHeader from "../../../components/Dashboard/ProfileHeader";
import NavigationDashboard from "../../../components/Dashboard/NavigationDashboard";
import DashboardSideMenu from "../../../components/Dashboard/DashboardSideMenu";
import DashboardOwnedBox from "../../../components/Dashboard/DashboardOwnedBox";
import {useSelector, useDispatch} from "react-redux";
import {toggleModalConfirmation} from "../../../redux/modalReducer";
import {toggleNavbar} from "../../../redux/navbarReducer";
import {useRouter} from "next/router";

export default function index() {
	const modal = useSelector((state) => state.modal);
	const dispatch = useDispatch();
	const router = useRouter();
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

	const navbarDetailClaim = {
		title: "Box Name",
		status: 4,
	};
	const navbarDetailRefund = {
		title: "Box Name",
		status: 5,
	};

	const toggleNavbarActions = (params, e) => {
		if (params === 4) {
			e.stopPropagation();
			dispatch(toggleNavbar(navbarDetailClaim))
			router.push("/profile/boxes/claim?=boxes123")
		} else if (params === 5) {
			dispatch(toggleNavbar(navbarDetailRefund))
			router.push("/profile/boxes/refund?=boxes123")
		}else if (params === 99) {
			e.stopPropagation();
			dispatch(toggleModalConfirmation(dataModal.modalConfirmation))
		}
	}
	return (
		<div id="profile-launchpad">
			<div className="container mx-auto bundle-pl">
				<div className="navigation-container flex items-center">
					<Link href="/">
						<a className="flex items-center">
							<img src="/images/icon-home.png" alt=""/>
						</a>
					</Link>
					<p className="ml-3 text-sm font-bold">My Profile</p>
				</div>
				{/* <ProfileHeader/>
				<NavigationDashboard/> */}
				<div className="container-wrapper grid grid-cols-5 gap-4">
					<DashboardSideMenu/>
					<DashboardOwnedBox/>
				</div>
			</div>
			<div className="owned-boxed-list">
				<div className="owned-boxed-item p-3 mt-2">
					<p className="font-bold">Project Name</p>
					<div onClick={(e) => toggleNavbarActions(5, e)} className="obi-list mt-2 py-2">
						<img className="rounded-md mr-3" src="https://placeimg.com/160/160/arch" alt=""/>
						<div className="obi-list-detailed">
							<p className="font-bold">Box Name</p>
						</div>
						<div className="obi-list-detailed flex justify-end">
							<button className="refund px-2 py-0.5 rounded-md">Refund</button>
						</div>
					</div>
					<div onClick={(e) => toggleNavbarActions(4, e)} className="obi-list mt-2 py-2">
						<img className="rounded-md mr-3" src="https://placeimg.com/160/160/arch" alt=""/>
						<div className="obi-list-detailed">
							<p className="font-bold">Box Name</p>
						</div>
						<div className="obi-list-detailed flex justify-end">
							<button className="claim px-2 py-0.5 rounded-md">Claim</button>
						</div>
					</div>
				</div>
				<div className="owned-boxed-item p-3 mt-2">
					<p className="font-bold">Project Indonesia</p>
					<div className="obi-list mt-2 py-2">
						<img className="rounded-md mr-3" src="https://placeimg.com/160/160/arch" alt=""/>
						<div className="obi-list-detailed">
							<p className="font-bold">Box Name</p>
						</div>
						<div className="obi-list-detailed flex justify-end">
							<button className="refund px-2 py-0.5 rounded-md">Refund</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
