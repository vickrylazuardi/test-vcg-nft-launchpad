export default function detail() {
	// const borderBottom = "border-b border-gray-200";
	return (
		<div id="project-section-launchpad" className="global-container">
			<div className="htr-detail-page-mobile px-3 py-3">
				<div className="w-full flex items-center justify-center mb-2">
					<img src="https://placeimg.com/160/160/arch" className="rounded-md" alt=""/>
				</div>
				<p className="font-bold htr-box-name text-white">Box Name</p>
				<p className="htr-project-name">Project Name</p>
				<div className="w-full">
					<div className="flex py-2 border-b border-gray-600">
						<p className="flex-1 flex justify-start">Amount Box</p>
						<p className="flex-1 flex justify-end text-green-500">4 boxes</p>
					</div>
					<div className="flex py-2 border-b border-gray-600">
						<p className="flex-1 flex justify-start">Price</p>
						<p className="flex-1 flex justify-end text-yellow-300">1.000 VCG</p>
					</div>
					<div className="flex py-2 border-b border-gray-600">
						<p className="flex-1 flex justify-start">Date</p>
						<p className="flex-1 flex justify-end">8/13/2022, 11:30 AM</p>
					</div>
					<div className="flex py-2 border-b border-gray-600">
						<p className="flex-1 flex justify-start">Transaction Hash</p>
						<p className="flex-1 flex justify-end">0xdfd0b6e...2f9cfca2</p>
					</div>
					<div className="flex py-2 border-b border-gray-600">
						<p className="flex-1 flex justify-start">Action</p>
						<button className="buy px-3 rounded-md">Buy</button>
					</div>
				</div>
				<div className="btn-floating-mobile py-4 px-3">
				<button className="btn-orange-light w-full py-1 font-semibold rounded-md text-white">
					More Details
				</button>
			</div>
			</div>
		</div>
	)
}
