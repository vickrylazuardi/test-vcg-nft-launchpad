import NavbarWallet from "../NavbarWallet";
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
