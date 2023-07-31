'use client';
import { classNames } from '@/utils/classNames';
import s from './ProductItem.module.scss';
import Image from 'next/image';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { toggleFavorite } from '@/redux/slices/marketplace/products';
//imgs
import star from '@/imgs/Marketplace/Products/star.svg';
import star_active from '@/imgs/Marketplace/Products/star_sctive.svg';

export const ProductItem = ({ item }: any) => {
	const dispatch = useAppDispatch();
	const { img, id, title, price, description } = item;
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
				<Image className={s.img} src={img} alt="img" width={244} height={212} />
			</div>
			<div className={s.description_wrapper}>
				<h1 className={s.title}>{title}</h1>
				<h2 className={s.price}>
					<span className={s.price}>${price}</span>
					<span className={s.price_format}>/ Unit</span>
				</h2>

				{Object.entries(description).map((el, ind) => {
					return (
						<div className={s.p}>
							<p
								className={classNames(
									s.row_wrapper,
									ind % 2 === 0 && s.row_backround
								)}
								key={ind}
							>
								<span className={classNames(s.row_key, s.text)}>{el[0]}:</span>
								<span className={classNames(s.row_value, s.text)}>
									{el[1] as string}
								</span>
							</p>
						</div>
					);
				})}
			</div>
		</div>
	);
};
