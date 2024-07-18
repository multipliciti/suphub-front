'use client';
import { useState } from 'react';
import s from './AboutProduct.module.scss';
import Image from 'next/image';
import { TableComponent } from './Table';
import { classNames } from '@/utils/classNames';
import { useRouter } from 'next/navigation';
import { ProductItemType } from '@/types/products/product';

interface PropsType {
	product: ProductItemType;
}

export const AboutProduct = ({ product }: PropsType) => {
	const [activeImg, setActiveImg] = useState<number>(0);
	const router = useRouter();
	const { dynamic_attr, images } = product;
	//generate info product

	const handleRedirectToSellerPage = () => {
		router.push('/suppliers/' + product.seller.id);
	};

	const shipmentPackaging = [
		{
			label: 'packaging',
			value: product.packaging ? product.packaging : '-',
		},
		{
			label: 'packageInclude',
			value: product.packageInclude ? product.packageInclude : '-',
		},
		{
			label: 'packageDimension',
			value: product.packageDimension ? product.packageDimension : '-',
		},
		{
			label: 'packageWeight',
			value: product.packageWeight ? product.packageWeight : '-',
		},
	];

	//generate properties
	const minCountOfPrices =
		product.prices.length > 0
			? product.prices.reduce(function (prev, current) {
					return prev.minCount < current.minCount ? prev : current;
			  })
			: null;

	const certification = dynamic_attr.find((el: any) => el.label === 'Certification')
		?.value;
	const properties = [
		[
			'Min. Order Quantity',
			minCountOfPrices
				? `${minCountOfPrices.minCount} ${product.unitOfMeasurement}`
				: '-',
		],
		['Lead time (weeks)', product.leadTime ? `${product.leadTime} ` : '-'],
		[
			'Warranty',
			product.warranty
				? `${product.warranty} ${product.warranty === 1 ? 'year' : 'years'}`
				: '-',
		],
		['Certification', certification ? `${certification}` : '-'],
		[
			'Country of origin',
			product.countryOfOrigin ? `${product.countryOfOrigin}` : '-',
		],
	];

	return (
		<div>
			<div className={s.product}>
				<div className={s.product_images}>
					<div className={s.product_images_wrapper}>
						<Image
							layout="responsive"
							className={s.product_images_img}
							src={images[activeImg]?.url ?? ''}
							alt="product"
							width={420}
							height={420}
						/>
					</div>
					<div className={s.product_images_chose}>
						{images?.map((el, ind) => {
							return (
								<Image
									onClick={() => setActiveImg(ind)}
									key={ind}
									className={classNames(
										s.chose_img,
										ind === activeImg && s.chose_img_active
									)}
									src={el.url ?? ''}
									alt="product"
									width={80}
									height={80}
								/>
							);
						})}
					</div>
				</div>
				<div className={s.product_description}>
					<p className={s.subtitle} onClick={handleRedirectToSellerPage}>
						{product.seller.name}
					</p>
					<h3 className={s.title}> {product.name} </h3>

					<div className={s.product_description_wrap}>
						{properties.map((el, ind) => {
							return (
								<div className={s.product_description_item} key={ind}>
									<p className={s.key}>{el[0]}</p>
									<p className={s.value}>{el[1]}</p>
								</div>
							);
						})}
					</div>
				</div>
			</div>
			<TableComponent
				shipmentPackaging={shipmentPackaging}
				dynamic_attr={dynamic_attr}
			/>
		</div>
	);
};
