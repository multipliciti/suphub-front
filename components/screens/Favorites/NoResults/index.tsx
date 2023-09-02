'use client';
import {
	setProducts,
	setStatus,
	setTotal,
} from '@/redux/slices/favorites/products';
import s from './NoResults.module.scss';
import { useAppDispatch } from '@/redux/hooks';
import { Api } from '@/services';

export const NoResults = () => {
	const dispatch = useAppDispatch();
	const api = Api();
	

	const fetchData = async () => {
		dispatch(setStatus('pending'));
			try {
				const response = await api.product.getFavorites({
					page: 1,
					limit: 10,
					sortParams: {
						id: 'desc',
					},
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
