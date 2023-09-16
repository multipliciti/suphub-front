'use client';
import {
	setProducts,
	setStatus,
	setTotal,
} from '@/redux/slices/marketplace/products';
import s from './NoResults.module.scss';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { Api } from '@/services';

export const NoResults = () => {
	const dispatch = useAppDispatch();
	const api = Api();
	const activeId = useAppSelector((state) => state.sideBarSlice.activeId);
	const sortDirection = useAppSelector((state) => state.marketplaceProductFilter.sortDirection);
	const finalJsonString = JSON.stringify({
		attr: {
			subCategoryId: activeId
		}
	});

	const fetchData = async () => {
		dispatch(setStatus('pending'));
			try {
				const response = await api.product.getProduct({
					page: 1,
					limit: 10,
					sortParams: sortDirection ? sortDirection : {id: "desc"}, 
					searchParams: finalJsonString,
				});
				dispatch(setProducts(response.result));
				dispatch(setTotal(response.total));
				dispatch(setStatus('seccess'));
			} catch (error) {
				console.error('Error:', error);
				dispatch(setStatus('rejected'));
			}
	};

	return (
		<div className={s.wrapper}>
			<h3 className={s.title}>No results</h3>
			<p className={s.subtitle}>Please change your search or clear your filters.</p>
			<button onClick={fetchData} className={s.btn}>
				Сlear filters
			</button>
		</div>
	);
};
