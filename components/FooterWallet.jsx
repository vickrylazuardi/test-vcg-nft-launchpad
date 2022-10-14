import React from "react";
import FooterBottom from "./FooterBottom";

export default function FooterWallet() {
	return (
		<footer>
			<div className="container">
				<div className="footer-top">
					<div className="top-wrapper flex items-start justify-between lg:flex-col">
						<div className="mid w-1/3 lg:w-full lg:mt-5">
							<p className="link-title font-bold mt-7 lg:text-center">
								Supported by
							</p>
							<div className="supported-container flex items-center mt-3 lg:justify-center">
								<a href="/" className="mr-2">
									<img src="/images/bappebti.png" alt=""/>
								</a>
								<a href="/" className="mr-2">
									<img src="/images/kominfo.png" alt=""/>
								</a>
								<a href="/">
									<img src="/images/certik.png" alt=""/>
								</a>
							</div>
						</div>
						<div className="mid w-1/3 lg:w-full lg:mt-5">
							<p className="link-title font-bold mt-7 lg:text-center">
								Powered by
							</p>
							<div className="supported-container flex items-center mt-3 lg:justify-center">
								<a href="/" className="mr-3">
									<img src="/images/icon-beenext.png" alt=""/>
								</a>
								<a href="/">
									<img src="/images/icon-rans.png" alt=""/>
								</a>
							</div>
						</div>
					</div>
				</div>
				<FooterBottom/>
			</div>
		</footer>
	);
}
