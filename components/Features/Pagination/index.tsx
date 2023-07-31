'use client';
import { classNames } from '@/utils/classNames';
import Image from 'next/image';
import s from './Pagination.module.scss';
//imgs
import arrow_left from '@/imgs/Marketplace/arrow_left.svg';
import arrow_rigth from '@/imgs/Marketplace/arrow_rigth.svg';

interface PropsType {
	currentPage: number;
	totalPages: number;
	onPageChange: (n: number) => void;
	buttons: boolean;
}

export const Pagination = ({
	currentPage,
	totalPages,
	onPageChange,
	buttons,
}: PropsType) => {
	const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

	const pageNumbersRender = (): number[] => {
		const maxDisplayedPages = 5;
		const pagesAroundCurrent = Math.floor((maxDisplayedPages - 1) / 2);

		if (totalPages <= maxDisplayedPages) return pageNumbers;

		const startPage = Math.max(1, currentPage - pagesAroundCurrent);
		const endPage = Math.min(totalPages, startPage + maxDisplayedPages - 1);

		return pageNumbers.slice(startPage - 1, endPage);
	};

	return (
		<div className={s.wrapper}>
			<button
				onClick={() => {
					if (currentPage !== 1) {
						onPageChange(currentPage - 1);
					}
				}}
				className={classNames(s.btn, buttons && s.btn_active)}
			>
				<Image
					className={s.img}
					src={arrow_left}
					alt="arrow_left"
					width={20}
					height={20}
				/>
				<span className={s.btn_text}>prev</span>
			</button>

			<div className={s.pagination}>
				{pageNumbersRender().map((pageNumber) => (
					<span
						key={pageNumber}
						onClick={() => onPageChange(pageNumber)}
						className={classNames(
							s.page,
							pageNumber === currentPage && s.page_active
						)}
					>
						{pageNumber === -1 ? '...' : pageNumber}
					</span>
				))}
				<span className={s.page}>...</span>
				<span className={s.page} onClick={() => onPageChange(totalPages)}>
					{totalPages}
				</span>
			</div>

			<button
				onClick={() => {
					if (currentPage !== totalPages) {
						onPageChange(currentPage + 1);
					}
				}}
				className={classNames(s.btn, buttons && s.btn_active)}
			>
				<span className={s.btn_text}>next</span>

				<Image
					className={s.img}
					src={arrow_rigth}
					alt="arrow_rigth"
					width={20}
					height={20}
				/>
			</button>
		</div>
	);
};
