// @ts-ignore
import React, { useState } from 'react';
import s from './Table.module.scss';
import { classNames } from '@/utils/classNames';
import { DynamicAttribute } from '@/types/products/product';

interface TypeShipmentPackaging {
	label: string;
	value: string;
	//Cannot have this property here, created to avoid TypeScript error.
	attributeDescription?: null | string;
}

interface TypeTables {
	id: number;
	title: string;
	keyShow: DynamicAttribute[] | TypeShipmentPackaging[];
}

interface PropsType {
	dynamic_attr: DynamicAttribute[];
	shipmentPackaging: TypeShipmentPackaging[];
}

export const TableComponent = ({ dynamic_attr, shipmentPackaging }: PropsType) => {
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
	];
	const activeTableData =
		activeTable !== null ? tables.find((table) => table.id === activeTable) : null;

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
							{tables
								.find((el) => el.id === activeTable)
								?.keyShow.map(
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
						</tbody>
					</table>
				</div>
			)}
		</div>
	);
};
