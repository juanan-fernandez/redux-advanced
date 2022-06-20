import { createSlice } from '@reduxjs/toolkit';

const initialCartState = {
	products: [],
	totalCart: 0,
};

//cada posición del array de productos
// {
//    product: '',
//    qty: 0,
//    price: 0,
//    totalItem: 0,
// },

const getTotalCart = cart => {
	return cart.reduce((acc, curr) => {
		return (acc += +curr.totalItem);
	}, 0);
};

const cartSlice = createSlice({
	name: 'cart',
	initialState: initialCartState,
	reducers: {
		addProduct: (state, action) => {
			const { productId, productPrice } = action.payload;

			const productIdIndex = state.products.findIndex(
				item => item.product === productId
			);
			if (productIdIndex >= 0) {
				const quantity = state.products[productIdIndex].qty + 1;
				const total = (quantity * productPrice).toFixed(2);
				state.products[productIdIndex] = {
					...state.products[productIdIndex],
					qty: quantity,
					totalItem: total,
				};
			} else {
				const newProduct = {
					product: productId,
					qty: 1,
					price: productPrice,
					totalItem: productPrice,
				};

				state.products.push(newProduct);
			}

			const totalAmountCart = getTotalCart(state.products);
			state.totalCart = totalAmountCart.toFixed(2);
		},

		removeProduct: (state, action) => {
			const { productId, productPrice } = action.payload;

			const productIdIndex = state.products.findIndex(
				item => item.product === productId
			);

			if (productIdIndex >= 0) {
				const quantity = state.products[productIdIndex].qty - 1;
				if (quantity <= 0) {
					state.products = state.products.filter(item => item.product !== productId);
				} else {
					const total = (quantity * productPrice).toFixed(2);
					state.products[productIdIndex] = {
						...state.products[productIdIndex],
						qty: quantity,
						totalItem: total,
					};
				}
				const totalAmountCart = getTotalCart(state.products);
				state.totalCart = totalAmountCart.toFixed(2);
			}
		},
	},
});

export default cartSlice;
export const { addProduct, removeProduct } = cartSlice.actions;
