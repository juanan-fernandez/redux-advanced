import { useSelector } from 'react-redux';

import Card from '../UI/Card';
import classes from './Cart.module.css';
import CartItem from './CartItem';

const Cart = props => {
	const cartItems = useSelector(state => state.cart.products);
	const showCart = useSelector(state => state.cartButton.showCart);
	const totalCart = useSelector(state => state.cart.totalCart);

	if (showCart && !cartItems.length) {
		return (
			<Card className={classes.cart}>
				<h2>Your Shopping Cart is Empty!</h2>
				<p>Let's start adding products</p>
			</Card>
		);
	}

	return (
		<>
			{showCart && cartItems.length && (
				<Card className={classes.cart}>
					<h2>Your Shopping Cart</h2>
					<ul>
						{cartItems.map(item => (
							<CartItem
								key={item.id}
								item={{
									id: item.id,
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
