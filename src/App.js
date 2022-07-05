import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import Notification from './components/UI/Notification';
import { saveCart, fetchCartData } from './store/cart-slice';

let isInitialLoad = true;

function App() {
	const dispatch = useDispatch();
	const cart = useSelector(state => state.cart);
	const notificationConfig = useSelector(state => state.ui.notification);
	useEffect(() => {
		dispatch(fetchCartData());
	}, [dispatch]);

	useEffect(() => {
		if (isInitialLoad) {
			isInitialLoad = false;
			return;
		}
		if (cart.changed) dispatch(saveCart(cart));
	}, [cart, dispatch]);

	return (
		<>
			{notificationConfig.showme && (
				<Notification
					status={notificationConfig.status}
					title={notificationConfig.title}
					message={notificationConfig.message}
				/>
			)}
			<Layout>
				<Cart />
				<Products />
			</Layout>
		</>
	);
}

export default App;
