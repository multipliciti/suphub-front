'use client';
import s from './RequestList.module.scss';
import Image from 'next/image';
import eye_icon from '@/imgs/Buyer&Seller/eye.svg';
import eye_active from '@/imgs/Buyer&Seller/eye_active.svg';
import { truncateFileNameEnd } from '@/utils/names';

type TypeProps = {
	item: any;
};

//not table
export const RequestList = ({ item }: TypeProps) => {
	console.log('item', item);
	return (
		<div className={s.wrapper}>
			<table className={s.table}>
				<thead className={s.thead}>
					<tr className={s.tr}>
						<th className={s.th}>Product Requested</th>
						<th className={s.th}>Product Description</th>
						<th className={s.th}>Size</th>
						<th className={s.th}>Quantity</th>
						<th className={s.th}>Budet (USD)</th>
					</tr>
				</thead>
				<tbody className={s.tbody}>
					{item.Rfq.map((el: any, ind: number) => {
						return (
							<tr key={ind} className={s.tr}>
								<td className={s.td}>
									<span>{el.productName}</span>
									<Image
										className={s.eye}
										src={eye_icon}
										alt="addProject"
										width={20}
										height={20}
									/>
									<Image
										className={s.eye_active}
										src={eye_active}
										alt="addProject"
										width={20}
										height={20}
									/>
								</td>
								<td className={s.td}>
									{el.additionalComments
										? truncateFileNameEnd(el.additionalComments, 22)
										: ''}
								</td>
								<td className={s.td}> {el.size} </td>
								<td className={s.td}> {el.quantity} </td>
								<td className={s.td}> {el.budget} </td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
};
