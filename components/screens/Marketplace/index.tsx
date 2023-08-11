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

export const Marketplace = () => {
	const dispatch = useAppDispatch();
	const api = Api();
	const [totalPages, setTotalPages] = useState<number>(2);

	const products = useAppSelector((state) => state.productSlice.products);
	const activePage = useAppSelector((state) => state.productSlice.activePage);
	const total = useAppSelector((state) => state.productSlice.total);
	const status = useAppSelector((state) => state.productSlice.status);
	const storeProductsFilter = useAppSelector(
		(state) => state.productsFilter.storeProductsFilter
	);

	const minUnitPrice = storeProductsFilter.filter((el) => {
		return el.key === 'unitPrice';
	})[0].min;
	const maxUnitPrice = storeProductsFilter.filter((el) => {
		return el.key === 'unitPrice';
	})[0].max;
	const moqMin = storeProductsFilter.filter((el) => {
		return el.key === 'moq';
	})[0].min;
	const moqMax = storeProductsFilter.filter((el) => {
		return el.key === 'moq';
	})[0].max;
	const leadTime =
		storeProductsFilter.filter((el) => {
			return el.key === 'leadTime';
		})[0].selectedItems || '';
	const warrantyMin =
		storeProductsFilter.filter((el) => {
			return el.key === 'warranty';
		})[0].min || '';
	const warrantyMax =
		storeProductsFilter.filter((el) => {
			return el.key === 'warranty';
		})[0].max || '';
	const countryOfOrigin = storeProductsFilter.filter((el) => {
		return el.key === 'countryOfOrigin';
	})[0].selectedItems;

	const jsonStrings = countryOfOrigin?.map((item) => {
		return `"countryOfOrigin": {"contains": "${item}"}`;
	});

	const combinedJsonString = jsonStrings?.join(', ');

	const finalJsonString = `{ ${combinedJsonString} }`;

	console.log('finalJsonString', finalJsonString);

	const fetchData = async () => {
		dispatch(setStatus('pending'));
		try {
			const response = await api.product.getProduct({
				page: activePage,
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

	useEffect(() => {
		fetchData();
	}, [activePage]);
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
