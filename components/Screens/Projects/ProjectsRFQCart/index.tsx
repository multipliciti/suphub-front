'use client';
import { useEffect, useState } from 'react';

import { NoResult } from './NoResult';
import { RFQCartFilters } from './RFQCartFilters';
import { Products } from './Products';
import { RfqItemGot } from '@/types/services/rfq';
import { Api } from '@/services';
import { useAppSelector } from '@/redux/hooks';
import { IsBuyerSideBarRequestDetail } from '@/components/Containers/IsBuyerSideBarRequestDetail/IsBuyerSideBarRequestDetail';
import { Spinner } from '@/components/UI/Spinner';

type TypeProps = {
	projectId: number;
};

export const ProjectsRFQCart = ({ projectId }: TypeProps) => {
	const api = Api();
	const [stateInputs, setStateInputs] = useState({
		search: '',
		categories: [],
		statuses: [],
	});
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const modal = useAppSelector((state) => state.modalSlice.modal);

	const [rfqsSorted, setRfqsSorted] = useState<RfqItemGot[][]>([]);

	// create fetch objs
	const objFetchSearch = stateInputs.search
		? {
				productName: { contains: stateInputs.search },
		  }
		: null;

	const categoriesFilterArr =
		stateInputs.categories.length > 0
			? {
					subCategory: { category: { id: { in: stateInputs.categories } } },
			  }
			: null;

	const statusesFilterArr =
		stateInputs.statuses.length > 0
			? {
					status: { in: stateInputs.statuses },
			  }
			: null;

	const finalAttrObj = {
		...(objFetchSearch && { ...objFetchSearch }),
		...(statusesFilterArr && { ...statusesFilterArr }),
		...(categoriesFilterArr && { ...categoriesFilterArr }),
	};

	//Converting the combinedJsonObj to JSON for the request.
	const finalJsonString = JSON.stringify(finalAttrObj);

	const fetchData = async () => {
		try {
			const response = await api.rfq.getRfqByProject({
				limit: 1_000_000,
				projectId: Number(projectId),
				searchParams: finalJsonString,
			});

			const data: RfqItemGot[] = await response.result;
			setIsLoading(false);

			//sorted and set got data
			const groupedData: Record<string, RfqItemGot[]> = data.reduce(
				(acc, item) => {
					const categoryId = item.subCategory.category.id;
					if (!acc[categoryId]) {
						acc[categoryId] = [];
					}
					acc[categoryId].push(item);
					return acc;
				},
				{} as Record<string, RfqItemGot[]>
			);
			const sortedData: RfqItemGot[][] = Object.values(groupedData);
			setRfqsSorted(sortedData);
		} catch (error) {
			console.log('error fetch rfq', error);
		}
	};

	useEffect(() => {
		//for rerender (update fetch) when set modal = '' after create new rfq
		if (modal === '') {
			setIsLoading(true);
			fetchData();
		}
	}, [stateInputs, modal]);

	{
		return (
			<div>
				<IsBuyerSideBarRequestDetail>
					<RFQCartFilters
						stateInputs={stateInputs}
						setStateInputs={setStateInputs}
					/>
					{/* // */}
					<>
						{isLoading ? (
							<Spinner />
						) : rfqsSorted.length < 1 ? (
							<NoResult />
						) : (
							<Products projectId={projectId} rfqs={rfqsSorted} />
						)}
					</>
				</IsBuyerSideBarRequestDetail>
			</div>
		);
	}
};
