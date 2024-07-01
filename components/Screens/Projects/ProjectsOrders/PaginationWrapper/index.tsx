'use client';
import { PaginationTable } from '@/components/Features/PaginationTable';
import { classNames } from '@/utils/classNames';
import Image from 'next/image';
import s from './PaginationWrapper.module.scss';
//imgs
import arrow_rigth from '@/imgs/arrow-right.svg';
import arrow_left from '@/imgs/arrow-left.svg';
import arrow_rigth_disable from '@/imgs/arrow-right-disable.svg';
import arrow_left_disable from '@/imgs/arrow-left-disable.svg';

interface PropsType {
	limitItems: number;
	totalItems: number;
	currentPage: number;
	totalPages: number;
	setActivePage: (n: number) => void;
}

export const PaginationWrapper = ({
	limitItems,
	totalItems,
	currentPage,
	setActivePage,
	totalPages,
}: PropsType) => {
	const startItem = totalItems === 0 ? 0 : (currentPage - 1) * limitItems + 1;
	const endItem =
		totalItems === 0 ? 0 : Math.min(currentPage * limitItems, totalItems);
	return (
		<div className={s.wrapper}>
			<span className={s.step}>
				{totalItems === 0 ? '0 items' : `${startItem}-${endItem} of ${totalItems}`}
			</span>
			<Image
				onClick={() => setActivePage(currentPage - 1)}
				className={classNames(s.arrow, currentPage === 1 && s.arrow_disable)}
				src={currentPage !== 1 ? arrow_left : arrow_left_disable}
				alt="arrow_left"
				width={20}
				height={20}
			/>

			<PaginationTable
				currentPage={currentPage}
				setActivePage={setActivePage}
				totalPages={totalPages}
			/>

			<Image
				onClick={() => setActivePage(currentPage + 1)}
				className={classNames(
					s.arrow,
					currentPage === totalPages && s.arrow_disable
				)}
				src={currentPage !== totalPages ? arrow_rigth : arrow_rigth_disable}
				alt="arrow_rigth"
				width={20}
				height={20}
			/>
		</div>
	);
};
