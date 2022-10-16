import Link from "next/link";
import {useRouter} from "next/router";

export default function DashboardSideMenu() {
	const router = useRouter();
	return (
		<div id="dashboard-menu" className="mt-5 rounded-lg">
			<div className="dashboard-menu-header p-5 rounded-t-lg flex item-center align-center">
				<p className="font-bold dmh-title">Profile Launchpad</p>
			</div>
			<div className="dashboard-menu-body p-5 rounded-b-lg">
				<ul>
					<Link href="/profile">
						<li className={router.pathname === "/profile" ? "font-semibold mb-1 active":"font-semibold mb-1"}>
							Projects
						</li>
					</Link>
					<Link href="/profile/boxes">
						<li className={router.pathname === "/profile/boxes" ? "font-semibold mb-1 active":"font-semibold mb-1"}>Owned Box</li>
					</Link>
					<Link href="/profile/history">
						<li className={router.pathname === "/profile/history" ? "font-semibold mb-1 active":"font-semibold mb-1"}>Transaction History</li>
					</Link>
				</ul>
			</div>
		</div>
	);
}
