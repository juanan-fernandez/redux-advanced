import { configureStore } from '@reduxjs/toolkit';

import cartSlice from './cart-slice';
import cartBtnSlice from './cart-button-slice';
import uiSlice from './ui-slice';

const store = configureStore({
	reducer: {
		cart: cartSlice.reducer,
		cartButton: cartBtnSlice.reducer,
		ui: uiSlice.reducer,
	},
});

export default store;
