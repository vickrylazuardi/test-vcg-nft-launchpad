import {useRouter} from "next/router";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { API } from "../../../utils/globalConstant";
import Link from "next/link";

export default function Detail() {
	// const borderBottom = "border-b border-gray-200";
	const [detailItem, setDetailItem] = useState({});
	const router = useRouter();
	const data = router.query;

	const getDetail = (id) => {
		try {
			axios.get(API.launchpad.domain + API.launchpad.history.detail, {
				params: {id}
			}).then((res) => {
				if (res.status == 200) setDetailItem(res.data.data);
				else setDetailItem({});
			})
		} catch (error) {
			console.log(error)
		}
	}
	
	useEffect(() => {
		if (data.id) {
			getDetail(data.id);
		}
	}, [data.id]);
	
	return (
		<div id="project-section-launchpad" className="global-container">
			<div className="htr-detail-page-mobile px-3 py-3">
				<div className="w-full flex items-center justify-center mb-2">
					<img 
						src={detailItem?.image} 
						className="rounded-md" 
						alt=""
						style={{
							width: "100px",
							height: "100px",
							objectFit: "contain",
							aspectRatio: "1/1"
						}}
					/>
				</div>
				<p className="font-bold htr-box-name text-white">{detailItem?.name}</p>
				<Link href={`/detail/${detailItem?.projectDetail?._id}`}>
					<a>
						<p className="htr-project-name">{detailItem?.projectName}</p>
					</a>
				</Link>
				<div className="w-full">
					<div className="flex py-2 border-b border-gray-600">
						<p className="flex-1 flex justify-start">Amount Box</p>
						<p className="flex-1 flex justify-end text-green-500">
							{detailItem?.amount > 1 ? `${detailItem?.amount} Boxes` : "1 Box"}
						</p>
					</div>
					<div className="flex py-2 border-b border-gray-600">
						<p className="flex-1 flex justify-start">Price</p>
						<p className="flex-1 flex justify-end text-yellow-300">
							{Intl.NumberFormat("en-US").format(Number(detailItem?.price))} VCG
						</p>
					</div>
					<div className="flex py-2 border-b border-gray-600">
						<p className="flex-1 flex justify-start">Date</p>
						<p className="flex-1 flex justify-end">{(new Date(detailItem?.date)).toLocaleString()}</p>
					</div>
					<div className="flex py-2 border-b border-gray-600">
						<p className="flex-1 flex justify-start">Transaction Hash</p>
						<p className="flex-1 flex justify-end">
							{detailItem?.txHash?.slice(0,7) + "..." + detailItem?.txHash?.slice(-7)}
						</p>
					</div>
					<div className="flex py-2 border-b border-gray-600">
						<p className="flex-1 flex justify-start">Action</p>
						{
							detailItem?.action === 0 ?
							<button disabled className="buy px-3 rounded-md">Buy</button> :
							detailItem?.action === 1 ?
							<button disabled className="claim px-3 rounded-md">Claim</button> :
							<button disabled className="refund px-3 rounded-md">Refund</button>
						}
					</div>
				</div>
				<div className="btn-floating-mobile py-4 px-3">
					<a href={`https://testnet.bscscan.com/tx/${detailItem?.txHash}`} rel="nofollow" target="_blank">
						<button className="btn-orange-light w-full py-1 font-semibold rounded-md text-white">
							More Details
						</button>
					</a>
				</div>
			</div>
		</div>
	)
}
