import NavbarDashboard from "../Dashboard/Navbar/NavbarDashboard";
import Footer from "../Footer";
import {useRouter} from "next/router";

export default function LayoutDashboard({children}) {
	const router = useRouter();
	return (
		<>
			<NavbarDashboard/>
			<main>{children}</main>
			{
				!router.pathname.startsWith("/profile/history/detail") ?
				<Footer/> : ""
			}
		</>
	);
}
