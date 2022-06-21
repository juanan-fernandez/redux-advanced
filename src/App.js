import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import Notification from './components/UI/Notification';
import { showNotification } from './store/ui-slice';

let isInitialLoad = true;
const urlFb = 'https://redux-cart-shopping-default-rtdb.firebaseio.com/cart.json';

function App() {
	const dispatch = useDispatch();
	const cart = useSelector(state => state.cart);
	const notificationConfig = useSelector(state => state.ui.notification);
	useEffect(() => {
		if (isInitialLoad) {
			isInitialLoad = false;
			return;
		}
		const saveData = async () => {
			dispatch(
				showNotification({
					status: '',
					title: 'Saving...',
					message: 'Saving Cart to firebase',
				})
			);
			const response = await fetch(urlFb, {
				method: 'PUT',
				body: JSON.stringify(cart),
			});

			if (!response.ok) {
				throw new Error('Error: saving cart to DataBase');
			}

			dispatch(
				showNotification({
					status: 'success',
					title: 'Saved',
					message: 'Cart has been saved successfully',
				})
			);
		};

		saveData().catch(err => {
			dispatch(
				showNotification({
					status: 'error',
					title: 'Error saving Cart',
					message: err.message,
				})
			);
		});
	}, [cart, dispatch]);

	return (
		<>
			<Notification
				status={notificationConfig.status}
				title={notificationConfig.title}
				message={notificationConfig.message}
			/>
			<Layout>
				<Cart />
				<Products />
			</Layout>
		</>
	);
}

export default App;
