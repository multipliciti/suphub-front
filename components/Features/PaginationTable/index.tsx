'use client';
import s from './PaginationTable.module.scss';

interface PropsType {
	currentPage: number;
	totalPages: number;
	buttons: boolean;
	setActivePage: (n: number) => void;
}

export const PaginationTable = ({}: PropsType) => {
	return <div></div>;
};
