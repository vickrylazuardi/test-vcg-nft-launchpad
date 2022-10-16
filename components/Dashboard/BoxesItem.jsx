import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {toggleModalImages} from "../../redux/modalReducer";

export default function BoxesItem() {
	const dispatch = useDispatch();
	const [items] = useState([1, 2, 3, 4, 5]);
	const [boxItem] = useState(['CrossOut(1)', 'Deadly Weapon(1)', 'City Black(1)']);
	const modalImages = {
		loading: false,
		isOpen: true,
		isText: false,
		title: {
			en: "Photo Box",
		}
	}
	const modalImagesText = {
		loading: false,
		isOpen: true,
		isText: true,
		title: {
			en: "Photo Box",
		}
	}
	const bgChipsRequest = {
		backgroundColor: "#FFD4C2",
		color: "#E28058"
	};
	const bgChipsApproved = {
		backgroundColor: "#C4FBCA",
		color: "#40D04F"
	};
	return (
		<tbody>
		{items.map((item, index) => (
			<tr key={index}>
				<td className="text-center">{index + 1}</td>
				<td className="dialog-boxes-image">
					<img onClick={()=>dispatch(toggleModalImages(modalImages))} src="https://placeimg.com/160/160/arch" alt=""/>
				</td>
				<td className="dialog-boxes-name text-center">
					Small Box
				</td>
				<td className="text-center">Price 300, Stock 10</td>
				<td className="text-center">
					{boxItem.map((value,i)=>(
						<span key={i} onClick={()=>dispatch(toggleModalImages(modalImagesText))} className="boxes-item-list">{value + ", "}</span>
					))}
				</td>
			</tr>
		))}
		</tbody>
	);
}
