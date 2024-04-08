'use client';
import s from './ProjectsOrders.module.scss';
import { Filters } from './Filters';
import { useState, useEffect } from 'react';
import { ProjectsTable } from './ProjectsTable';
import { PaginationWrapper } from './PaginationWrapper';
import { Api } from '@/services';
import { Order } from '@/types/services/projects';
import { Spinner } from '@/components/UI/Spinner';

type typeProps = {
	projectId: number;
};

export const ProjectsOrders = ({ projectId }: typeProps) => {
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

	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [orders, setOrders] = useState<Order[]>([]);

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
			const orders = await api.buyerProject.getBuyerOrders({
				projectId,
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
			console.error('getOrders buyer error', error);
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
					<Spinner />
				) : (
					<div className={s.wrapper_table}>
						<ProjectsTable projectId={projectId} data={orders} />
						<PaginationWrapper
							limitItems={limitItems}
							totalItems={totalItems}
							currentPage={currentPage}
							setActivePage={setCurrentPage}
							totalPages={totalPages}
						/>
					</div>
				)}
			</div>
		);
	}
};
