import React from 'react';
import { Supplier } from '@/services/suppliers';
import { useAppDispatch } from '@/redux/hooks';
import {
	setSelectedSupplier,
	setSidebar,
} from '@/redux/slices/suppliers/suppliersSidebar';
import { useRouter } from 'next/navigation';
import {
	columns,
	getContactName,
	getCompanyName,
	getPhoneNumber,
	getCountry,
	getCategory,
} from './helper';
import Image from 'next/image';
import s from './SuppliersTable.module.scss';
//imgs
import commentImage from '@/imgs/Suppliers/table/comment.svg';

interface PropsType {
	data: Supplier[];
}

export const SuppliersTable = ({ data }: PropsType) => {
	const dispatch = useAppDispatch();
	const router = useRouter();

	const handleOpenChatSidebar = (e: any, supplier: Supplier) => {
		e.stopPropagation();
		dispatch(setSidebar(true));
		dispatch(setSelectedSupplier(supplier));
	};

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
						<tr
							onClick={() => router.push(`/suppliers/${row.sellerCompanyId}`)}
							className={s.tr}
							key={rowIndex}
						>
							{columns.map((column) => (
								<>
									{/* Contact Name  */}
									{column.key === 'contactName' && (
										<td
											className={s.td}
											onClick={(e) => handleOpenChatSidebar(e, row)}
										>
											<span className={s.contactName}>
												<Image
													className={s.contactName_image}
													title="Open chat"
													src={commentImage}
													alt="commentImage"
												/>
												<span className={s.contactName_text}>
													{getContactName(row)}
												</span>
											</span>
										</td>
									)}
									{/* Company */}
									{column.key === 'company' && (
										<td className={s.td}>
											<span className={s.companyName}>{getCompanyName(row)}</span>
										</td>
									)}
									{/* Phone Number */}
									{column.key === 'phoneNumber' && (
										<td className={s.td}>
											<span>{getPhoneNumber(row)}</span>
										</td>
									)}
									{/* Email */}
									{column.key === 'email' && (
										<td className={s.td}>
											<span>{row.supplierEmail}</span>
										</td>
									)}
									{/* Country */}
									{column.key === 'country' && (
										<td className={s.td}>
											<span>{getCountry(row)}</span>
										</td>
									)}
									{/* category */}
									{column.key === 'category' && (
										<td className={s.td}>
											<div className={s.category_wrapper}>
												<span className={s.category}>{getCategory(row)}</span>
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
