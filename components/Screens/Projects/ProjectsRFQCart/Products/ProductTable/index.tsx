'use client';
import { classNames } from '@/utils/classNames';
import s from './ProductTable.module.scss';
import Image from 'next/image';
import { useRef } from 'react';
import chat_image from '@/imgs/Buyer&Seller/chat_icon.svg';
import { RfqItemGot } from '@/types/services/rfq';
import { setRfqId } from '@/redux/slices/sideBars/sideBarRequestDetail';
import { useAppDispatch } from '@/redux/hooks';
interface TypeProps {
	properties: RfqItemGot[];
	compress: boolean;
}

export const ProductTable = ({ properties, compress }: TypeProps) => {
	const dispatch = useAppDispatch();
	const tableRef = useRef<HTMLTableSectionElement | null>(null);

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
				<tbody ref={tableRef} className={s.tbody}>
					{properties.map((property: RfqItemGot, ind: number) => (
						<tr key={ind}>
							{/* title  */}
							<td>
								<label htmlFor={s.input_label}>
									<input className={s.input_checkbox} type="checkbox" />
								</label>
							</td>
							<td>
								<div className={s.description}>
									<span className={s.subtitle}>
										CSI {property.subCategory.csiCode}
									</span>
									<p
										onClick={() => dispatch(setRfqId(property.id))}
										className={s.title}
									>
										{property.productName}
									</p>
								</div>
							</td>
							{/* chat */}
							<td>
								<div className={s.chat_wrapper}>
									<span className={s.chat}>
										<Image
											src={chat_image}
											alt="chat_image"
											width={24}
											height={24}
										/>
										<div
											className={classNames(
												s.chat_sms,
												//hardcode
												1 > 0 && s.chat_sms_active
											)}
										>
											{/* hardcode  */}
											<span className={s.chat_number}>{1}</span>
										</div>
									</span>
								</div>
							</td>
							{/* size  */}
							<td className={s.size}>{property.size}</td>
							{/* Quantity  */}
							<td>{property.quantity}</td>
							{/* Unit  */}
							<td>Unit</td>
							{/* Status  */}
							<td>
								<span
									className={classNames(
										s.status,
										compress && s.status_compress,

										property.status === 'requested' && s.status_requested,
										property.status === 'selectionNeeded' &&
											s.status_selectionNeeded,
										property.status === 'ordered' && s.status_ordered
									)}
								>
									{property.status === 'requested' && 'Requested'}
									{property.status === 'selectionNeeded' && 'Selection needed'}
									{property.status === 'ordered' && 'Orderd'}
								</span>
							</td>
							{/* Unit Budget  */}
							<td>${property.budget}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};
