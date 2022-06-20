import { configureStore } from '@reduxjs/toolkit';

import cartSlice from './cart-slice';
import cartBtnSlice from './cart-button-slice';

const store = configureStore({
	reducer: { cart: cartSlice.reducer, cartButton: cartBtnSlice.reducer },
});

export default store;
