import React, { useState } from 'react';
import { DynamicAttribute, ProductItemType } from '@/types/products/product';
import { File } from '@/components/Screens/Suppliers/SupplierPage/FilesWidget';
import { classNames } from '@/utils/classNames';
import s from './Table.module.scss';

interface TypeShipmentPackaging {
	label: string;
	value: string;
	//Cannot have this property here, created to avoid TypeScript error.
	attributeDescription?: null | string;
}

interface TypeTables {
	id: number;
	title: string;
	keyShow?: DynamicAttribute[] | TypeShipmentPackaging[];
}

interface PropsType {
	dynamic_attr: DynamicAttribute[];
	shipmentPackaging: TypeShipmentPackaging[];
	product: ProductItemType;
}

export const TableComponent = ({
	dynamic_attr,
	shipmentPackaging,
	product,
}: PropsType) => {
	const [activeTable, setActiveTable] = useState<number>(1);

	const tables: TypeTables[] = [
		{
			id: 1,
			title: 'Specification',
			keyShow: dynamic_attr,
		},
		{
			id: 2,
			title: 'Shipment & Packaging',
			keyShow: shipmentPackaging,
		},
		{
			id: 3,
			title: 'Documents',
		},
	];

	const activeTableData =
		activeTable !== null ? tables.find((table) => table.id === activeTable) : null;

	const documents = [
		{ label: 'Cutsheet', value: product.cutsheets },
		{ label: 'Certification Documents', value: product.certifications },
		{ label: 'Installation Manual', value: product.manuals },
	];

	return (
		<div className={s.wrapper}>
			<div className={s.tables}>
				{tables.map((table) => (
					<div
						key={table.id}
						className={classNames(
							s.tables_item,
							activeTable === table.id && s.tables_item_active
						)}
						onClick={() => setActiveTable(table.id)}
					>
						{table.title}
					</div>
				))}
			</div>
			{activeTableData && (
				<div>
					<h2 className={s.tables_active}>{activeTableData.title}</h2>
					<table className={s.table}>
						<tbody>
							{/* Default Table */}
							{activeTableData.id !== 3 &&
								tables
									.find((el) => el.id === activeTable)
									?.keyShow?.map(
										(item: DynamicAttribute | TypeShipmentPackaging, ind) => (
											<tr className={s.table_row} key={ind}>
												<td className={s.table_key}>
													{item.label}
													{item.attributeDescription
														? ` (${item.attributeDescription})`
														: ''}
												</td>
												<td className={s.table_value}>{item.value}</td>
											</tr>
										)
									)}

							{/* Renders only for 3rd tab (Document Table) */}
							{activeTableData.id === 3 &&
								documents.map(({ label, value }, ind) => (
									<tr className={s.table_row} key={ind}>
										<td className={s.table_key}>{label}</td>
										{value.length > 0 ? (
											value.map((file, index) => (
												<td className={s.table_file_wrapper} key={index}>
													<File file={file} key={index} />
												</td>
											))
										) : (
											<div className={s.table_value}>No files</div>
										)}
									</tr>
								))}
						</tbody>
					</table>
				</div>
			)}
		</div>
	);
};
