'use client';
import { classNames } from '@/utils/classNames';
import s from './RequestTable.module.scss';
import Link from 'next/link';
import { formatDateString } from '@/utils/formatDateString';
import { truncateFileNameEnd } from '@/utils/names';

type TypeProps = {
	data: any[] | null;
};

export const RequestTable = ({ data }: TypeProps) => {
	return (
		<div className={s.wrapper}>
			<table className={s.table}>
				<thead className={s.thead}>
					<tr>
						<th>Data</th>
						<th>Customer</th>
						<th>RFQ Items</th>
						<th>QTY.</th>
						<th>Status</th>
						<th>Ship to</th>
					</tr>
				</thead>

				{/* body  */}
				<tbody className={s.tbody}>
					{data?.map((el: any, ind: number) => {
						return (
							<tr key={ind}>
								<td> {formatDateString(el.createdAt)} </td>
								<td> {el.buyer.firstName} </td>
								<td>
									<div className={s.rfq}>
										<span>{truncateFileNameEnd(el.name, 40)}</span>
										<Link
											className={s.rfq_detail}
											href="/storefront/requests/[id]"
											as={`/storefront/requests/${el.id}`}
										>
											View details
										</Link>
									</div>
								</td>
								<td>
									{el.Rfq.reduce((sum: 0, el: any) => sum + (el.budget || 0), 0)}
								</td>
								<td>
									<span
										className={classNames(
											el.status === 'Draft' && s.status_draft,
											el.status === 'Sampling' && s.status_sampling
										)}
									>
										{el.status} Null
									</span>
								</td>
								<td> {el.shipTo} Null </td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
};
