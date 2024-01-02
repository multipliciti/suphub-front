'use client';
import { Filters } from './Filters';
import { useEffect, useState } from 'react';
import { ProjectsTable } from './ProjectsTable';
import { PaginationWrapper } from './PaginationWrapper';
import { Api } from '@/services';
import { Order } from '@/types/services/projects';
import { Spinner } from '@/components/UI/Spinner';
export const StorefrontOrders = () => {
	const api = Api();
	//store filters-inputs value
	const [stateInputs, setStateInputs] = useState({
		search: '',
		manufacturer: [],
		status: [],
		orderType: [],
	});

	const [totalItems, setTotalItems] = useState<number>(0);
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [totalPages, setTotalPages] = useState<number>(0);
	const limitItems = 12;

	const [orders, setOrders] = useState<Order[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const columns = [
		{ title: 'PO#', key: 'PO#' },
		{ title: 'Issue Date', key: 'Issue Date' },
		{ title: 'Manufacturer', key: 'Manufacturer' },
		{ title: 'Product', key: 'Product' },
		{ title: 'Order Type', key: 'Order Type' },
		{ title: 'Subtotal (USD)', key: 'Subtotal (USD)' },
		{ title: 'Status', key: 'Status' },
		{ title: 'Est.Delivery', key: 'Est.Delivery' },
	];

	// create fetch objs
	const objFetchSearch = stateInputs.search
		? {
				status: { contains: stateInputs.search },
		  }
		: null;
	const statusFilterArr =
		stateInputs.status.length > 0
			? {
					status: { in: stateInputs.status },
			  }
			: null;

	const orderTypeFilterArr =
		stateInputs.orderType.length > 0
			? {
					type: { in: stateInputs.orderType },
			  }
			: null;

	const finalAttrObj = {
		...(objFetchSearch && { ...objFetchSearch }),
		...(statusFilterArr && { ...statusFilterArr }),
		...(orderTypeFilterArr && { ...orderTypeFilterArr }),
	};

	//Converting the combinedJsonObj to JSON for the request.
	const finalJsonString = JSON.stringify(finalAttrObj);

	const getOrders = async () => {
		try {
			const orders = await api.sellerProject.getSellerOrders({
				page: currentPage,
				limit: limitItems,
				searchParams: finalJsonString,
			});
			const ordersGot: Order[] = orders.result;

			setOrders(ordersGot);
			setTotalItems(orders.total);
			setTotalPages(orders.totalPages);
			setIsLoading(false);
		} catch (error) {
			console.error('getOrders seller error', error);
		}
	};

	useEffect(() => {
		getOrders();
	}, [stateInputs, currentPage]);

	{
		return (
			<div>
				<Filters stateInputs={stateInputs} setStateInputs={setStateInputs} />
				{isLoading ? (
					<Spinner style={{ marginTop: '9vh' }} />
				) : (
					<>
						{orders.length > 0 && <ProjectsTable columns={columns} data={orders} />}
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
