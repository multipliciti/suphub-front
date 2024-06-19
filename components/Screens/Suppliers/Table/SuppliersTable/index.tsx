import React from 'react';
import s from './SuppliersTable.module.scss';
import { Supplier } from '@/services/suppliers';
import Image from 'next/image';
import commentImage from '@/imgs/Suppliers/table/comment.svg';
import { useAppDispatch } from '@/redux/hooks';
import { setSidebar } from '@/redux/slices/suppliers/suppliersSidebar';

interface PropsType {
	data: Supplier[];
}

export const SuppliersTable = ({ data }: PropsType) => {
	const dispatch = useAppDispatch();
	const columns: { title: string; key: string }[] = [
		{ title: 'Contact Name', key: 'contactName' },
		{ title: 'Company', key: 'company' },
		{ title: 'Phone Number', key: 'phoneNumber' },
		{ title: 'Email', key: 'email' },
		{ title: 'Country', key: 'country' },
		{ title: 'Category', key: 'category' },
	];

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
						<tr className={s.tr} key={rowIndex}>
							{columns.map((column) => (
								<>
									{/* Contact Name  */}
									{column.key === 'contactName' && (
										<td className={s.td}>
											<span className={s.contactName}>
												<Image
													className={s.contactName_image}
													onClick={() => dispatch(setSidebar(true))}
													title="Open chat"
													src={commentImage}
													alt="commentImage"
												/>
												<span className={s.contactName_text}>
													{row.contactName ? row.contactName : '-'}
												</span>
											</span>
										</td>
									)}
									{/* Company */}
									{column.key === 'company' && (
										<td className={s.td}>
											<span>{row.company ? row.company : '-'}</span>
										</td>
									)}
									{/* Phone Number */}
									{column.key === 'phoneNumber' && (
										<td className={s.td}>
											<span>{row.phoneNumber ? row.phoneNumber : '-'}</span>
										</td>
									)}
									{/* Email */}
									{column.key === 'email' && (
										<td className={s.td}>
											<span>{row.email ? row.email : '-'}</span>
										</td>
									)}
									{/* Country */}
									{column.key === 'country' && (
										<td className={s.td}>
											<span>{row.country ? row.country : '-'}</span>
										</td>
									)}
									{/* category */}
									{column.key === 'category' && (
										<td className={s.td}>
											<div className={s.category_wrapper}>
												<span className={s.category}>
													{row.category ? row.category : '-'}
												</span>
											</div>
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
