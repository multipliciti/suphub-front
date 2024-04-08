'use client';
import { classNames } from '@/utils/classNames';
import s from './Invoice.module.scss';
// import { useRef } from 'react';

type TypeProps = {
	project: any;
};

export const Invoice = ({ project }: TypeProps) => {
	const string = `774 Jennings Court San Francisco, CA 94112 917-333-6767`;
	// const textareaRef = useRef<HTMLTextAreaElement>(null);

	// console.log('project.companyAddress', project.companyAddress);
	// const formattedAddress = project.companyAddress
	// 	? `${project.companyAddress.street}\n${project.companyAddress.city}, ${project.companyAddress.state} ${project.companyAddress.zipcode}\n${project.companyAddress.country}`
	// 	: 'Not address';
	//
	// // console.log('formattedAddress', formattedAddress);
	// const handleEditClick = () => {
	// 	if (textareaRef.current) {
	// 		textareaRef.current.focus();
	// 	}
	// };

	// const tableBataArr = [
	// 	{
	// 		title: 'Vinyl double single hung',
	// 		size: 'Size: 36” x 60”',
	// 		qty: '1',
	// 		price: '$70.35',
	// 		amount: '$70.35',
	// 	},
	// 	{
	// 		title: 'Vinyl double single hung',
	// 		size: 'Size: 36” x 60”',
	// 		qty: '1',
	// 		price: '$70.35',
	// 		amount: '$70.35',
	// 	},
	// 	{
	// 		title: 'Vinyl double single hung',
	// 		size: 'Size: 36” x 60”',
	// 		qty: '1',
	// 		price: '$70.35',
	// 		amount: '$70.35',
	// 	},
	// ];

	// const descriptionArr = [
	// 	{ key: 'Lead time (weeks):', value: '2' },
	// 	{ key: 'Payment terms:', value: '50% deposit, 50% before shipment' },
	// 	{ key: 'Certifications:', value: 'NFRC' },
	// 	{ key: 'Warranty (years):', value: '25' },
	// 	{ key: 'Shipment:', value: 'Air freight' },
	// ];

	return (
		<div className={s.wrapper}>
			{/* Manufacturer && Ship To */}

			<div className={s.info_ship}>
				<div className={s.block}>
					<p className={s.header}>Manufacturer</p>
					<p className={s.title}>
						{project.abbreviation} <br />
						<span className={s.subtitle}>{project.name}</span>
					</p>
				</div>

				<div className={s.block}>
					<p className={s.header}>Ship To</p>
					<span className={classNames(s.title)}>{string}</span>
				</div>
			</div>

			{/* Product table  */}

			<div className={s.info_product}>
				{/* here you need the conditions if there is at least 1 product for rendering */}
				{/* <table className={s.table}>
					<thead className={s.thead}>
						<tr className={s.tr}>
							<th>Product</th>
							<th>QTY</th>
							<th>Unit Price</th>
							<th>Amount</th>
						</tr>
					</thead>
					<tbody>
						{tableBataArr.map((product, ind) => {
							return (
								<tr className={s.tr} key={ind}>
									<td className={s.description}>
										<span className={s.title}>{product.title}</span>
										<span className={s.size}>{product.size}</span>
									</td>
									<td className={s.td_info}>{product.qty}</td>
									<td className={s.td_info}>{product.price}</td>
									<td className={s.td_info}>{product.amount}</td>
								</tr>
							);
						})}
					</tbody>
				</table> */}

				<div className={s.amount}>
					<p className={s.amount_shipping}>
						<span>Shipping</span> <span>$500.00</span>
					</p>
					<p className={s.amount_total}>
						<span>Total</span>
						<span>$640.70</span>
					</p>
				</div>
			</div>
			{/* <div className={s.items}>
				{descriptionArr.map((el, ind) => {
					return (
						<div key={ind} className={s.item}>
							<span className={s.item_key}>{el.key}</span>
							<span className={s.item_value}>{el.value}</span>
						</div>
					);
				})}
			</div> */}
		</div>
	);
};
