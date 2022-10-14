import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Layout from "../components/Layout/Layout";
import LayoutDashboard from "../components/Layout/LayoutDashboard";
import LayoutWallet from "../components/Layout/LayoutWallet";
import "../styles/globals.scss";
import "../styles/index.scss";

function MyApp({Component, pageProps, router}) {
	if (router.pathname.startsWith("/profile/")) {
		return (
			<LayoutDashboard>
				<Component {...pageProps} />
			</LayoutDashboard>
		);
	} else if (router.pathname === "/connect-wallet") {
		return (
			<LayoutWallet>
				<Component {...pageProps} />
			</LayoutWallet>
		);
	} else {
		return (
			<Layout>
				<Component {...pageProps} />
			</Layout>
		);
	}
}

export default MyApp;
