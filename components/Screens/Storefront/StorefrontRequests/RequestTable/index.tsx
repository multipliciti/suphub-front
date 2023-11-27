'use client';
import { classNames } from '@/utils/classNames';
import s from './RequestTable.module.scss';
import Link from 'next/link';
import { useAppSelector } from '@/redux/hooks';

export const RequestTable = () => {
	const data = useAppSelector(
		(state) => state.storefrontProjectsSellerSlice.projects
	);
	return (
		<div className={s.wrapper}>
			<table className={s.table}>
				<thead className={s.thead}>
					<tr>
						<th>Customer</th>
						<th>RFQ Items</th>
						<th>QTY.</th>
						<th>Measurement</th>
						<th>Budget</th>
						<th>Status</th>
						<th>Ship to</th>
					</tr>
				</thead>

				{/* body  */}
				<tbody className={s.tbody}>
					{data.map((el: any, ind: number) => {
						return (
							<tr key={ind}>
								<td> {el.buyer.firstName} </td>
								<td>
									<div className={s.rfq}>
										<span>
											{el.Rfq.length} {el.Rfq.length > 1 ? 'items' : 'item'}
										</span>
										<Link
											className={s.rfq_detail}
											href="/storefront/requests/[id]"
											as={`/storefront/requests/${el.id}`}
										>
											View details
										</Link>
									</div>
								</td>
								<td> {el.QTY} </td>
								<td> {el.name} </td>
								<td> {el.budget} </td>
								<td>
									<span
										className={classNames(
											el.status === 'Draft' && s.status_draft,
											el.status === 'Sampling' && s.status_sampling
										)}
									>
										{el.status}
									</span>
								</td>
								<td> {el.shipTo} </td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
};
