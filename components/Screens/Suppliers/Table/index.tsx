'use client';
import { Filters } from './Filters';
import { useEffect, useState } from 'react';
import { SuppliersTable } from './SuppliersTable';
import { PaginationWrapper } from './PaginationWrapper';
import { Api } from '@/services';
import { Supplier, temporaryDataSuppliers } from '@/services/suppliers';
import { Spinner } from '@/components/UI/Spinner';

export const SuppliersTablePage = () => {
	const api = Api();
	//store filters-inputs value
	const [stateInputs, setStateInputs] = useState({
		search: '',
		manufacturer: [],
		categories: [],
	});

	const [totalItems, setTotalItems] = useState<number>(0);
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [totalPages, setTotalPages] = useState<number>(0);
	const limitItems = 12;

	const [suppliers, setSuppliers] = useState<Supplier[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(true);

	// create fetch objs
	const objFetchSearch = stateInputs.search
		? {
				status: { contains: stateInputs.search },
		  }
		: null;
	const categoriesFilterArr =
		stateInputs.categories.length > 0
			? {
					subCategory: { category: { id: { in: stateInputs.categories } } },
			  }
			: null;

	const finalAttrObj = {
		...(categoriesFilterArr && { ...categoriesFilterArr }),
		...(objFetchSearch && { ...objFetchSearch }),
	};

	//Converting the combinedJsonObj to JSON for the request.
	const finalJsonString = JSON.stringify(finalAttrObj);

	const getSuppliers = async () => {
		try {
			// const orders = await api.sellerProject.getSellerOrders({
			// 	page: currentPage,
			// 	limit: limitItems,
			// 	searchParams: finalJsonString,
			// });
			// const suppliersGot: Supplier[] = orders.result;

			// setOrders(ordersGot);
			// setTotalItems(orders.total);
			// setTotalPages(orders.totalPages);
			setSuppliers(temporaryDataSuppliers);
			setTotalItems(temporaryDataSuppliers.length);
			setTotalPages(1);

			setIsLoading(false);
		} catch (error) {
			console.error('getSuppliers seller error', error);
		}
	};

	useEffect(() => {
		getSuppliers();
	}, [stateInputs, currentPage]);

	{
		return (
			<div>
				<Filters stateInputs={stateInputs} setStateInputs={setStateInputs} />
				{isLoading ? (
					<Spinner style={{ marginTop: '9vh' }} />
				) : (
					<>
						{suppliers.length > 0 && <SuppliersTable data={suppliers} />}
						<PaginationWrapper
							limitItems={limitItems}
							totalItems={totalItems}
							currentPage={currentPage}
							setActivePage={setCurrentPage}
							totalPages={totalPages}
						/>
					</>
				)}
			</div>
		);
	}
};
