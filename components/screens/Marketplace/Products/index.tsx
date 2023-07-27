'use client';
import s from './Products.module.scss';
import { useState } from 'react';
import { ProductItem } from './ProductItem';
//imgs
import product from '@/imgs/Marketplace/Products/Product_test.png';
export const Products = () => {
	const [products, setProducts] = useState([
		{
			img: product,
			id: 1,
			title: 'Vinyl Double Pane Fixed Window...',
			price: 1,
			description: {
				MOQ: '10 units',
				'Lead time (weeks)': '40-50 days',
				Warranty: '12 month',
				Certification: 'AAMA, NFRC...',
				Width: '36”',
				Height: '60”',
				Opening: 'Casement',
				'Frame material': 'Aluminum frame',
				'Glass type': 'Safety glass',
			},
		},
		{
			img: product,
			id: 2,
			title: 'Vinyl Double Pane Fixed Window...',
			price: 1,
			description: {
				MOQ: '10 units',
				'Lead time (weeks)': '40-50 days',
				Warranty: '12 month',
				Certification: 'AAMA, NFRC...',
				Width: '36”',
				Height: '60”',
				Opening: 'Casement',
				'Frame material': 'Aluminum frame',
				'Glass type': 'Safety glass',
			},
		},
		{
			img: product,
			id: 3,
			title: 'Vinyl Double Pane Fixed Window...',
			price: 1,
			description: {
				MOQ: '10 units',
				'Lead time (weeks)': '40-50 days',
				Warranty: '12 month',
				Certification: 'AAMA, NFRC...',
				Width: '36”',
				Height: '60”',
				Opening: 'Casement',
				'Frame material': 'Aluminum frame',
				'Glass type': 'Safety glass',
			},
		},
		{
			img: product,
			id: 4,
			title: 'Vinyl Double Pane Fixed Window...',
			price: 1,
			description: {
				MOQ: '10 units',
				'Lead time (weeks)': '40-50 days',
				Warranty: '12 month',
				Certification: 'AAMA, NFRC...',
				Width: '36”',
				Height: '60”',
				Opening: 'Casement',
				'Frame material': 'Aluminum frame',
				'Glass type': 'Safety glass',
			},
		},
	]);

	return (
		<div className={s.wrapper}>
			<div className={s.results}>
				Results: <span className={s.results_text}> 9,158 products </span>
			</div>

			<div className={s.products}>
				{products.map((el, ind) => {
					return <ProductItem key={ind} item={el} />;
				})}
			</div>
		</div>
	);
};
