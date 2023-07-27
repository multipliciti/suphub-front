'use client';
import s from './ProductItem.module.scss';
import Image from 'next/image';

export const ProductItem = ({ item }: any) => {
	const { img, id, title, price, description } = item;
	console.log(Object.entries(description));
	console.log();
	return (
		<div className={s.wrapper}>
			<div className={s.img_wrapper}>
				<Image src={img} alt="img" width={244} height={212} />
			</div>
			<div className={s.description_wrapper}>
				<h1 className={s.title}>{title}</h1>
				<h2 className={s.price}>
					<span className={s.price}>{price}</span>
					<span className={s.price_format}>/ Unit</span>
				</h2>

				{Object.entries(description).map((el) => {
					return (
						<div>
							{' '}
							{el[0]} {el[0]}{' '}
						</div>
					);
				})}
			</div>
		</div>
	);
};
