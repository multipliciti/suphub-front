'use client';
import { classNames } from '@/utils/classNames';
import s from './ProductItem.module.scss';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
//imgs
import star_active from '@/imgs/Marketplace/Products/star_sctive.svg';
import test2 from '@/imgs/Product/test2.png';
import { useState } from 'react';
import { ResultItem } from '@/types/favorites/products';

export const ProductItem = (props: ResultItem) => {

	const user = useAppSelector((state)=> state.authSlice.user)
	const { push } = useRouter();
	const [favorite, setFavorite] = useState<boolean>(true);
	const dispatch = useAppDispatch();
	const { name, id, unitPrice } = props.product;

	const properties = [
		['MOQ', props.product.moq],
		['Lead time (weeks)', props.product.leadTime],
		['Warranty', props.product.warranty],
		// ['Certification', props.product.certification],
	];

	return (
		<>
			<div onClick={() => push(`favorites/product/${id}`)} className={s.wrapper}>
				<div className={s.img_wrapper}>
					<div className={s.img_star}>
						<Image src={star_active} alt="star" width={20} height={20} />
					</div>
					<Image className={s.img} src={test2} alt="img" width={244} height={212} />
				</div> 
				<div className={s.description_wrapper}>
					<h1 className={s.title}>{name} </h1>
					<h2 className={s.price}>
						<span className={s.price}>${unitPrice}</span>
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
		</>
	);
};
