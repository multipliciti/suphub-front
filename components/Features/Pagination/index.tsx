'use client';
import { classNames } from '@/utils/classNames';
import Image from 'next/image';
import s from './Pagination.module.scss';
import { setActivePage } from '@/redux/slices/marketplace/products';
import { useAppDispatch } from '@/redux/hooks';
//imgs
import arrow_left from '@/imgs/Marketplace/arrow_left.svg';
import arrow_rigth from '@/imgs/Marketplace/arrow_rigth.svg';

interface PropsType {
	currentPage: number;
	totalPages: number;
	buttons: boolean;
}

export const Pagination = ({ currentPage, totalPages, buttons }: PropsType) => {
	const dispatch = useAppDispatch();
	const pageNumbersRender = (): number[] => {
		const maxDisplayedPages = 5;
		const pagesAroundCurrent = Math.floor((maxDisplayedPages - 1) / 2);

		if (totalPages <= maxDisplayedPages) {
			return Array.from({ length: totalPages }, (_, index) => index + 1);
		}

		const startPage = Math.max(1, currentPage - pagesAroundCurrent);
		const endPage = Math.min(totalPages, startPage + maxDisplayedPages - 1);

		let renderedPages: number[] = Array.from(
			{ length: endPage - startPage + 1 },
			(_, index) => startPage + index
		);

		if (currentPage - pagesAroundCurrent > 1) {
			renderedPages = [1, -1, ...renderedPages];
		}

		if (currentPage + pagesAroundCurrent < totalPages) {
			renderedPages = [...renderedPages, -1, totalPages];
		}

		return renderedPages;
	};

	return (
		<div className={s.wrapper}>
			<button
				onClick={() => {
					if (currentPage !== 1) {
						dispatch(setActivePage(currentPage - 1));
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
						onClick={() => dispatch(setActivePage(pageNumber))}
						className={classNames(
							s.page,
							pageNumber === currentPage && s.page_active
						)}
					>
						{pageNumber === -1 ? '...' : pageNumber}
					</span>
				))}
				<span className={s.page}>...</span>
				<span className={s.page} onClick={() => dispatch(setActivePage(totalPages))}>
					{totalPages}
				</span>
			</div>

			<button
				onClick={() => {
					if (currentPage !== totalPages) {
						dispatch(setActivePage(currentPage + 1));
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
