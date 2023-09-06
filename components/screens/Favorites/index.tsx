'use client';
import s from './Favorites.module.scss';
import { ProductsFilter } from './ProductsFilter';
import { Products } from './Products';
import { ProductItemType } from '@/types/products/product';
import { useAppSelector } from '@/redux/hooks';
import { setActivePage, setProducts, setStatus, setTotal } from '@/redux/slices/favorites/products';
import { Api } from '@/services';
import { Pagination } from '@/components/Features/Pagination';
import { useEffect, useState } from 'react';
import { useAppDispatch } from '@/redux/hooks';
import { setModal } from '@/redux/slices/modal';

export const FavoritesComponents = () => {
	const dispatch = useAppDispatch();
	const api = Api()
	const [totalPages, setTotalPages] = useState<number>(2);
	const user = useAppSelector((state)=> state.authSlice.user)
	const statusGetUser =  useAppSelector((state)=> state.authSlice.statusGetUser)
	const products = useAppSelector((state) => state.favoritesProduct.products);
	const activePage = useAppSelector((state) => state.favoritesProduct.activePage);
	const status = useAppSelector((state) => state.favoritesProduct.status);
	const productsFilter = useAppSelector((state) => state.favoritesProductFilter);
	const sortDirection = useAppSelector((state) => state.favoritesProductFilter.sortDirection);

	const storeProductsFilter = productsFilter.storeProductsFilter;
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

	const setActivePageFunction = (n: number)=>{
		dispatch(setActivePage(n))
	}

	const jsonStringsUnitPrice = (minUnitPrice || minUnitPrice) ? {
		moq: {
			...(minUnitPrice ? { gt: minUnitPrice } : {}),
			...(maxUnitPrice ? { lt: maxUnitPrice } : {}),
		},
	} : null;

	const jsonStringsMoq = (moqMin || moqMax) ? {
		moq: {
			...(moqMin ? { gt: moqMin } : {}),
			...(moqMax ? { lt: moqMax } : {}),
		},
	} : null;
	
	const jsonStringWarranty = (warrantyMin || warrantyMax) ? {
		warranty: {
			...(warrantyMin ? { gt: warrantyMin } : {}),
			...(warrantyMax ? { lt: warrantyMax } : {}),
		},
	} : null;

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
	};

	const finalJsonString = JSON.stringify(combinedJsonObj);

	const fetchData = async (JsonString: string) => {
		try {
			dispatch(setStatus('pending'));
			const response = await api.product.getFavorites({
				page: activePage,
				limit: 10,
				sortParams: sortDirection ? sortDirection : {id: "desc"}, 
				searchParams: JsonString,
			});
			dispatch(setProducts(response.result));
			dispatch(setTotal(response.total));
			dispatch(setStatus('seccess'));
		} catch (error) {
			dispatch(setStatus('rejected'));
		}
	};

	useEffect(() => {
		if(user && statusGetUser !== 'pending'){
			fetchData(finalJsonString)
			dispatch(setModal(''))
		}
		if(!user && statusGetUser !== 'pending'){
			dispatch(setModal('login'))
		} 
		if (products.length > 0) {
			setTotalPages(Math.ceil(totalPages / 4));
		}
	}, [activePage, productsFilter, statusGetUser, user, sortDirection]);

	return (
		<div className={s.wrapper}>
			<h3 className={s.title}>My favorites</h3>
			<ProductsFilter />
			<Products products={products} status={status}  />
			<div className={s.pagination}>
				<Pagination setActivePage={setActivePageFunction} buttons={true} totalPages={totalPages} currentPage={activePage} />
			</div>
			
		</div>
	);
};
