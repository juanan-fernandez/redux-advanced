import { useSelector } from 'react-redux';

import Card from '../UI/Card';
import classes from './Cart.module.css';
import CartItem from './CartItem';

const Cart = props => {
	const cartItems = useSelector(state => state.cart.products);
	const showCart = useSelector(state => state.cartButton.showCart);
	const totalCart = useSelector(state => state.cart.totalCart);

	return (
		<>
			{showCart && cartItems.length && (
				<Card className={classes.cart}>
					<h2>Your Shopping Cart</h2>
					<ul>
						{cartItems.map(item => (
							<CartItem
								key={item.product}
								item={{
									title: item.product,
									quantity: item.qty,
									total: +item.totalItem,
									price: item.price,
								}}
							/>
						))}
					</ul>
					<p>Total Amount: {totalCart}</p>
				</Card>
			)}
		</>
	);
};

export default Cart;
