'use client';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

import { NoResult } from './NoResult';
import { RFQCartFilters } from './RFQCartFilters';
import { Products } from './Products';
import { RfqItemGot } from '@/types/services/rfq';
import { Api } from '@/services';
import { IsBuyerSideBarRequestDetail } from '@/components/Containers/IsBuyerSideBarRequestDetail/IsBuyerSideBarRequestDetail';
import { Spinner } from '@/components/UI/Spinner';
export const ProjectsRFQCart = () => {
	const pathname = usePathname();
	const api = Api();
	const [stateInputs, setStateInputs] = useState({
		search: '',
		categories: [],
		statuses: [],
	});
	const [isLoading, setIsLoading] = useState<boolean>(false);

	//get projectId from url
	const path = pathname;
	const match = path.match(/\/projects\/(\d+)\/rfq/);
	const projectId = match && match[1];

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
					subCategoryId: { in: stateInputs.categories },
			  }
			: null;

	const statusesFilterArr =
		stateInputs.statuses.length > 0
			? {
					status: { in: stateInputs.statuses },
			  }
			: null;

	const objFetchCategories = stateInputs.categories.map((item: any) => {
		return {
			countryOfOrigin: { contains: item },
		};
	});

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
				page: 1,
				limit: 10,
				projectId: Number(projectId),
				searchParams: finalJsonString,
			});
			const data: RfqItemGot[] = await response.result;

			const groupedData: Record<string, RfqItemGot[]> = data.reduce(
				(acc, item) => {
					const csiCode = item.subCategory.csiCode;
					if (!acc[csiCode]) {
						acc[csiCode] = [];
					}
					acc[csiCode].push(item);
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
		setIsLoading(true);
		fetchData();
		setIsLoading(false);
	}, [stateInputs]);

	{
		return (
			<div>
				<IsBuyerSideBarRequestDetail>
					{isLoading ? (
						<Spinner />
					) : (
						<>
							<RFQCartFilters
								stateInputs={stateInputs}
								setStateInputs={setStateInputs}
							/>
							{rfqsSorted.length < 1 ? <NoResult /> : <Products rfqs={rfqsSorted} />}
						</>
					)}
				</IsBuyerSideBarRequestDetail>
			</div>
		);
	}
};
