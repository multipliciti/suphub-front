'use client';
import s from './AboutProduct.module.scss';
import Image from 'next/image';
import pdf_icon from '@/imgs/pdf.svg';
import test1 from '@/imgs/Product/test1.png';
import test2 from '@/imgs/Product/test2.png';
import { useState } from 'react';
import { TableComponent } from './Table';
import { classNames } from '@/utils/classNames';
import { ProductItemType } from '@/types/marketplace/product';

interface PropsType {
	product: ProductItemType;
}

export const AboutProduct = (props: PropsType) => {
	const { product } = props;
	const [activeImg, setActiveImg] = useState<number>(1);

	const tablesData = [
		{
			id: 1,
			title: 'Specification',
			arr: [
				{ id: 1, key: 'Frame types', value: 'Aluminum' },
				{ id: 2, key: 'Opening styles', value: 'Laminated glass, Safety glass' },
				{ id: 3, key: 'Glazing type', value: 'Laminated glass, Safety glass' },
				{
					id: 4,
					key: 'Accessories',
					value: `Nailing fin
Installation clips`,
				},
				{ id: 5, key: 'Center-of-glass U-factor', value: 'Range' },
				{ id: 6, key: 'Whole assembly U-value', value: 'Range' },
				{ id: 7, key: 'R-Value', value: 'Range' },
				{ id: 8, key: 'SHGC', value: 'Range between 0 - 1' },
				{ id: 9, key: 'Visible Transmittance', value: 'Range between 0 - 1' },
				{ id: 10, key: 'Air Leakage', value: 'Range between 0.1 - 0.3' },
				{
					id: 11,
					key: 'Condensation Resistance',
					value: 'RaRange between 1 - 100nge',
				},
				{ id: 12, key: 'Sound Transmission Class', value: 'Range between 18 - 38' },
				{ id: 13, key: 'Interior Color', value: '-' },
				{ id: 14, key: 'Exterior Color', value: '-' },
				{ id: 15, key: 'Grid Pattern', value: '-' },
				{ id: 16, key: 'Grille Type', value: '-' },
				{ id: 17, key: 'Finish Hardware Color', value: '-' },
				{ id: 19, key: 'Lock Type', value: '-' },
				{ id: 20, key: 'Forced Entry', value: '-' },
				{ id: 21, key: 'Performance Class and Grade', value: '-' },
				{ id: 22, key: 'Structural Rating', value: '-' },
				{ id: 23, key: 'Weather Stripping', value: '-' },
				{ id: 24, key: 'Sound Transmission Class (STC)', value: '-' },
				{ id: 25, key: 'Water Resistance', value: '-' },
			],
		},
		{
			id: 2,
			title: 'Shipment & Packaging',
			arr: [
				{ id: 1, key: 'Packaging', value: '-' },
				{ id: 2, key: 'Packaging dimensions', value: '-' },
				{ id: 3, key: 'Images', value: '-' },
			],
		},
	];
	const dynamic_attr = product.dynamic_attr
	const certification = dynamic_attr.find((el: any)=> el.label === 'Certification')?.value
	const properties = [
		['Min. Order Quantity', product.moq ? `${product.moq} units` : '-' ],
		['Factory lead time', product.leadTime ?  `${product.leadTime} days` : '-'],
		['Warranty', product.warranty ? `${product.warranty} month` : '-' ],
		['Certification', certification ?  `${certification}` : '-'],
	];

	const images = [
		{
			img: test1,
			id: 1,
		},
		{
			img: test2,
			id: 2,
		},
	];
	const activeImgRender = images.find((el) => {
		return el.id === activeImg;
	});

	return (
		<div>
			<div className={s.product}>
				<div className={s.product_images}>
					<Image
						className={s.product_images_img}
						src={activeImgRender?.img || ''}
						alt="product"
						width={420}
						height={420}
					/>
					<div className={s.product_images_chose}>
						{images.map((el, ind) => {
							return (
								<Image
									onClick={() => setActiveImg(el.id)}
									key={ind}
									className={classNames(
										s.chose_img,
										el.id === activeImg && s.chose_img_active
									)}
									src={el.img}
									alt="product"
									width={80}
									height={80}
								/>
							);
						})}
					</div>
				</div>
				<div className={s.product_description}>
					<p className={s.subtitle}>Weika Windows</p>
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
			<TableComponent tables={tablesData} />
		</div>
	);
};
