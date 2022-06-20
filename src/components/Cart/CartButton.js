import { useSelector, useDispatch } from 'react-redux';

import { toggleView } from '../../store/cart-button-slice';
import classes from './CartButton.module.css';

const CartButton = props => {
	const dispatch = useDispatch();
	const cartItems = useSelector(state => state.cart.products);
	const toggleViewHandler = () => {
		dispatch(toggleView());
	};

	const totalItems = cartItems.reduce((acc, curr) => (acc += curr.qty), 0);

	return (
		<button className={classes.button} onClick={toggleViewHandler}>
			<span>My Cart</span>
			<span className={classes.badge}>{totalItems}</span>
		</button>
	);
};

export default CartButton;
