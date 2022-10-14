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
				<ProfileHeader/>
				<NavigationDashboard/>
				<div className="container-wrapper grid grid-cols-5 gap-4">
					<DashboardSideMenu/>
					<DashboardOwnedBox/>
				</div>
			</div>
			<div className="owned-boxed-list">
				<div className="owned-boxed-item p-3 mt-2">
					<p className="font-bold">Project Name</p>
					<div className="obi-list mt-2 py-2">
						<img className="rounded-md mr-3" src="https://placeimg.com/160/160/arch" alt=""/>
						<div className="obi-list-detailed">
							<p className="font-bold">Box Name</p>
						</div>
					</div>
					<div className="obi-list mt-2 py-2">
						<img className="rounded-md mr-3" src="https://placeimg.com/160/160/arch" alt=""/>
						<div className="obi-list-detailed">
							<p className="font-bold">Box Name</p>
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
					</div>
				</div>
			</div>
			{/*// <DialogBoxes/>*/}
			{/*// <DialogDetailImage/>*/}
		</div>
	)
}
