import {useRouter} from "next/router";
import Link from "next/link";

export default function index() {
	const router = useRouter();
	return (
		<div id="connect-wallet-page" className="">
			<div className="container py-3 cwp-mobile">
				<p className="font-bold text-center mt-5">Connect First, for get it Fast</p>
				<div className="grid grid-cols-2 gap-4 mt-5">
					<div className="connect-wallet-item flex items-center justify-center rounded-lg">
						<div className="connect-wallet-item-bundle">
							<div className="w-full flex justify-center">
								<img src="/images/icon-wallet/icon-pancakeswap-square.png" alt=""/>
							</div>
							<p className="font-semibold mt-1">PancakeSwap</p>
						</div>
					</div>
					<div className="connect-wallet-item flex items-center justify-center rounded-lg">
						<div className="connect-wallet-item-bundle">
							<div className="w-full flex justify-center">
								<img src="/images/icon-wallet/icon-indodax-square.png" alt=""/>
							</div>
							<p className="font-semibold mt-1">Indodax</p>
						</div>
					</div>
					<div className="connect-wallet-item flex items-center justify-center rounded-lg">
						<div className="connect-wallet-item-bundle">
							<div className="w-full flex justify-center">
								<img src="/images/icon-wallet/icon-uniswap-square.png" alt=""/>
							</div>
							<p className="font-semibold mt-1">Uniswap</p>
						</div>
					</div>
					<div className="connect-wallet-item flex items-center justify-center rounded-lg">
						<div className="connect-wallet-item-bundle">
							<div className="w-full flex justify-center">
								<img src="/images/icon-wallet/icon-bitmart-square.png" alt=""/>
							</div>
							<p className="font-semibold mt-1 text-center">Bitmart</p>
						</div>
					</div>
				</div>
			</div>
			<div className="h-full flex cwp-web">
				<div className="connect-wallet-background">
					<img src="/images/bg-wallet.png" alt=""/>
				</div>
				<div className="flex-1 flex items-center justify-center">
					<div className="connect-wallet-item-bundle text-center">
						<p className="font-bold text-center mt-5 cwpi-title">Connect Wallet</p>
						<div className="grid grid-cols-4 gap-4 mt-5">
							<div className="connect-wallet-item flex items-center justify-center rounded-lg">
								<div className="connect-wallet-item-bundle">
									<div className="w-full flex justify-center">
										<img src="/images/icon-wallet/icon-pancakeswap-square.png" alt=""/>
									</div>
									<p className="font-semibold mt-3">PancakeSwap</p>
								</div>
							</div>
							<div className="connect-wallet-item flex items-center justify-center rounded-lg">
								<div className="connect-wallet-item-bundle">
									<div className="w-full flex justify-center">
										<img src="/images/icon-wallet/icon-indodax-square.png" alt=""/>
									</div>
									<p className="font-semibold mt-3">Indodax</p>
								</div>
							</div>
							<div className="connect-wallet-item flex items-center justify-center rounded-lg">
								<div className="connect-wallet-item-bundle">
									<div className="w-full flex justify-center">
										<img src="/images/icon-wallet/icon-uniswap-square.png" alt=""/>
									</div>
									<p className="font-semibold mt-3">Uniswap</p>
								</div>
							</div>
							<div className="connect-wallet-item flex items-center justify-center rounded-lg">
								<div className="connect-wallet-item-bundle">
									<div className="w-full flex justify-center">
										<img src="/images/icon-wallet/icon-bitmart-square.png" alt=""/>
									</div>
									<p className="font-semibold mt-3 text-center">Bitmart</p>
								</div>
							</div>
						</div>
						<Link href="/">
							<p className="font-semibold flex justify-center mt-3">
								<img src="/images/svg/icon-arrow-left.svg" className="cursor-pointer" alt=""/>
								<span className="cursor-pointer">Back to Previous Page</span>
							</p>
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}
