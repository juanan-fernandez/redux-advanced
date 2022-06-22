import { createSlice } from '@reduxjs/toolkit';

import { showNotification } from './ui-slice';

const initialCartState = {
	products: [],
	totalCart: 0,
};

//cada posición del array de productos
// {
//		id:0,
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
		replaceCart: (state, action) => {
			const { products, totalCart } = action.payload;
			state.products = products;
			state.totalCart = totalCart;
		},

		addProduct: (state, action) => {
			const { productId, productTitle, productPrice } = action.payload;

			const productIdIndex = state.products.findIndex(item => item.id === productId);
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
					id: productId,
					product: productTitle,
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
			const { productId } = action.payload;

			const existingCartItem = state.products.find(item => item.id === productId);
			if (existingCartItem.qty === 1) {
				state.products = state.products.filter(item => item.id !== productId);
			} else {
				existingCartItem.qty--;
				existingCartItem.totalItem = (
					existingCartItem.totalItem - existingCartItem.price
				).toFixed(2);
			}

			const totalAmountCart = getTotalCart(state.products);
			state.totalCart = totalAmountCart.toFixed(2);
		},
	},
});

export const saveCart = cart => {
	return async dispatch => {
		dispatch(
			showNotification({
				status: '',
				title: 'Saving...',
				message: 'Sending Cart data...',
			})
		);

		const saveData = async () => {
			const response = await fetch(
				'https://redux-cart-shopping-default-rtdb.firebaseio.com/cart.json',
				{
					method: 'PUT',
					body: JSON.stringify(cart),
				}
			);

			if (!response.ok) {
				throw new Error('Error: saving cart to DataBase');
			}
		};

		try {
			await saveData();
			dispatch(
				showNotification({
					status: 'success',
					title: 'Saved',
					message: 'Cart has been saved successfully',
				})
			);
		} catch (err) {
			dispatch(
				showNotification({
					status: 'error',
					title: 'Error saving Cart',
					message: err.message,
				})
			);
		}
	};
};

export const fetchCartData = cart => {
	return async dispatch => {
		const fetchData = async () => {
			const response = await fetch(
				'https://redux-cart-shopping-default-rtdb.firebaseio.com/cart.json'
			);
			const data = await response.json();
			return data;
		};

		try {
			const cartData = await fetchData();
			dispatch(
				cartSlice.actions.replaceCart({
					products: cartData.products || [],
					totalCart: cartData.totalCart || 0,
				})
			);
		} catch (err) {
			dispatch(
				showNotification({
					status: 'error',
					title: 'Error saving Cart',
					message: err.message,
				})
			);
		}
	};
};

export default cartSlice;
export const { addProduct, removeProduct } = cartSlice.actions;
