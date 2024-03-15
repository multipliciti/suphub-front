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
import { Api } from '@/services';
import { useEffect, useState } from 'react';
import { setModal } from '@/redux/slices/modal';
import { truncateFileNameEnd } from '@/utils/names';

type TypeProps = {
	product: ProductItemType;
};

export const ProductItem = ({ product }: TypeProps) => {
	const dispatch = useAppDispatch();
	const { name, id, dynamic_attr, favorite, images, unitOfMeasurement } = product;
	console.log('dynamic_attr', dynamic_attr);
	const { push } = useRouter();
	const user = useAppSelector((state) => state.authSlice.user);
	const [favoriteStar, setFavoriteStar] = useState<boolean>(false);
	//generate info product
	//find an object with the minimum value in the 'prices' array.
	const minPriceOfPrices =
		product.prices.length > 0
			? product.prices.reduce(function (prev, current) {
					return prev.value < current.value ? prev : current;
			  })
			: null;
	const minCountOfPrices =
		product.prices.length > 0
			? product.prices.reduce(function (prev, current) {
					return prev.minCount < current.minCount ? prev : current;
			  })
			: null;

	//generate properties
	//Excluding objects with null values and sorting them in the array dynamic_attr
	const dynamic_attr_corted = dynamic_attr
		.filter((obj) => obj.order !== null)
		.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

	//Converting the sorted objects according to the type we need
	const propertiesDynamicArray = dynamic_attr_corted.map((obj) => [
		`${obj.label}`,
		obj.value ? obj.value : '-',
	]);

	//generate static array
	const propertiesStaticArray = [
		[
			'MOQ',
			minCountOfPrices
				? `${minCountOfPrices.minCount} ${product.unitOfMeasurement}`
				: '-',
		],
		['Lead time (weeks)', product.leadTime ? `${product.leadTime}` : '-'],
		[
			'Warranty',
			product.warranty
				? `${product.warranty} ${product.warranty === 1 ? 'year' : 'years'}`
				: '-',
		],
	];
	//combining arrays
	const properties = propertiesStaticArray.concat(propertiesDynamicArray);

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
			<div className={s.wrapper}>
				<div className={s.img_wrapper}>
					<span
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
					</span>
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
								fillRule="evenodd"
								clipRule="evenodd"
								d="M10.75 4.25C11.1642 4.25 11.5 4.58579 11.5 5V9.25H15.75C16.1642 9.25 16.5 9.58579 16.5 10C16.5 10.4142 16.1642 10.75 15.75 10.75H11.5V15C11.5 15.4142 11.1642 15.75 10.75 15.75C10.3358 15.75 10 15.4142 10 15V10.75H5.75C5.33579 10.75 5 10.4142 5 10C5 9.58579 5.33579 9.25 5.75 9.25H10V5C10 4.58579 10.3358 4.25 10.75 4.25Z"
								fill="white"
							/>
						</svg>
						<span className={s.add_text}>Add to project</span>
					</button>
					<div
						onClick={() => push(`marketplace/product/${id}`)}
						className={s.img_wrapper_inner}
					>
						<Image
							layout="responsive"
							className={s.img}
							src={images[0]?.url ?? ''}
							alt="img"
							width={244}
							height={212}
						/>
					</div>
				</div>

				<div
					onClick={() => push(`marketplace/product/${id}`)}
					className={s.description_wrapper}
				>
					<h1 className={s.title}> {name} </h1>
					<h2 className={s.price}>
						<span className={s.price}>
							${minPriceOfPrices ? minPriceOfPrices.value : '-'}
						</span>
						<span className={s.price_format}>/ {unitOfMeasurement}</span>
					</h2>
					{properties.map((el: any, ind: number) => {
						return (
							<div key={ind} className={s.p}>
								<p
									className={classNames(
										s.row_wrapper,
										ind % 2 === 0 && s.row_backround
									)}
									key={ind}
								>
									<span className={classNames(s.row_key, s.text)}>{el[0]}</span>
									<span className={classNames(s.row_value, s.text)}>
										{truncateFileNameEnd(el[1], 19)}
									</span>
								</p>
							</div>
						);
					})}
				</div>
			</div>
		</>
	);
};
