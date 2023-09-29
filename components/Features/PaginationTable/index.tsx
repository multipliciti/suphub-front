'use client';
import { classNames } from '@/utils/classNames';
import s from './PaginationTable.module.scss';

interface PropsType {
	currentPage: number;
	totalPages: number;
	setActivePage: (n: number) => void;
}

export const PaginationTable = ({
	currentPage,
	totalPages,
	setActivePage,
}: PropsType) => {
	return (
		<div className={s.wrapper}>
			<span className={classNames(s.page, s.active)}>{currentPage} </span>
			<span className={s.page}>...</span>
			<span onClick={() => setActivePage(totalPages)} className={s.page}>
				{totalPages}
			</span>
		</div>
	);
};
