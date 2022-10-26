import NavbarWallet from "../Dashboard/Navbar/NavbarWallet";
import {isMobile} from "react-device-detect";
import FooterWallet from "../FooterWallet";

export default function LayoutDashboard({children}) {
	return (
		<>
			{isMobile && (
				<NavbarWallet/>
			)}
			<main>{children}</main>
			{isMobile && (
				<FooterWallet/>
			)}
		</>
	);
}
