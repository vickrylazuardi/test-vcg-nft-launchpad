import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {toggleModalClaimable} from "../../redux/modalReducer";
import Link from "next/link";
const {motion} = require("framer-motion");

export default function DialogClaimable(props) {
	console.log(props.reward);
	console.log(props.uri);
	const [items] = useState([1, 2, 3, 4, 5, 6 , 7, 8, 9, 10, 11, 12, 13]);
	const modal = useSelector(state => state.modal.modalClaimable);
	const dispatch = useDispatch();
	const modalClaimable = {
		loading: false,
		showItem: false,
		isOpen: false,
		title: {
			en: "Photo Box",
		}
	};
	const modalClaimableShowItem = {
		loading: false,
		showItem: true,
		isOpen: true,
		title: {
			en: "Photo Box",
		}
	};
	const backdrop = {
		visible: {opacity: 1},
		hidden: {opacity: 0}
	};
	const animateModal = {
		hidden: {
			y: "-100vh",
			opacity: 0
		},
		visible: {
			y: 0,
			opacity: 1,
			transition: {delay: 0.5}
		}
	};

	const containerFull = {
		hidden: {opacity: 1, scale: 0, marginBottom: "2.5rem"},
		visible: {
			opacity: 1,
			scale: 1,
			marginBottom: "2.5rem",
			transition: {
				delayChildren: 0.5,
				staggerChildren: 0.25
			}
		}
	};

	const containerSmall = {
		hidden: {
			opacity: 1, 
			scale: 0, 
			height: "auto",
			marginBottom: "2.5rem"
		},
		visible: {
			opacity: 1,
			scale: 1,
			height: "auto",
			marginBottom: "2.5rem",
			transition: {
				delayChildren: 0.5,
				staggerChildren: 0.25
			}
		}
	};

	const itemList = {
		hidden: {y: "100vh", opacity: 0},
		visible: {
			y: 0,
			opacity: 1
		}
	};
	useEffect(() => {
		if (modal.loading) {
			setTimeout(() => {
				dispatch(toggleModalClaimable(modalClaimableShowItem))
			}, 2000)
		}
	})
	return (
		<motion.div id="dialog-claimable-overlay" variants={backdrop} initial="hidden" animate="visible" exit="hidden">
			<motion.div className="dialog-claimable rounded-xl" variants={animateModal}>
				<div className="dialog-claimable-head px-4 py-4">
					<div className="dih-left">
						Items
					</div>
					<div className="dih-right">
						<button>
							<img width="20" height="20" src="/images/svg/icon-cross.svg"
									 onClick={() => dispatch(toggleModalClaimable(modalClaimable))} alt=""/>
						</button>
					</div>
				</div>
				{modal.loading && (
					<div className="dialog-claimable-body flex items-center justify-center text-center">
						<img className="dc-img" src="/loaders/loaders.gif" alt=""/>
					</div>
				)}
				{modal.showItem && (
					<div className="dialog-claimable-body text-center px-4 py-4">
						<motion.ul 
							className={"container-motion-ul grid grid-cols-4 gap-1"}
							variants={
								props?.reward?.length < 8 ?
								containerSmall :
								containerFull
							} 
							initial="hidden"
							animate="visible"
						>
							{props?.reward?.map((item, index) => (
								<motion.li key={index} className="dcb-item text-center mt-3" variants={itemList}>
									{
										props?.uri[item] ?
										<>
											<img 
												src={props?.uri[item].image} 
												className="dcb-item-img" 
												style={{
													width: "160px",
													height: "160px",
													objectFit: "contain",
													aspectRatio: "1/1"
												}}
												alt=""
											/>
											<p className="font-semibold text-white dcb-item-name mt-2">{props?.uri[item].name}</p>
										</> :
										<>
											<div
												className="flex justify-center items-center"
												style={{
													width: "160px",
													height: "160px"
												}}
											>
												<div class="spinner-border animate-spin inline-block w-5 h-5 border-t-4 border-l-4 rounded-full"/>
											</div>
											<p className="font-semibold text-white dcb-item-name mt-2">Loading</p>
										</>
									}
								</motion.li>
							))}
						</motion.ul>
						<Link href="/profile/nft">
							<a>
								<button
									className="btn btn-orange-light w-full text-white"
									onClick={() => dispatch(toggleModalClaimable(modalClaimable))}
								>
									See Owned NFT
								</button>
							</a>
						</Link>
					</div>
				)}
			</motion.div>
		</motion.div>
	);
}
