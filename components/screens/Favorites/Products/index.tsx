'use client';
import { ProductItemType } from '@/types/marketplace/product';
import s from './Products.module.scss';
import { useAppSelector } from '@/redux/hooks';
import { ProductItem } from './ProductItem/ProductItem';
interface ProductsPropsType {
	products1: ProductItemType[] | undefined;
	total: number;
	status: string;
}
export const Products = () => {
	const products = useAppSelector((state) => state.productSlice.favorites);

	return (
		<div className={s.wrapper}>
			<h3 className={s.title}>
				Results:
				<span className={s.title_result}> 7 products</span>
				<div className={s.products}>
					{products?.map((el, ind) => (
						<div key={ind} className={s.products_item}>
							<ProductItem {...el} />
						</div>
					))}
				</div>
			</h3>
		</div>
	);
};
