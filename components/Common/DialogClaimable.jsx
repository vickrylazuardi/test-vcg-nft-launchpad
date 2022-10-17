import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {toggleModalClaimable} from "../../redux/modalReducer";
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
	const container = {
		hidden: {opacity: 1, scale: 0},
		visible: {
			opacity: 1,
			scale: 1,
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
						<motion.ul className="container-motion-ul grid grid-cols-4 gap-1" variants={container} initial="hidden"
											 animate="visible">
							{items.map((index) => (
								// eslint-disable-next-line react/jsx-key
								<motion.li key={index} className="dcb-item text-center mt-3" variants={itemList}>
									<img src="https://placeimg.com/160/160/arch" className="dcb-item-img" alt=""/>
									<p className="font-semibold text-white dcb-item-name mt-2">Item Name</p>
								</motion.li>
							))}
						</motion.ul>
					</div>
				)}
			</motion.div>
		</motion.div>
	);
}
