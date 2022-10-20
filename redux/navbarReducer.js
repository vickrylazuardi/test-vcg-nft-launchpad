import {createSlice} from "@reduxjs/toolkit";

const initialState = {
	dataNavbar: {
		title: 'Launchpad',
		status: 0
	}
};

const navbarMobSlice = createSlice({
	name: "navbarMob",
	initialState,
	reducers: {
		toggleNavbar: (state, val) => {
			if (val.payload) {
				state.dataNavbar.title = val.payload.title;
				state.dataNavbar.status = val.payload.status;
				console.log(initialState.dataNavbar)
			}
		}
	},
});

export const {
	toggleNavbar
} = navbarMobSlice.actions;
export default navbarMobSlice.reducer;
