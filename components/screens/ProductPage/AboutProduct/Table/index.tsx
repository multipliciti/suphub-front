import React, { useState } from 'react';
import s from './Table.module.scss';
import { classNames } from '@/utils/classNames';

interface TableItem {
	id: number;
	key: string;
	value: string;
}

interface Table {
	title: string;
	arr: TableItem[];
	id: number;
}

interface PropsType {
	tables: Table[];
}

export const TableComponent = ({ tables }: PropsType) => {
	const [activeTable, setActiveTable] = useState<number | null>(1);

	const handleTableClick = (tableId: number) => {
		setActiveTable(tableId);
	};

	const dynamic_attr = [
		{
            "attributeId": 10,
            "attributeDescription": "",
            "label": "Certification",
            "order": 1,
            "value": "AAMA, NFRC"
        },
        {
            "attributeId": 7,
            "attributeDescription": "",
            "label": "R-Value",
            "order": null,
            "value": 3.57
        },
        {
            "attributeId": 8,
            "attributeDescription": "",
            "label": "Accessories",
            "order": null,
            "value": "Installation clips"
        },
        {
            "attributeId": 9,
            "attributeDescription": "",
            "label": "Visible Transmittance",
            "order": null,
            "value": 0.65
        }
	]

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
						onClick={() => handleTableClick(table.id)}
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
							{dynamic_attr.map((item, ind) => (
								<tr className={s.table_row} key={ind}>
									<td className={s.table_key}>{item.label}</td>
									<td className={s.table_value}>{item.value}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			)}
		</div>
	);
};
