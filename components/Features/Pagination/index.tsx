'use client';
import Image from 'next/image';
import s from './Pagination.module.scss';
import { classNames } from '@/utils/classNames';

// //imgs
import arrow_left from '@/imgs/Pagination/arrow_left.svg';
import arrow_rigth from '@/imgs/Pagination/arrow_rigth.svg';

interface PropsType {
	currentPage: number;
	totalPages: number;
	buttons: boolean;
	setActivePage: (n: number) => void;
}
export const Pagination = ({
	totalPages,
	currentPage,
	setActivePage,
}: PropsType) => {
	//how many pages show
	const visiblePages = 10;

	const getPageNumbers = () => {
		const totalVisiblePages = Math.min(visiblePages, totalPages);
		const halfVisiblePages = Math.floor(totalVisiblePages / 2);
		let startPage = Math.max(currentPage - halfVisiblePages, 1);
		let endPage = startPage + totalVisiblePages - 1;

		if (endPage > totalPages) {
			endPage = totalPages;
			startPage = Math.max(endPage - totalVisiblePages + 1, 1);
		}

		return Array.from(
			{ length: totalVisiblePages },
			(_, index) => startPage + index
		);
	};

	return (
		<div className={s.wrapper}>
			{/* prev btn  */}
			<button
				onClick={() => setActivePage(currentPage - 1)}
				className={classNames(s.btn, currentPage === 1 && s.btn_disable)}
			>
				<Image
					className={s.img}
					src={arrow_left}
					alt="arrow_left"
					width={20}
					height={20}
				/>
			</button>
			{/* // */}
			{/* // */}
			{/* // */}
			<ul className={s.pagination}>
				{/* render pages  */}
				{getPageNumbers().map((page) => {
					return (
						<li
							key={page}
							className={classNames(s.step, page === currentPage && s.step_current)}
						>
							{page}
						</li>
					);
				})}
			</ul>
			{/* // */}
			{/* // */}
			{/* // */}

			{/* next page  */}
			<button
				onClick={() => setActivePage(currentPage + 1)}
				className={classNames(s.btn, currentPage >= totalPages && s.btn_disable)}
			>
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
