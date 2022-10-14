import Link from "next/link";
import React, {useState} from "react";

export default function DashboardSideMenu() {
	return (
		<div id="dashboard-menu" className="mt-5 rounded-lg">
			<div className="dashboard-menu-header p-5 rounded-t-lg flex item-center align-center">
				<p className="font-bold dmh-title">Profile Launchpad</p>
			</div>
			<div className="dashboard-menu-body p-5 rounded-b-lg">
				<ul>
					<Link href="/profile/johndoe">
						<li className="font-semibold mb-1">
							Projects
						</li>
					</Link>
					<Link href="/profile/boxes">
						<li className="font-semibold mb-1">Owned Box</li>
					</Link>
					<Link href="/profile/history">
						<li className="font-semibold mb-1">Transaction History</li>
					</Link>
				</ul>
			</div>
		</div>
	);
}
