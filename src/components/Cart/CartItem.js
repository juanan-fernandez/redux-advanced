import { useDispatch } from 'react-redux';
import { addProduct, removeProduct } from '../../store/cart-slice';

import classes from './CartItem.module.css';

const CartItem = props => {
	const { id, title, quantity, total, price } = props.item;

	const dispatch = useDispatch();
	const addProductHandler = productToAdd => {
		dispatch(addProduct(productToAdd));
	};

	const minusProductHandler = productToRemove => {
		dispatch(removeProduct(productToRemove));
	};

	return (
		<li className={classes.item}>
			<header>
				<h3>{title}</h3>
				<div className={classes.price}>
					${total.toFixed(2)}{' '}
					<span className={classes.itemprice}>(${price.toFixed(2)}/item)</span>
				</div>
			</header>
			<div className={classes.details}>
				<div className={classes.quantity}>
					x <span>{quantity}</span>
				</div>
				<div className={classes.actions}>
					<button onClick={() => minusProductHandler({ productId: id })}>-</button>
					<button
						onClick={() =>
							addProductHandler({ productId: id, productPrice: price })
						}
					>
						+
					</button>
				</div>
			</div>
		</li>
	);
};

export default CartItem;
