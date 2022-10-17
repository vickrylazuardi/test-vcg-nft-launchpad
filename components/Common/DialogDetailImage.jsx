import {useDispatch, useSelector} from "react-redux";
import {toggleModalImages} from "../../redux/modalReducer";
const {motion} = require("framer-motion");

export default function DialogDetailImage() {
	const modal = useSelector(state => state.modal.modalImages);
	const dispatch = useDispatch();
	const modalImages = {
		loading: false,
		isOpen: false,
		isText: false,
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
		<motion.div id="dialog-images-overlay" variants={backdrop} initial="hidden" animate="visible" exit="hidden">
			<motion.div className="dialog-images rounded-xl" variants={animateModal}>
				<div className="dialog-images-head px-4 py-3">
					<div className="dbh-left">
						Photo Box
					</div>
					<div className="dbh-right">
						<button>
							<img width="20" height="20" src="/images/svg/icon-cross.svg"
									 onClick={() => dispatch(toggleModalImages(modalImages))} alt=""/>
						</button>
					</div>
				</div>
				<div className="dialog-images-body text-center">
					<img className="dib-img" src="https://placeimg.com/160/160/arch" alt=""/>
					{modal.isText && (
						<div>
							<p className="font-bold dib-title mt-3">Item Name</p>
							<p className="font-semibold">Stock: 1</p>
						</div>
					)}
				</div>
			</motion.div>
		</motion.div>
	);
}
