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

	const [currentPage, setCurrentPage] = useState<number>(1);
	const [orders, setOrders] = useState<Order[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);
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
		setIsLoading(true);
		try {
			const orders = await api.sellerProject.getSellerOrders({
				page: currentPage,
				limit: 12,
				searchParams: finalJsonString,
			});
			const ordersGot: Order[] = orders.result;

			setOrders(ordersGot);
		} catch (error) {
			console.error('getOrders seller error', error);
		}
		setIsLoading(false);
	};

	useEffect(() => {
		getOrders();
	}, [stateInputs, currentPage]);

	{
		return (
			<div>
				<Filters stateInputs={stateInputs} setStateInputs={setStateInputs} />
				{isLoading ? (
					<Spinner />
				) : (
					<>
						{orders.length > 0 && <ProjectsTable columns={columns} data={orders} />}
						<PaginationWrapper
							currentPage={currentPage}
							setActivePage={setCurrentPage}
							totalPages={20}
						/>
					</>
				)}
			</div>
		);
	}
};
