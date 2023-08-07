'use client';
import { classNames } from '@/utils/classNames';
import s from './ProductItem.module.scss';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { toggleFavorite } from '@/redux/slices/marketplace/products';
import { transformAttributesToObj } from './helpers';
//imgs
import star from '@/imgs/Marketplace/Products/star.svg';
import star_active from '@/imgs/Marketplace/Products/star_sctive.svg';
import { ProductItemType } from '@/types/marketplace/product';
import test2 from '@/imgs/Product/test2.png';

export const ProductItem = (props: any) => {
	const { push } = useRouter();
	const dispatch = useAppDispatch();
	const { name, id, dynamic_attr } = props;
	const favorite = useAppSelector((state) => state.productSlice.favorite);
	const selected = favorite.includes(id);

	const properties = [
		['MOQ', props.minOrder],
		['Lead time (weeks)', props.leadTime],
		['Warranty', props.warranty],
		['Certification', props.certification],
	];

	const specificProperties = Object.entries(transformAttributesToObj(dynamic_attr));
	specificProperties.forEach((el) => {
		properties.push(el);
	});

	return (
		<div onClick={() => push(`/product/${id}`)} className={s.wrapper}>
			<div className={s.img_wrapper}>
				<div
					onClick={(e) => {
						e.stopPropagation();
						dispatch(toggleFavorite(id));
					}}
					className={s.img_star}
				>
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

				{properties.map((el: any, ind: number) => {
					return (
						<div className={s.p}>
							<p
								className={classNames(
									s.row_wrapper,
									ind % 2 === 0 && s.row_backround
								)}
								key={ind}
							>
								<span className={classNames(s.row_key, s.text)}>{el[0]}</span>
								<span className={classNames(s.row_value, s.text)}>{el[1]}</span>
							</p>
						</div>
					);
				})}
			</div>
		</div>
	);
};
