'use client';
import { setProducts, setStatus, setTotal } from '@/redux/slices/favorites/products';
import s from './NoResults.module.scss';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { Api } from '@/services';
import {
	resetAllFilters,
	startResetInputs,
} from '@/redux/slices/favorites/productsFilter';

type PropsType = {
	filtersEmpty: boolean;
};

export const NoResults = ({ filtersEmpty }: PropsType) => {
	const dispatch = useAppDispatch();
	const startResetInputsValue = useAppSelector(
		(state) => state.favoritesProductFilter.startResetInputs
	);

	const resetValueFilres = () => {
		//We're changing the state to signal that we need to reset the inputs for filters ( UI )
		dispatch(startResetInputs(!startResetInputsValue));
		//clear data all filters
		dispatch(resetAllFilters());
	};

	return (
		<div className={s.wrapper}>
			<h3 className={s.title}>No results</h3>
			{filtersEmpty ? (
				<p className={s.subtitle}>
					{' '}
					Please change your search or clear your filters.
				</p>
			) : (
				<p className={s.subtitle}>There’re no favorite products yet</p>
			)}

			{filtersEmpty && (
				<button onClick={resetValueFilres} className={s.btn}>
					Сlear filters
				</button>
			)}
		</div>
	);
};
