'use client';
import s from './AboutProduct.module.scss';
import Image from 'next/image';
import pdf_icon from '@/imgs/pdf.svg';
import test1 from '@/imgs/Product/test1.png';
import test2 from '@/imgs/Product/test2.png';
import { useState } from 'react';
import { TableComponent } from './Table';
import { classNames } from '@/utils/classNames';
import { ProductItemType } from '@/types/products/product';

interface PropsType {
	product: ProductItemType;
}

export const AboutProduct = ({product}: PropsType) => {
	const [activeImg, setActiveImg] = useState<number>(1);
	const {dynamic_attr} = product;
	const shipmentPackaging =[
		{
			label: "packaging", 
			value: product.packaging ? product.packaging : "-"
		},
		{
			label: "packageInclude", 
			value: product.packageInclude ?  product.packageInclude : "-"
		},
		{
			label: "packageDimension", 
			value: product.packageDimension ?  product.packageDimension : "-"
		},
		{
			label: "packageWeight", 
			value: product.packageWeight ?  product.packageWeight : "-"
		},
	]

	const certification = dynamic_attr.find((el: any)=> el.label === 'Certification')?.value
	const properties = [
		['Min. Order Quantity', product.moq ? `${product.moq} units` : '-' ],
		['Factory lead time', product.leadTime ?  `${product.leadTime} days` : '-'],
		['Warranty', product.warranty ? `${product.warranty} month` : '-' ],
		['Certification', certification ?  `${certification}` : '-'],
		['Country of origin', product.countryOfOrigin ? `${product.countryOfOrigin}` : '-']
	]

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
			<TableComponent shipmentPackaging={shipmentPackaging} dynamic_attr={dynamic_attr} />
		</div>
	);
};
