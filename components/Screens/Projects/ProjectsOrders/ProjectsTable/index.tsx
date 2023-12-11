import React, { useState } from 'react';
import s from './ProjectsTable.module.scss';
import { truncateFileNameEnd } from '@/utils/names';
import { classNames } from '@/utils/classNames';
import { useRouter } from 'next/navigation';
import { Order } from '@/types/services/projects';
import Link from 'next/link';

interface PropsType {
	columns: { title: string; key: string }[];
	data: Order[];
}

export const ProjectsTable = ({ columns, data }: PropsType) => {
	const { push } = useRouter();
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
						<tr onClick={() => push(`/projects/order/${row.id}`)} key={rowIndex}>
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
												<span className={s.updates}>See updates</span>
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
														row.status.toLowerCase() === 'depositWaiting' &&
															s.td_status_pending,
														row.status.toLowerCase() === 'in transit' &&
															s.td_status_transit,
														row.status.toLowerCase() === 'inProduction' &&
															s.td_status_production,
														row.status.toLowerCase() === 'pO issued' &&
															s.td_status_issued,
														row.status.toLowerCase() === 'delivered' &&
															s.td_status_delivered,
														row.status.toLowerCase() === 'completed' &&
															s.td_status_delivered
													)}
												>
													{row.status}
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
