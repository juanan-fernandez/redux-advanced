import ProductItem from './ProductItem';
import classes from './Products.module.css';

import { testProducts } from '../../data/products-dummy';

const Products = props => {
	return (
		<section className={classes.products}>
			<h2>Buy your favorite products</h2>
			<ul>
				{testProducts.map(product => {
					return (
						<ProductItem
							key={product.id}
							id={product.id}
							title={product.title}
							price={product.price}
							description={product.description}
						/>
					);
				})}
			</ul>
		</section>
	);
};

export default Products;
