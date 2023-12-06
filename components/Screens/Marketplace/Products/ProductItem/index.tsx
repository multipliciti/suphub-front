'use client';
import { classNames } from '@/utils/classNames';
import s from './ProductItem.module.scss';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
//imgs
import star from '@/imgs/Marketplace/Products/star.svg';
import star_active from '@/imgs/Marketplace/Products/star_sctive.svg';
import { ProductItemType } from '@/types/products/product';
import test2 from '@/imgs/Product/test2.png';
import { Api } from '@/services';
import { useEffect, useState } from 'react';
import { setModal } from '@/redux/slices/modal';

export const ProductItem = (props: ProductItemType) => {
	const { push } = useRouter();
	const user = useAppSelector((state) => state.authSlice.user);

	const dispatch = useAppDispatch();
	const { name, id, dynamic_attr, unitPrice, favorite } = props;
	const [favoriteStar, setFavoriteStar] = useState<boolean>(false);

	const certification = dynamic_attr.find((el: any) => el.label === 'Certification')
		?.value;
	const width = dynamic_attr.find((el: any) => el.label === 'Width')?.value;
	const heigth = dynamic_attr.find((el: any) => el.label === 'Heigth')?.value;
	const opening = dynamic_attr.find((el: any) => el.label === 'Opening Style')
		?.value;
	const frameMatireal = dynamic_attr.find((el: any) => el.label === 'Frame Material')
		?.value;
	const glassType = dynamic_attr.find((el: any) => el.label === 'Glazing Type')
		?.value;

	const properties = [
		['MOQ', props.moq ? `${props.moq} units` : '-'],
		['Lead time (weeks)', props.leadTime ? `${props.leadTime} days` : '-'],
		['Warranty', props.warranty ? `${props.warranty} month` : '-'],
		['Certification', certification ? `${certification}` : '-'],
		['Width', width ? `${width}"` : '-'],
		['Heigth', heigth ? `${heigth}"` : '-'],
		['Opening', opening ? `${opening}` : '-'],
		['Frame Material', frameMatireal ? `${frameMatireal}` : '-'],
		['Glazing Type', glassType ? `${glassType}` : '-'],
	];

	useEffect(() => {
		setFavoriteStar(favorite);
	}, [favorite]);

	const changeFavorite = async (id: number) => {
		if (!user) {
			dispatch(setModal('login'));
			return;
		}

		const api = Api();
		try {
			if (favoriteStar) {
				await api.product.removeFavorite(id);
				setFavoriteStar(false);
			} else {
				await api.product.addFavorite(id);
				setFavoriteStar(true);
			}
		} catch (error) {
			setFavoriteStar(!favoriteStar);
		}
	};

	return (
		<>
			<div onClick={() => push(`marketplace//product/${id}`)} className={s.wrapper}>
				<div className={s.img_wrapper}>
					<div
						onClick={(e) => {
							e.stopPropagation();
							changeFavorite(id);
						}}
						className={s.img_star}
					>
						<Image
							src={favoriteStar ? star_active : star}
							alt="star"
							width={20}
							height={20}
						/>
					</div>
					<button
						className={s.add}
						onClick={() => dispatch(setModal('addToRFQCart'))}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="21"
							height="20"
							viewBox="0 0 21 20"
							fill="none"
						>
							<path
								fill-rule="evenodd"
								clip-rule="evenodd"
								d="M10.75 4.25C11.1642 4.25 11.5 4.58579 11.5 5V9.25H15.75C16.1642 9.25 16.5 9.58579 16.5 10C16.5 10.4142 16.1642 10.75 15.75 10.75H11.5V15C11.5 15.4142 11.1642 15.75 10.75 15.75C10.3358 15.75 10 15.4142 10 15V10.75H5.75C5.33579 10.75 5 10.4142 5 10C5 9.58579 5.33579 9.25 5.75 9.25H10V5C10 4.58579 10.3358 4.25 10.75 4.25Z"
								fill="white"
							/>
						</svg>
						<span className={s.add_text}>Add to project</span>
					</button>
					<Image className={s.img} src={test2} alt="img" width={244} height={212} />
				</div>

				<div className={s.description_wrapper}>
					<h1 className={s.title}> {name} </h1>
					<h2 className={s.price}>
						<span className={s.price}>${unitPrice}</span>
						<span className={s.price_format}>/ Unit</span>
					</h2>

					{properties.map((el: any, ind: number) => {
						return (
							<div className={s.p} key={ind}>
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
