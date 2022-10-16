import {useDispatch} from "react-redux";
import {toggleModalTransaction} from "../../redux/modalReducer";
const {motion} = require("framer-motion");

export default function DialogDetailTransaction() {
	const dispatch = useDispatch();
	const modalDetailTransaction = {
		loading: false,
		isOpen: false,
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
			y: "40px",
			opacity: 1,
			transition: {delay: 0.5}
		}
	};
	return (
		<motion.div id="dialog-detail-transaction-overlay" variants={backdrop} initial="hidden" animate="visible" exit="hidden">
			<motion.div className="dialog-detail-transaction rounded-xl" variants={animateModal}>
				<div className="dialog-detail-transaction-head px-4 py-4">
					<div className="dih-left">
						Detail Transaction
					</div>
					<div className="dih-right">
						<button>
							<img width="20" height="20" src="/images/svg/icon-cross.svg"
									 onClick={() => dispatch(toggleModalTransaction(modalDetailTransaction))} alt=""/>
						</button>
					</div>
				</div>
				<div className="dialog-detail-transaction-body text-center px-4 py-4">
					<div className="w-full flex items-center justify-center">
						<img className="dih-img" src="https://placeimg.com/160/160/arch" alt=""/>
					</div>
					<p className="dih-title mt-2 font-bold">Box Name</p>
					<div className="w-full">
						<div className="dih-detailed-transaction py-1 flex">
							<p className="flex-1 text-left">Amount Box</p>
							<p className="flex-1 text-right font-bold text-green-500">4 Boxes</p>
						</div>
						<div className="dih-detailed-transaction py-1 flex">
							<p className="flex-1 text-left">Price</p>
							<p className="flex-1 text-right font-bold text-yellow-300">1.000 VCG</p>
						</div>
						<div className="dih-detailed-transaction py-1 flex">
							<p className="flex-1 text-left">Date</p>
							<p className="flex-1 text-right">8/13/2022, 11:30 AM</p>
						</div>
						<div className="dih-detailed-transaction py-1 flex">
							<p className="flex-1 text-left">Transaction Hash</p>
							<p className="flex-1 text-right">0xdfd0b6e...2f9cfca2</p>
						</div>
						<div className="dih-detailed-transaction py-1 flex">
							<p className="flex-1 text-left">Action</p>
							<p className="flex-1 text-right">
								<button className="refund px-2 py-0.5 rounded-md">Refund</button>
							</p>
						</div>
						<button className="btn-orange-light w-full py-2 mt-3 font-bold rounded-md text-white">More Detail</button>
					</div>
				</div>
			</motion.div>
		</motion.div>
	);
}
