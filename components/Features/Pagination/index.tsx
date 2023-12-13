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
	return (
		<div className={s.wrapper}>
			{/* prev btn  */}
			<button
				className={classNames(s.btn, currentPage === 1 && s.btn_disable)}
				onClick={() => setActivePage(currentPage - 1)}
			>
				<Image
					className={s.img}
					src={arrow_left}
					alt="arrow_left"
					width={20}
					height={20}
				/>
				<span className={s.btn_text}>Back</span>
			</button>
			{/* pagination */}

			<div className={s.pagination}>
				{currentPage !== 1 && (
					<>
						<span onClick={() => setActivePage(1)} className={s.step}>
							1
						</span>
						<span className={s.page}>...</span>
					</>
				)}
				<span className={classNames(s.step, s.step_current)}>{currentPage}</span>
				{totalPages !== currentPage && (
					<>
						<span className={s.page}>...</span>
						<span onClick={() => setActivePage(totalPages)} className={s.step}>
							{totalPages}
						</span>
					</>
				)}
			</div>
			{/* next btn  */}
			<button
				onClick={() => setActivePage(currentPage + 1)}
				className={classNames(s.btn, currentPage === totalPages && s.btn_disable)}
			>
				<span className={s.btn_text}>Next</span>
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
