'use client';
import { classNames } from '@/utils/classNames';
import Image from 'next/image';
import s from './Pagination.module.scss';
//imgs
import arrow_left from '@/imgs/Pagination/arrow_left.svg';
import arrow_rigth from '@/imgs/Pagination/arrow_rigth.svg';

interface PropsType {
	currentPage: number;
	totalPages: number;
	buttons: boolean;
	setActivePage: (n: number) => void;
}

export const Pagination = ({
	currentPage,
	totalPages,
	buttons,
	setActivePage,
}: PropsType) => {
	const pageNumbersRender = (): number[] => {
		// Determine the maximum number of displayed pages and the number of pages around the current page
		const maxDisplayedPages = 5;
		const pagesAroundCurrent = Math.floor((maxDisplayedPages - 1) / 2);

		// Calculate the starting page, taking into account the number of pages around the current page
		let startPage = Math.max(1, currentPage - pagesAroundCurrent);

		// Calculate the ending page, considering the maximum number of displayed pages
		let endPage = Math.min(totalPages, startPage + maxDisplayedPages - 1);

		// If the ending page reaches the total number of pages, shift the starting page backward
		if (endPage === totalPages) {
			startPage = Math.max(1, totalPages - maxDisplayedPages + 1);
		}

		// Create an array of displayed pages from the starting page to the ending page
		let renderedPages: number[] = Array.from(
			// Calculate the number of displayed buttons
			{ length: endPage - startPage },
			(_, index) => startPage + index
		);

		// If the starting page is greater than 2, add "1" and "..." before the first displayed page
		if (startPage > 2) {
			renderedPages = [1, -1, ...renderedPages.slice(1)];
		}
		// If the starting page is 2, add "1" before the first displayed page
		else if (startPage === 2) {
			renderedPages = [1, ...renderedPages];
		}

		return renderedPages;
	};

	return (
		<div className={s.wrapper}>
			<button
				onClick={() => {
					if (currentPage !== 1) {
						setActivePage(currentPage - 1);
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
						onClick={() => setActivePage(pageNumber)}
						className={classNames(
							s.page,
							pageNumber === currentPage && s.page_active
						)}
					>
						{pageNumber === -1 ? '...' : pageNumber}
					</span>
				))}
				{currentPage > 1 && <span className={s.page}>...</span>}
				<span className={s.page} onClick={() => setActivePage(totalPages)}>
					{totalPages}
				</span>
			</div>

			<button
				onClick={() => {
					if (currentPage !== totalPages) {
						setActivePage(currentPage + 1);
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
