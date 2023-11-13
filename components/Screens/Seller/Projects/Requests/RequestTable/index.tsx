'use client';
import { classNames } from '@/utils/classNames';
import s from './RequestTable.module.scss';

interface PropsType {
	data: any[];
}

export const RequestTable = ({ data }: PropsType) => {
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
								<td> {el.customer} </td>
								<td>
									<div className={s.rfq}>
										<span>{el.RFQ} items</span>
										<span className={s.rfq_detail}>View details</span>
									</div>
								</td>
								<td> {el.QTY} </td>
								<td> {el.measurement} </td>
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
