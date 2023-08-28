'use client';
import s from './Favorites.module.scss';
import { ProductsFilter } from './ProductsFilter';
import { Products } from './Products';
import { useAppSelector } from '@/redux/hooks';
import { setActivePage, setProducts, setStatus, setTotal } from '@/redux/slices/favorites/products';
import { Api } from '@/services';
import { Pagination } from '@/components/Features/Pagination';
import { useEffect, useState } from 'react';
import { useAppDispatch } from '@/redux/hooks';
import { setModal } from '@/redux/slices/modal';
import { setStatusGetUser, setUser } from '@/redux/slices/auth';
import { useRouter } from 'next/navigation';

export const FavoritesComponents = () => {
	const dispatch = useAppDispatch();
	const api = Api()
	const [totalPages, setTotalPages] = useState<number>(2);
	const { push } = useRouter();
	const user = useAppSelector((state)=> state.authSlice.user)
	const statusGetUser =  useAppSelector((state)=> state.authSlice.statusGetUser)
	const products = useAppSelector((state) => state.favoritesProduct.products);
	const activePage = useAppSelector((state) => state.favoritesProduct.activePage);
	const total = useAppSelector((state) => state.favoritesProduct.total);
	const status = useAppSelector((state) => state.favoritesProduct.status);
	const productsFilter = useAppSelector((state) => state.favoritesProductFilter);

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

	const setActivePageFunction = (n: number)=>{
		dispatch(setActivePage(n))
	}

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
				sortParams: {
					id: 'desc',
				},
				searchParams: JsonString,
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
		if(user && statusGetUser !== 'pending'){
			fetchData(finalJsonString)
			dispatch(setModal(''))
		}
		if(!user && statusGetUser !== 'pending'){
			dispatch(setModal('login'))
			push('/marketplace')
		} 
		if (products.length > 0) {
			setTotalPages(Math.ceil(totalPages / 4));
		}
	}, [activePage, productsFilter, charData, statusGetUser, products, user]);

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
