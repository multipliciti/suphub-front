'use client';
import s from './Products.module.scss';
import { useAppSelector } from '@/redux/hooks';
import { ProductItem } from './ProductItem';
import { ProductItemType } from '@/types/products/product';
import { NoResults } from '../NoResults';

interface ProductsPropsType {
	products: ProductItemType[] | undefined;
	status: string;
}
export const Products = ({products, status} : ProductsPropsType) => {
	const total = products?.length || 0
	

	return (
		<div className={s.wrapper}>
			<h3 className={s.title}>
				Results:
				<span className={s.title_result}>  {total} products </span>
			</h3>
			{status === 'pendung' && <div> Loading...</div>}
			{status === 'rejected' && <div> Error! </div>}
			{products && products.length < 1 && status === 'seccess' && <NoResults />}
			<div className={s.products}>
				{total > 0 && products?.map((el, ind) => (
					<div key={ind} className={s.products_item}>
					<ProductItem {...el} />
					</div>
				))}
			</div>
			
		</div>
	);
};
