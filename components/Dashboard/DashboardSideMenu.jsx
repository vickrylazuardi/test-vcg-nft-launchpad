import Link from "next/link";
import React, {useState} from "react";

export default function DashboardSideMenu(props) {
	return (
		<div id="dashboard-menu" className="mt-5 rounded-lg">
			<div className="dashboard-menu-header p-5 rounded-t-lg flex item-center align-center">
				<p className="font-bold dmh-title">Profile Launchpad</p>
			</div>
			<div className="dashboard-menu-body p-5 rounded-b-lg">
				<ul>
					<Link href="/profile?tab=project">
						<li 
							className="font-semibold mb-1"
							style={
								props.tab == "project" ?
								{color: "#E28058"} :
								props.tab == undefined ?
								{color: "#E28058"} :
								{}
							}
						>
							Projects
						</li>
					</Link>
					<Link href="/profile?tab=boxes">
						<li 
							className="font-semibold mb-1"
							style={
								props.tab == "boxes" ?
								{color: "#E28058"} :
								{}
							}
						>
							Owned Box
						</li>
					</Link>
					<Link href="/profile?tab=history">
						<li 
							className="font-semibold mb-1"
							style={
								props.tab == "history" ?
								{color: "#E28058"} :
								{}
							}
						>
							Transaction History
						</li>
					</Link>
				</ul>
			</div>
		</div>
	);
}
