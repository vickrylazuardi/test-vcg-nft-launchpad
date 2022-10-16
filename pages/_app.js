import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import {Provider} from "react-redux";
import {store} from "../redux/store";

import Layout from "../components/Layout/Layout";
import LayoutDashboard from "../components/Layout/LayoutDashboard";
import LayoutWallet from "../components/Layout/LayoutWallet";
import "../styles/globals.scss";
import "../styles/index.scss";

function MyApp({Component, pageProps, router}) {
	if (router.pathname.startsWith("/profile/")) {
		return (
			<Provider store={store}>
				<LayoutDashboard>
					<Component {...pageProps} />
				</LayoutDashboard>
			</Provider>
		);
	} else if (router.pathname === "/connect-wallet") {
		return (
			<Provider store={store}>
				<LayoutWallet>
					<Component {...pageProps} />
				</LayoutWallet>
			</Provider>
		);
	} else {
		return (
			<Provider store={store}>
				<Layout>
					<Component {...pageProps} />
				</Layout>
			</Provider>
		);
	}
}

export default MyApp;
