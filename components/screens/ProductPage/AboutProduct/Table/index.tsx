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
							{activeTableData.arr.map((item, ind) => (
								<tr className={s.table_row} key={`${ind}-${item.id}`}>
									<td className={s.table_key}>{item.key}</td>
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
