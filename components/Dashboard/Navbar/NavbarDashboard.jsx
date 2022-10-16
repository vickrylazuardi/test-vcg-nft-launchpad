import MidNavbar from "../../MidNavbar";
import RightNavbar from "../../RightNavbar";
import TopNavbar from "../../TopNavbar";
import BottomNavMobileDashboard from "./BottomNavMobileDashboard";
import LeftNavbarDashboard from "./LeftNavbarDashboard";
import {isDesktop, isMobile} from "react-device-detect";
import {useRouter} from "next/router";
import {toggleNavbar} from "../../../redux/navbarReducer";
import Link from "next/link";
import {useSelector, useDispatch} from "react-redux";

export default function NavbarDashboard() {
	const router = useRouter();
	const dispatch = useDispatch();
	const navData = useSelector((state) => state.navbarMob.dataNavbar);
	const navbarPlain = {
		title: "Launchpad",
		status: 0,
	};
	const navbarDetailProject = {
		title: "Ragnarok X Next Generation",
		status: 2,
	};
	const toggleNavbarActions = (params, e) => {
		if (params === 0) {
			dispatch(toggleNavbar(navbarPlain))
		}
	};
	const toggleNavbarRedirect = () => {
		if (navData.status === 1 || navData.status === 2) {
			dispatch(toggleNavbar(navbarPlain))
			router.push("/profile/projects")
		} else if (navData.status === 3) {
			dispatch(toggleNavbar(navbarDetailProject))
			router.push("/profile/projects/detail?=ragnarok2")
		} else if (navData.status === 4 || navData.status === 5) {
			dispatch(toggleNavbar(navbarPlain))
			router.push("/profile/boxes")
		}else if (navData.status === 6) {
			dispatch(toggleNavbar(navbarPlain))
			router.push("/profile/history")
		} else if (navData.status === 0) {
			dispatch(toggleNavbar(navbarPlain))
			router.push("/profile")
		}
	};
	return (
		<div id="navbar-container" className="fixed top-0 right-0 left-0 z-50">
			{isDesktop && (
				<nav>
					<TopNavbar/>
					<div className="bottom-nav-container">
						<div className="container-wrapper  flex items-center justify-between">
							<LeftNavbarDashboard/>
							<MidNavbar/>
							<RightNavbar/>
						</div>
					</div>
					<div className="bottom-action-container hidden lg:block">
						<BottomNavMobileDashboard/>
					</div>
				</nav>
			)}
			{isMobile && router.pathname === "/profile" && (
				<div className="dashboard-navbar-mobile flex">
					<div className="flex-1 flex items-center px-2">
						<span className="font-bold">Profile</span>
					</div>
					<div className="flex-1 flex items-center justify-end px-2">
						<button className="btn-connect-wallet font-semibold px-3 py-0.5 rounded-md">Connect Wallet</button>
					</div>
				</div>
			)}
			{isMobile && router.pathname.startsWith("/profile/") && (
				<div className="dashboard-navbar-mobile-launchpad">
					<div className="dnml-top flex">
						<div className="flex-1 flex items-center px-2">
							<img onClick={toggleNavbarRedirect} src="/images/svg/chevron-left-bold.svg" alt=""/>
							<span className="font-bold ml-2">{navData.title}</span>
						</div>
						{navData.status === 0 && (
							<div className="flex-1 flex items-center justify-end px-2">
								<img src="/images/svg/icon-search.svg" alt=""/>
							</div>
						)}
					</div>
					{navData.status === 0 && (
						<div className="dnml-bottom">
							<Link href="/profile/projects">
								<div onClick={(e) => toggleNavbarActions(0, e)}
										 className={router.pathname === "/profile/projects" ? "dnml-bottom-tab active" : "dnml-bottom-tab"}>
									<span>Projects</span>
								</div>
							</Link>
							<Link href="/profile/boxes">
								<div onClick={(e) => toggleNavbarActions(0, e)}
										 className={router.pathname === "/profile/boxes" ? "dnml-bottom-tab active" : "dnml-bottom-tab"}>
									<span>Owned Box</span>
								</div>
							</Link>
							<Link href="/profile/history">
								<div onClick={(e) => toggleNavbarActions(0, e)}
										 className={router.pathname === "/profile/history" ? "dnml-bottom-tab active" : "dnml-bottom-tab"}>
									<span>History Transaction</span>
								</div>
							</Link>
						</div>
					)}
				</div>
			)}
		</div>
	);
}
