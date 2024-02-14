'use client';
import s from './Favorites.module.scss';
import { ProductsFilter } from './ProductsFilter';
import { Products } from './Products';
import { useAppSelector } from '@/redux/hooks';
import {
	setActivePage,
	setProducts,
	setStatus,
	setTotal,
} from '@/redux/slices/favorites/products';
import { Api } from '@/services';
import { Pagination } from '@/components/Features/Pagination';
import { useEffect, useState } from 'react';
import { useAppDispatch } from '@/redux/hooks';
import { setModal } from '@/redux/slices/modal';
import { checkFiltersEmpty, createObjFetch } from '@/utils/productsUtils';

export const FavoritesComponents = () => {
	const dispatch = useAppDispatch();
	const api = Api();
	const [totalPages, setTotalPages] = useState<number>(0);
	const user = useAppSelector((state) => state.authSlice.user);
	const statusGetUser = useAppSelector((state) => state.authSlice.statusGetUser);
	const products = useAppSelector((state) => state.favoritesProduct.products);
	const activePage = useAppSelector((state) => state.favoritesProduct.activePage);
	const status = useAppSelector((state) => state.favoritesProduct.status);
	const productsFilter = useAppSelector((state) => state.favoritesProductFilter);
	const storeProductsFilter = productsFilter.storeProductsFilter;

	//get items for filters
	const sortDirection = useAppSelector(
		(state) => state.favoritesProductFilter.sortDirection
	);
	const searchText = productsFilter.searchProductsFilter;
	const minUnitPrice = storeProductsFilter.find((el) => el.key === 'unitPrice')?.min;
	const maxUnitPrice = storeProductsFilter.find((el) => el.key === 'unitPrice')?.max;
	const leadTime =
		storeProductsFilter.find((el) => el.key === 'leadTime')?.selectedItems || '';
	const moqMin = storeProductsFilter.find((el) => el.key === 'moq')?.min;
	const moqMax = storeProductsFilter.find((el) => el.key === 'moq')?.max;
	const warrantyMin =
		storeProductsFilter.find((el) => el.key === 'warranty')?.min || '';
	const warrantyMax =
		storeProductsFilter.find((el) => el.key === 'warranty')?.max || '';
	const countryOfOrigin =
		storeProductsFilter.find((el) => el.key === 'countryOfOrigin')?.selectedItems ||
		[];
	const filtersEmpty = checkFiltersEmpty(storeProductsFilter);
	const setActivePageFunction = (n: number) => {
		dispatch(setActivePage(n));
	};

	//Creating request objects
	const objFetchUnitPrice = createObjFetch(minUnitPrice, maxUnitPrice);
	const objFetchStringsMoq = createObjFetch(moqMin, moqMax);
	const objFetchStringWarranty = createObjFetch(warrantyMin, warrantyMax);

	const objFetchCountry = countryOfOrigin.map((item: any) => {
		return {
			countryOfOrigin: { contains: item },
		};
	});

	const objFetchSearch = searchText
		? {
				name: { contains: searchText },
		  }
		: null;

	const leadTimeObj =
		leadTime.length > 0
			? {
					leadTime: { gt: leadTime[0], lt: leadTime[1] },
			  }
			: null;

	//Creating the final request object.
	const finalAttrObj = {
		...(objFetchSearch && { ...objFetchSearch }),
		...(objFetchCountry.length > 0 && Object.assign({}, ...objFetchCountry)),
		...(objFetchUnitPrice && { ...objFetchUnitPrice }),
		...(leadTimeObj && { ...leadTimeObj }),
		...(objFetchStringsMoq && { ...objFetchStringsMoq }),
		...(objFetchStringWarranty && { ...objFetchStringWarranty }),
	};

	//Combining objects into one request object
	const combinedJsonObj = {
		attr: finalAttrObj,
	};

	//Converting the combinedJsonObj to JSON for the request.
	const finalJsonString = JSON.stringify(combinedJsonObj);

	const fetchData = async (JsonString: string) => {
		try {
			dispatch(setStatus('pending'));
			const response = await api.product.getFavorites({
				page: activePage,
				limit: 10,
				sortParams: sortDirection ? sortDirection : { id: 'desc' },
				searchParams: JsonString,
			});
			setTotalPages(response.totalPages < 1 ? 1 : response.totalPages);
			dispatch(setProducts(response.result));
			dispatch(setTotal(response.total));
			dispatch(setStatus('success'));
		} catch (error) {
			dispatch(setStatus('rejected'));
		}
	};

	useEffect(() => {
		if (user && statusGetUser !== 'pending') {
			fetchData(finalJsonString);
			dispatch(setModal(''));
		}
		if (!user && statusGetUser !== 'pending') {
			dispatch(setModal('login'));
		}
	}, [activePage, productsFilter, statusGetUser, user, sortDirection]);

	return (
		<div className={s.wrapper}>
			<h3 className={s.title}>My favorites</h3>
			<ProductsFilter />
			<div className={s.content}>
				<Products filtersEmpty={filtersEmpty} products={products} status={status} />
				<Pagination
					setActivePage={setActivePageFunction}
					buttons={true}
					totalPages={totalPages}
					currentPage={activePage}
				/>
			</div>
		</div>
	);
};
