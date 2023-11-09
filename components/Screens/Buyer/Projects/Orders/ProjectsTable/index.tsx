import React, { useState } from 'react';
import s from './ProjectsTable.module.scss';
import { truncateFileNameEnd } from '@/utils/names';
import { classNames } from '@/utils/classNames';

interface PropsType {
	columns: { title: string; key: string }[];
	data: { [key: string]: string }[];
}

export const ProjectsTable = ({ columns, data }: PropsType) => {
	return (
		<div className={s.wrapper}>
			<table className={s.table}>
				<thead>
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
							{columns.map((column, ind) => (
								<>
									<td className={s.td} key={ind}>
										{/* {row[column.key]} */}

										{/* Product */}
										{column.key === 'Product' && (
											<span className={s.td_product}>
												<span>{truncateFileNameEnd(row[column.key], 25)}</span>
												<span className={s.updates}>See updates</span>
											</span>
										)}

										{/* Status */}
										{column.key === 'Status' && (
											<span className={s.td_wrapper_status}>
												<span
													className={classNames(
														s.td_status,
														s.td,
														row[column.key] === 'Payment pending' &&
															s.td_status_pending,
														row[column.key] === 'In transit' && s.td_status_transit,
														row[column.key] === 'In production' &&
															s.td_status_production,
														row[column.key] === 'PO issued' && s.td_status_issued,
														row[column.key] === 'Delivered' && s.td_status_delivered
													)}
												>
													{row[column.key]}
												</span>
											</span>
										)}

										{/* Order Type */}
										{column.key === 'Order Type' && (
											<span className={s.td_order}>
												<span
													className={classNames(
														s.dot,
														row[column.title] === 'Purchase order' && s.dot_blue,
														row[column.title] === 'Sample order' && s.dot_grey
													)}
												></span>
												{row[column.key]}
											</span>
										)}

										{/* other type */}
										{column.key !== 'Order Type' &&
											column.key !== 'Status' &&
											column.key !== 'Product' && <span>{row[column.key]}</span>}
									</td>
								</>
							))}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};
