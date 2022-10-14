import Link from "next/link";
import {useRouter} from "next/router";

export default function NavbarWallet() {
	const router = useRouter();
	const bgColor = {
		backgroundColor: "#1D2333",
	};
	return (
		<div id="navbar-container" style={bgColor} className="fixed top-0 right-0 left-0 z-50">
			<nav className="py-3 px-3 flex items-center">
				<Link href="/">
					<img src="/images/svg/icon-arrow-left.svg" alt=""/>
				</Link>
				<p className="font-bold ml-2">Connect Wallet</p>
			</nav>
		</div>
	);
}
