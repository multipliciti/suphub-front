import { FC, PropsWithChildren, TableHTMLAttributes } from 'react';

import { classNames } from '@/utils/classNames';

import s from './TableWrapper.module.scss';

interface Props extends TableHTMLAttributes<HTMLTableElement> {}

export const TableWrapper: FC<PropsWithChildren<Props>> = ({
	children,
	...props
}) => {
	return (
		<table className={classNames(s.table, props.className && props.className)}>
			{children}
		</table>
	);
};
