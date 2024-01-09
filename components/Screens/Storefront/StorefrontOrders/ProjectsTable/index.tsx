import React from 'react';
import s from './ProjectsTable.module.scss';
import Link from 'next/link';
import { classNames } from '@/utils/classNames';
import { truncateFileNameEnd } from '@/utils/names';
import { Order } from '@/types/services/projects';

interface PropsType {
	columns: { title: string; key: string }[];
	data: Order[];
}

export const ProjectsTable = ({ columns, data }: PropsType) => {
	return (
		<div className={s.wrapper}>
			<table className={s.table}>
				<thead className={s.thead}>
					<tr>
						{/* Creating Column Headings */}
						{columns.map((column, ind) => (
							<th key={ind}>{column.title}</th>
						))}
					</tr>
				</thead>
				<tbody>
					{/* Creating Data Rows */}
					{data.map((row, rowIndex) => (
						<tr key={rowIndex}>
							{columns.map((column, indd) => (
								<>
									{/* PO  */}
									{column.key === 'PO#' && (
										<td className={s.td}>
											<span> {row.PO}</span>
										</td>
									)}
									{/* Issue Date */}
									{column.key === 'Issue Date' && (
										<td className={s.td}>
											<span>02/26/2023</span>
										</td>
									)}
									{/* Issue Date */}
									{column.key === 'Manufacturer' && (
										<td className={s.td}>
											<span>Example</span>
										</td>
									)}
									{/* Product */}
									{column.key === 'Product' && (
										<td className={s.td}>
											<span className={s.td_product}>
												<span>{truncateFileNameEnd('Product name', 25)}</span>
												<Link
													href={`/storefront/order/${row.id}`}
													className={s.updates}
												>
													See updates
												</Link>
											</span>
										</td>
									)}
									{/* Order Type */}
									{column.key === 'Order Type' && (
										<td className={s.td}>
											<span className={s.td_order}>
												<span
													className={classNames(
														s.dot,
														'Purchase order' === 'Purchase order' && s.dot_blue,
														'Sample order' === 'Sample order' && s.dot_grey
													)}
												></span>
												Sample order
											</span>
										</td>
									)}
									{/* Subtotal (USD) */}
									{column.key === 'Subtotal (USD)' && (
										<td className={s.td}>
											<span>${row.amount}</span>
										</td>
									)}
									{/* Status */}
									{column.key === 'Status' && (
										<td className={s.td}>
											<span className={s.td_wrapper_status}>
												<span
													className={classNames(
														s.td_status,
														s.td,
														row.status === 'confirmed' && s.td_status_issued,
														row.status === 'depositWaiting' && s.td_status_pending,
														row.status === 'inProduction' &&
															s.td_status_inproduction,
														row.status === 'productionCompleted' &&
															s.td_status_inproduction,
														row.status === 'paymentWaiting' && s.td_status_pending,
														row.status === 'preShipment' && s.td_status_preshipment,
														row.status === 'shipped' && s.td_status_intransit,
														row.status === 'delivered' && s.td_status_delivered,
														row.status === 'completed' && s.td_status_delivered
													)}
												>
													{row.status === 'confirmed' && 'PO issued'}
													{row.status === 'depositWaiting' && 'Payment pending'}
													{row.status === 'inProduction' && 'In production'}
													{row.status === 'productionCompleted' &&
														'Production Completed'}
													{row.status === 'paymentWaiting' && 'Payment pending'}
													{row.status === 'preShipment' && 'Pre-shipment'}
													{row.status === 'shipped' && 'In transit'}
													{row.status === 'delivered' && 'Delivered'}
													{row.status === 'completed' && 'Delivered'}
												</span>
											</span>
										</td>
									)}
									{/* Est.Delivery  */}
									{column.key === 'Est.Delivery' && (
										<td className={s.td}>
											<span>Est.Delivery Example</span>
										</td>
									)}
								</>
							))}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};
