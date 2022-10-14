import React, {useState} from "react";
import Link from "next/link";
import ProfileHeader from "../../../components/Dashboard/ProfileHeader";
import NavigationDashboard from "../../../components/Dashboard/NavigationDashboard";
import DashboardSideMenu from "../../../components/Dashboard/DashboardSideMenu";
import DashboardProjects from "../../../components/Dashboard/DashboardProjects";
import DialogDetailImage from "../../../components/Common/DialogDetailImage";
import DashboardOwnedBox from "../../../components/Dashboard/DashboardOwnedBox";

export default function index() {
	return (
		<div id="profile-launchpad" className="global-container">
			<div className="container mx-auto">
				<div className="navigation-container flex items-center">
					<Link href="/">
						<a className="flex items-center">
							<img src="/images/icon-home.png" alt=""/>
						</a>
					</Link>
					<p className="ml-3 text-sm font-bold">My Profile</p>
				</div>
				<ProfileHeader/>
				<NavigationDashboard/>
				<div className="container-wrapper grid grid-cols-5 gap-4">
					<DashboardSideMenu/>
					<DashboardOwnedBox/>
				</div>
			</div>
			{/*<DialogBoxes/>*/}
			{/*<DialogDetailImage/>*/}
		</div>
	)
}
