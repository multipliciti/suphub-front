import Image from 'next/image';

import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { setPage } from '@/redux/slices/storefront/storefrontProducts';

import s from './Pagination.module.scss';

import arrowLeftIcon from '@/imgs/arrow-left.svg';
import arrowLeftDisableIcon from '@/imgs/arrow-left-disable.svg';

export const StorefrontProductPagination = () => {
	const dispatch = useAppDispatch();

	const { total, label } = useAppSelector(
		(state) => state.storefrontProductsSlice.pagination
	);
	const page = useAppSelector((state) => state.storefrontProductsSlice.params.page);

	const handleSetPage = (page: number) => {
		dispatch(setPage(page));
	};

	const renderPages = () => {
		const pages = [];

		for (let i = 1; i <= total; i++) {
			if (i === 1 || i === total || (i >= page - 1 && i <= page + 1)) {
				pages.push(
					<li
						key={i}
						className={i === page ? s.active : ''}
						onClick={() => {
							if (i !== page) {
								handleSetPage(i);
							}
						}}
					>
						{i}
					</li>
				);
			} else if (i === 2 && page > 3) {
				pages.push(
					<li key={i} className={s.ellipsis}>
						...
					</li>
				);
			} else if (i === total - 1 && page < total - 2) {
				pages.push(
					<li key={i} className={s.ellipsis}>
						...
					</li>
				);
			}
		}

		return pages;
	};

	return (
		<div className={s.wrapper}>
			<div className={s.label}>{label}</div>

			<ul className={s.pagination}>
				<li
					className={`${s.arrow} ${s.arrow_left}`}
					onClick={() => {
						if (page > 1) {
							handleSetPage(page - 1);
						}
					}}
				>
					<Image
						src={page === 1 ? arrowLeftDisableIcon : arrowLeftIcon}
						alt="arrow_left_icon"
						width={20}
						height={20}
					/>
				</li>

				{renderPages()}

				<li
					className={`${s.arrow} ${s.arrow_right}`}
					onClick={() => {
						if (page < total) {
							handleSetPage(page + 1);
						}
					}}
				>
					<Image
						src={page === total ? arrowLeftDisableIcon : arrowLeftIcon}
						alt="arrow_right_icon"
						width={20}
						height={20}
					/>
				</li>
			</ul>
		</div>
	);
};
