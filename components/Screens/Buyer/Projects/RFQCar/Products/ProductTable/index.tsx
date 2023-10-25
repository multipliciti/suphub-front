'use client';
import { classNames } from '@/utils/classNames';
import s from './ProductTable.module.scss';
import Image from 'next/image';
import chat_image from '@/imgs/Buyer&Seller/chat_icon.svg';

interface TypeProps {
	properties: any;
}

export const ProductTable = ({ properties }: TypeProps) => {
	console.log('properties', properties);
	const arrTableHead = [
		{
			title: 'Product',
			id: 1,
		},
		{
			title: 'Chat',
			id: 2,
		},
		{
			title: 'Size',
			id: 3,
		},
		{
			title: 'Quantity',
			id: 4,
		},
		{
			title: 'Unit',
			id: 5,
		},
		{
			title: 'Status',
			id: 6,
		},
		{
			title: 'Unit Budget',
			id: 7,
		},
	];

	return (
		<div className={s.wrapper}>
			<table className={classNames(s.table)}>
				{/* thead */}
				<thead className={s.thead}>
					<tr>
						<th>
							<label htmlFor={s.input_label}>
								<input className={s.input_checkbox} type="checkbox" />
							</label>
						</th>
						{arrTableHead.map((column, ind) => (
							<th key={ind}>{column.title}</th>
						))}
					</tr>
				</thead>

				{/* tbody  */}
				<tbody className={s.tbody}>
					{properties.map((property: any, ind: number) => (
						<tr key={ind}>
							{/* title  */}
							<td>
								<label htmlFor={s.input_label}>
									<input className={s.input_checkbox} type="checkbox" />
								</label>
							</td>
							<td>
								<span className={s.subtitle}>{property.items.subtitle}</span>
								<p className={s.title}>{property.items.title}</p>
							</td>
							{/* chat */}
							<td>
								<span className={s.chat}>
									<Image src={chat_image} alt="chat_image" width={24} height={24} />
									<div
										className={classNames(
											s.chat_sms,
											property.items.chat > 0 && s.chat_sms_active
										)}
									>
										<span className={s.chat_number}>{property.items.chat}</span>
									</div>
								</span>
							</td>
							{/* size  */}
							<td className={s.size}>{property.items.size}</td>
							{/* Quantity  */}
							<td>{property.items.quantity}</td>
							{/* Unit  */}
							<td>{property.items.unit}</td>
							{/* Status  */}
							<td>
								<span
									className={classNames(
										s.status,
										property.items.status === 'Selection needed' && s.status_needed,
										property.items.status === 'Sampling' && s.status_sampling,
										property.items.status === 'Ordered' && s.status_ordered
									)}
								>
									{property.items.status}
								</span>
							</td>
							{/* Unit Budget  */}
							<td>${property.items.unitbudget}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};
