import Link from "next/link";
import {useRouter} from "next/router";

export default function BottomNavMobileDashboard() {
	const router = useRouter();
	return (
		<div className="bottom-nav-mobile-profile grid grid-cols-3">
			<Link href="/profile/projects">
				<div className={router.pathname === "/profile/projects" ? "pb-2 bnm-item active" : "pb-2 bnm-item"}>
					Projects
				</div>
			</Link>
			<Link href="/profile/boxes">
				<div className={router.pathname === "/profile/boxes" ? "pb-2 bnm-item active" : "pb-2 bnm-item"}>
					Owned Box
				</div>
			</Link>
			<Link href="/profile/history">
				<div className={router.pathname === "/profile/history" ? "pb-2 bnm-item active" : "pb-2 bnm-item"}>
					History Transaction
				</div>
			</Link>
		</div>
	);
}
