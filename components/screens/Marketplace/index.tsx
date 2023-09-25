'use client';
import s from './Marketplace.module.scss';
import { Header } from './Header';
import { Filters } from './Filters';
import { ProductsFilter } from './ProductsFilter';
import { Products } from './Products';
import { Pagination } from '@/components/Features/Pagination';
import { setActivePage, setStatus } from '@/redux/slices/marketplace/products';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { setProducts, setTotal } from '@/redux/slices/marketplace/products';
import { useEffect, useState } from 'react';
import { Api } from '@/services';
import { setItemsFilter } from '@/redux/slices/marketplace/filters';
//utils
import { transformCharData } from '@/utils/productsUtils';
import { checkFiltersEmpty } from '@/utils/productsUtils';
import { checkCharsEmpty } from '@/utils/productsUtils';
import { createObjFetch } from '@/utils/productsUtils';

export const Marketplace = () => {
	const dispatch = useAppDispatch();
	const api = Api();
	const [totalPages, setTotalPages] = useState<number>(2);
	const products = useAppSelector((state) => state.marketplaceProduct.products);
	const activePage = useAppSelector((state) => state.marketplaceProduct.activePage);
	const total = useAppSelector((state) => state.marketplaceProduct.total);
	const status = useAppSelector((state) => state.marketplaceProduct.status);
	const productsFilter = useAppSelector((state) => state.marketplaceProductFilter);
	const storeProductsFilter = productsFilter.storeProductsFilter;
	const charData = useAppSelector((state) => state.filtersSlice.char);
	//get items for filters
	const sortDirection = useAppSelector(
		(state) => state.marketplaceProductFilter.sortDirection
	);
	const activeId = useAppSelector((state) => state.sideBarSlice.activeId);
	const searchText = productsFilter.searchProductsFilter;
	const minUnitPrice = storeProductsFilter.find((el) => el.key === 'unitPrice')?.min;
	const maxUnitPrice = storeProductsFilter.find((el) => el.key === 'unitPrice')?.max;
	const leadTime =
		storeProductsFilter.find((el) => el.key === 'leadTime')?.selectedItems || '';
	const moqMin = storeProductsFilter.find((el) => el.key === 'moq')?.min;
	const moqMax = storeProductsFilter.find((el) => el.key === 'moq')?.max;
	const warrantyMin = storeProductsFilter.find((el) => el.key === 'warranty')?.min;
	const warrantyMax = storeProductsFilter.find((el) => el.key === 'warranty')?.max;
	const countryOfOrigin =
		storeProductsFilter.find((el) => el.key === 'countryOfOrigin')?.selectedItems ||
		[];
	const setActivePageFunction = (n: number) => {
		dispatch(setActivePage(n));
	};
	const filtersEmpty =
		checkFiltersEmpty(storeProductsFilter) || checkCharsEmpty(charData);

	//Creating request objects
	const subCategoryId = {
		subCategoryId: activeId,
	};
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

	//Creating the final request object. ( 2 objs )
	//1
	const filanFiltersObj = transformCharData(charData);
	//2
	const finalAttrObj = {
		...subCategoryId,
		...(objFetchSearch && { ...objFetchSearch }),
		...(objFetchCountry.length > 0 && Object.assign({}, ...objFetchCountry)),
		...(objFetchUnitPrice && { ...objFetchUnitPrice }),
		...(leadTimeObj && { ...leadTimeObj }),
		...(objFetchStringsMoq && { ...objFetchStringsMoq }),
		...(objFetchStringWarranty && { ...objFetchStringWarranty }),
	};

	//Combining two objects into one request object
	const combinedJsonObj = {
		attr: finalAttrObj,
		dynamic_attr: filanFiltersObj,
	};

	//Converting the combinedJsonObj to JSON for the request.
	const finalJsonString = JSON.stringify(combinedJsonObj);

	//Request products
	const fetchData = async () => {
		try {
			dispatch(setStatus('pending'));
			const response = await api.product.getProduct({
				page: activePage,
				limit: 10,
				sortParams: sortDirection ? sortDirection : { id: 'desc' },
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

	const getFiltersFunction = async () => {
		try {
			const response = await api.product.getFilters(activeId);
			dispatch(setItemsFilter(response.charFilters));
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		getFiltersFunction();
		fetchData();
		if (products.length > 0) {
			setTotalPages(Math.ceil(totalPages / 4));
		}
	}, [activePage, productsFilter, charData, activeId]);

	return (
		<div className={s.wrapper}>
			<div className={s.header}>
				<Header />
				<Filters />
				<ProductsFilter />
				<Products
					filtersEmpty={filtersEmpty}
					status={status}
					total={total}
					products={products}
				/>
			</div>
			<Pagination
				setActivePage={setActivePageFunction}
				buttons={true}
				totalPages={totalPages}
				currentPage={activePage}
			/>
		</div>
	);
};
