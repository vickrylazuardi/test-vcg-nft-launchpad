import MidNavbar from "./MidNavbar";
import RightNavbar from "./RightNavbar";
import TopNavbar from "./TopNavbar";
import BottomNavMobileDashboard from "./BottomNavMobileDashboard";
import LeftNavbarDashboard from "./LeftNavbarDashboard";
import {isDesktop} from "react-device-detect";
import {useRouter} from "next/router";

export default function Navbar() {
	const router = useRouter();
	return (
		<div id="navbar-container" className="fixed top-0 right-0 left-0 z-50">
			<nav>
				<TopNavbar/>
				<div className="bottom-nav-container">
					<div className="container-wrapper  flex items-center justify-between">
						<LeftNavbarDashboard/>
						<MidNavbar/>
						<RightNavbar/>
					</div>
				</div>
				{isDesktop && (
					<div className="bottom-action-container hidden lg:block">
						<BottomNavMobileDashboard/>
					</div>
				)}
				{router.pathname !== "/profile/[slug]" && (
					<div className="bottom-action-container hidden lg:block">
						<BottomNavMobileDashboard/>
					</div>
				)}
			</nav>
		</div>
	);
}
