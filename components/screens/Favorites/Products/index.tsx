'use client';
import s from './Products.module.scss';
import { useAppSelector } from '@/redux/hooks';
import { ProductItem } from './ProductItem';
import { ResultItem } from '@/types/favorites/products';
interface ProductsPropsType {
	products: ResultItem[] | undefined;
	status: string;
}
export const Products = (props : ProductsPropsType) => {
	const { products } = props;
	const total = products?.length

	return (
		<div className={s.wrapper}>
			<h3 className={s.title}>
				Results:
				<span className={s.title_result}>  {total} products </span>
			</h3>
			<div className={s.products}>
				{products?.map((el, ind) => (
					<div key={ind} className={s.products_item}>
						<ProductItem {...el} />
					</div>
				))}
			</div>
		</div>
	);
};
