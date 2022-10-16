import React from "react";
import Link from "next/link";
import {useRouter} from "next/router";
import {isDesktop, isMobile} from "react-device-detect";
import ProfileHeader from "../../components/Dashboard/ProfileHeader";
import NavigationDashboard from "../../components/Dashboard/NavigationDashboard";
import DashboardSideMenu from "../../components/Dashboard/DashboardSideMenu";
import DashboardProjects from "../../components/Dashboard/DashboardProjects";
import ProfileHeaderMobile from "../../components/Dashboard/ProfileHeaderMobile";

export default function index() {
	const marginMobile = {
		marginTop: "-90px",
	};
	return (
		<div id="profile-launchpad" className="global-container">
			<div className="container mx-auto">
				{isDesktop && (
					<div className="navigation-container flex items-center">
						<Link href="/">
							<a className="flex items-center">
								<img src="/images/icon-home.png" alt=""/>
							</a>
						</Link>
						<p className="ml-3 text-sm font-bold">My Profile</p>
					</div>
				)}
				{isDesktop && (<ProfileHeader/>)}
				{isDesktop && (<NavigationDashboard/>)}
				{isDesktop && (
					<div className="container-wrapper grid grid-cols-5 gap-4">
						<DashboardSideMenu/>
						<DashboardProjects/>
					</div>
				)}
			</div>
			{isMobile && (
				<div style={marginMobile}>
					<ProfileHeaderMobile/>
					<div className="sub-menu-mobile mt-4 p-3">
						<p className="font-bold mb-3">Profile</p>
						<ul>
							<Link target="_blank" href="https://app.vcgamers.com/">
								<li className="py-3"><img src="/images/svg/icon-cart.svg" className="mr-2" alt=""/>Marketplace</li>
							</Link>
							<Link href="/profile/projects">
								<li className="py-3"><img src="/images/svg/nav-launch-icon-active.svg" className="mr-2" alt=""/>Launchpad</li>
							</Link>
							<li className="py-3"><img src="/images/svg/icon-info-square.svg" className="mr-2" alt=""/>
								Social Hub
								<div className="soon rounded-full py-0.5 px-2 ml-1">SOON</div>
							</li>
							<li className="py-3"><img src="/images/svg/icon-info-square.svg" className="mr-2" alt=""/>
								NFT
								<div className="soon rounded-full py-0.5 px-2 ml-1">SOON</div>
							</li>
							<li className="py-3"><img src="/images/svg/icon-info-square.svg" className="mr-2" alt=""/>
								Merchandise
								<div className="soon rounded-full py-0.5 px-2 ml-1">SOON</div>
							</li>
						</ul>
					</div>
				</div>
			)}
		</div>
	)
}
