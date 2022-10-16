import {createSlice} from "@reduxjs/toolkit";

const initialState = {
	modalConfirmation: {
		loading: false,
		isOpen: false,
		isPlain: false,
		isSuccess: false,
		title: {
			en: "Confirmation",
		}
	},
	modalBoxes: {
		loading: false,
		isOpen: false,
		title: {
			en: "Project Boxes",
		}
	},
	modalImages: {
		loading: false,
		isOpen: false,
		isText: false,
		title: {
			en: "Photo Box",
		}
	},
	modalDetailTransaction: {
		loading: false,
		isOpen: false,
		title: {
			en: "Detail Transaction",
		}
	},
	modalClaimable: {
		loading: false,
		showItem: false,
		isOpen: false,
		title: {
			en: "Claim Box",
		}
	},
};

const modalSlice = createSlice({
	name: "modal",
	initialState,
	reducers: {
		toggleModalBoxes: (state, val) => {
			if (val.payload) {
				state.modalBoxes.loading = val.payload.loading;
				state.modalBoxes.isOpen = val.payload.isOpen;
				state.modalBoxes.title = val.payload.title;
			}
		},
		toggleModalImages: (state, val) => {
			if (val.payload) {
				if (val.payload.isText) {
					state.modalImages.loading = val.payload.loading;
					state.modalImages.isOpen = val.payload.isOpen;
					state.modalImages.isText = val.payload.isText;
					state.modalImages.title = val.payload.title;
				} else {
					state.modalImages.loading = val.payload.loading;
					state.modalImages.isOpen = val.payload.isOpen;
					state.modalImages.isText = val.payload.isText;
					state.modalImages.title = val.payload.title;
				}
			}
		},
		toggleModalConfirmation: (state, val) => {
			if (val.payload) {
				state.modalConfirmation.loading = val.payload.loading;
				state.modalConfirmation.isOpen = val.payload.isOpen;
				state.modalConfirmation.isPlain = val.payload.isPlain;
				state.modalConfirmation.isSuccess = val.payload.isSuccess;
				state.modalConfirmation.title = val.payload.title;
			}
		},
		toggleModalTransaction: (state, val) => {
			if (val.payload) {
				state.modalDetailTransaction.loading = val.payload.loading;
				state.modalDetailTransaction.isOpen = val.payload.isOpen;
				state.modalDetailTransaction.isPlain = val.payload.isPlain;
				state.modalDetailTransaction.isSuccess = val.payload.isSuccess;
				state.modalDetailTransaction.title = val.payload.title;
			}
		},
		toggleModalClaimable: (state, val) => {
			if (val.payload) {
				state.modalClaimable.loading = val.payload.loading;
				state.modalClaimable.showItem = val.payload.showItem;
				state.modalClaimable.isOpen = val.payload.isOpen;
				state.modalClaimable.title = val.payload.title;
			}
		},
	},
});

export const {
	toggleModalBoxes,
	toggleModalImages,
	toggleModalConfirmation,
	toggleModalTransaction,
	toggleModalClaimable
} = modalSlice.actions;
export default modalSlice.reducer;
