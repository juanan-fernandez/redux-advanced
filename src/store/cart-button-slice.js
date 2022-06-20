import { createSlice } from '@reduxjs/toolkit';

const initialCartState = {
	showCart: false,
};

const cartBtnSlice = createSlice({
	name: 'cart',
	initialState: initialCartState,
	reducers: {
		toggleView: state => {
			state.showCart = !state.showCart;
		},
	},
});

export default cartBtnSlice;
export const { toggleView } = cartBtnSlice.actions;
