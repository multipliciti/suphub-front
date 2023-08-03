'use client';
import { classNames } from '@/utils/classNames';
import s from './ProductItem.module.scss';
import Image from 'next/image';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { toggleFavorite } from '@/redux/slices/marketplace/products';
//imgs
import star from '@/imgs/Marketplace/Products/star.svg';
import star_active from '@/imgs/Marketplace/Products/star_sctive.svg';
import { ProductItemType } from '@/types/marketplace/product';
import test2 from '@/imgs/Marketplace/Products/product_test2.jpeg';

export const ProductItem = (props: ProductItemType) => {
	const dispatch = useAppDispatch();
	const { name, id, attr } = props;
	const favorite = useAppSelector((state) => state.productSlice.favorite);
	const selected = favorite.includes(id);

	return (
		<div className={s.wrapper}>
			<div className={s.img_wrapper}>
				<div onClick={() => dispatch(toggleFavorite(id))} className={s.img_star}>
					<Image
						src={selected ? star_active : star}
						alt="star"
						width={20}
						height={20}
					/>
				</div>
				<Image className={s.img} src={test2} alt="img" width={244} height={212} />
			</div>
			<div className={s.description_wrapper}>
				<h1 className={s.title}>{name} </h1>
				<h2 className={s.price}>
					<span className={s.price}>$400</span>
					<span className={s.price_format}>/ Unit</span>
				</h2>

				{attr.map((el, ind) => {
					return (
						<div className={s.p}>
							<p
								className={classNames(
									s.row_wrapper,
									ind % 2 === 0 && s.row_backround
								)}
								key={ind}
							>
								<span className={classNames(s.row_key, s.text)}>
									{el.attributeDescription}
								</span>
								<span className={classNames(s.row_value, s.text)}>
									{el.value || 'not'}
								</span>
							</p>
						</div>
					);
				})}
			</div>
		</div>
	);
};
