'use client';
import s from './Marketplace.module.scss';
import { Header } from './Header';
import { Filters } from './Filters';
import { ProductsFilter } from './ProductsFilter';
import { Products } from './Products';
import { Pagination } from '@/components/Features/Pagination';
import { setStatus } from '@/redux/slices/marketplace/products';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { setProducts, setTotal } from '@/redux/slices/marketplace/products';
import { useEffect, useState } from 'react';
import { Api } from '@/services';
import { setItemsFilter } from '@/redux/slices/marketplace/filters';
import { transformCharData } from './utils';

export const Marketplace = () => {
	const dispatch = useAppDispatch();
	const api = Api();
	const [totalPages, setTotalPages] = useState<number>(2);

	const products = useAppSelector((state) => state.productSlice.products);
	const activePage = useAppSelector((state) => state.productSlice.activePage);
	const total = useAppSelector((state) => state.productSlice.total);
	const status = useAppSelector((state) => state.productSlice.status);
	const productsFilter = useAppSelector((state) => state.productsFilter);

	const storeProductsFilter = productsFilter.storeProductsFilter;
	const charData = useAppSelector((state) => state.filtersSlice.char);
	//get items
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

	const jsonStringsUnitPrice = {
		unitPrice: {
			gt: minUnitPrice ? minUnitPrice : 0,
			lt: maxUnitPrice ? maxUnitPrice : 100000000000,
		},
	};

	const jsonStringsMoq = {
		moq: { gt: moqMin ? moqMin : 0, lt: moqMax ? moqMax : 100000000000 },
	};

	const jsonStringWarranty =
		warrantyMin && warrantyMax
			? {
					warranty: {
						gt: moqMin ? moqMin : 0,
						lt: moqMax ? moqMax : 100000000000,
					},
			  }
			: null;

	const jsonStringsCountry = countryOfOrigin.map((item: any) => {
		return {
			countryOfOrigin: { contains: item },
		};
	});

	const jsonStringsSearch = searchText
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

	const filanFiltersObj = transformCharData(charData);
	const finalAttrObj = {
		...(jsonStringsSearch && { ...jsonStringsSearch }),
		...(jsonStringsCountry.length > 0 && Object.assign({}, ...jsonStringsCountry)),
		...(jsonStringsUnitPrice && { ...jsonStringsUnitPrice }),
		...(leadTimeObj && { ...leadTimeObj }),
		...(jsonStringsMoq && { ...jsonStringsMoq }),
		...(jsonStringWarranty && { ...jsonStringWarranty }),
	};

	const combinedJsonObj = {
		attr: finalAttrObj,
		dynamic_attr: filanFiltersObj,
	};

	const finalJsonString = JSON.stringify(combinedJsonObj);
	console.log('finalJsonString', finalJsonString);
	const fetchData = async () => {
		try {
			dispatch(setStatus('pending'));
			const response = await api.product.getProduct({
				page: activePage,
				limit: 10,
				sortParams: {
					id: 'desc',
				},
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
			const response = await api.product.getFilters();
			dispatch(setItemsFilter(response.charFilters));
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		getFiltersFunction();
		fetchData();
	}, [activePage, productsFilter, charData]);

	return (
		<div className={s.wrapper}>
			<div className={s.header}>
				<Header />
				<Filters />
				<ProductsFilter />
				<Products status={status} total={total} products={products} />
			</div>
			<Pagination buttons={true} totalPages={totalPages} currentPage={activePage} />
		</div>
	);
};
