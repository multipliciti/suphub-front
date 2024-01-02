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
	const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

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
				{/* if totalpage > 6  */}
				{totalPages > 6 && (
					<>
						{/* start page */}
						{currentPage !== 1 && (
							<>
								<span onClick={() => setActivePage(1)} className={s.step}>
									1
								</span>
								{currentPage > 4 && <span className={s.page}>...</span>}
							</>
						)}
						{/* render prev steps */}
						{/* if  currentPage > 2 && totalPages > 3 */}
						{currentPage > 3 && totalPages > 3 && (
							<>
								<span
									onClick={() => setActivePage(currentPage - 2)}
									className={s.step}
								>
									{currentPage - 2}
								</span>
							</>
						)}
						{/* if  currentPage === 3 && totalPages > 3 */}
						{currentPage === 3 && totalPages > 3 && (
							<>
								<span
									onClick={() => setActivePage(currentPage - 1)}
									className={s.step}
								>
									{currentPage - 1}
								</span>
							</>
						)}
						{/*currentPage > 3 && totalPages > 4   */}
						{currentPage > 3 && totalPages > 4 && (
							<>
								<span
									onClick={() => setActivePage(currentPage - 1)}
									className={s.step}
								>
									{currentPage - 1}
								</span>
							</>
						)}

						{/* // */}
						{/* // */}
						{/* // */}
						<span className={classNames(s.step, s.step_current)}>{currentPage}</span>
						{/* // */}
						{/* // */}
						{/* // */}
						{/* // */}

						{/* render next steps */}
						{currentPage < totalPages - 1 && currentPage < totalPages - 1 && (
							<>
								<span
									onClick={() => setActivePage(totalPages - 1)}
									className={s.step}
								>
									{currentPage + 1}
								</span>
							</>
						)}
						{currentPage < totalPages - 2 && currentPage < totalPages - 2 && (
							<>
								<span
									onClick={() => setActivePage(totalPages - 2)}
									className={s.step}
								>
									{currentPage + 2}
								</span>
							</>
						)}

						{/* // */}
						{/* // */}
						{/* // */}
						{/* last page */}
						{totalPages !== currentPage && (
							<>
								{currentPage !== totalPages - 1 &&
									currentPage !== totalPages - 2 && (
										<span className={s.page}>...</span>
									)}
								<span onClick={() => setActivePage(totalPages)} className={s.step}>
									{totalPages}
								</span>
							</>
						)}
					</>
				)}

				{/* if total page <= 6  */}
				{totalPages <= 6 &&
					pages.map((el: number, ind: number) => {
						return (
							<span
								onClick={() => setActivePage(el)}
								className={classNames(s.step, currentPage === el && s.step_current)}
							>
								{el}
							</span>
						);
					})}
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
