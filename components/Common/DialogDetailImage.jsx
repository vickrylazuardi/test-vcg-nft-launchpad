import {useDispatch, useSelector} from "react-redux";
import {toggleModalImages} from "../../redux/modalReducer";

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
	return (
		<div id="dialog-images-overlay">
			<div className="dialog-images rounded-xl">
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
			</div>
		</div>
	);
}
