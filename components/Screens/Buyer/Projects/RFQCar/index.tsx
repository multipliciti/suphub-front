'use client';
import { useEffect, useState } from 'react';
import { NoResult } from './NoResult';
import { RFQCarFilters } from './RFQCarFilters';
import { Products } from './Products';
import { RfqItemGot } from '@/types/services/rfq';
import { Api } from '@/services';
export const RFQCar = () => {
	const api = Api();
	const [stateInputs, setStateInputs] = useState({
		search: '',
		categories: [],
		statuses: [],
	});

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
					categories: { in: stateInputs.categories },
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
		// ...(objFetchCategories.length > 0 && Object.assign({}, ...objFetchCategories)),
	};

	//Combining two objects into one request object
	const combinedJsonObj = {
		attr: finalAttrObj,
	};

	//Converting the combinedJsonObj to JSON for the request.
	const finalJsonString = JSON.stringify(finalAttrObj);

	const fetchData = async () => {
		console.log('start fetchData');
		try {
			const response = await api.rfq.getRfqByProject({
				page: 1,
				limit: 10,
				projectId: 2,
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
		fetchData();
	}, [stateInputs]);

	// Вызываем fetchData для загрузки данных
	useEffect(() => {
		fetchData();
	}, []);

	//for btn change request, after we shoud make fetch
	// const data = [
	// 	{
	// 		id: 1,
	// 		indificator: 'CSI 08',
	// 		category: 'Doors and Windows',
	// 		quotations: [
	// 			{
	// 				id: 1,
	// 				items: [
	// 					{
	// 						id: 1,
	// 						title: 'Weika',
	// 						price: '$561.90',
	// 					},
	// 					{
	// 						id: 2,
	// 						title: 'GGG',
	// 						price: '$561.90',
	// 					},
	// 					{
	// 						id: 3,
	// 						title: 'Best window',
	// 						price: '$561.90',
	// 					},
	// 				],
	// 			},
	// 			{
	// 				id: 2,
	// 				items: [
	// 					{
	// 						id: 4,
	// 						title: 'Weika',
	// 						price: '$561.90',
	// 					},
	// 					{
	// 						id: 5,
	// 						title: 'GGG',
	// 						price: '$561.90',
	// 					},
	// 					{
	// 						id: 6,
	// 						title: 'Best window',
	// 						price: '$561.90',
	// 					},
	// 				],
	// 			},
	// 			{
	// 				id: 3,
	// 				items: [
	// 					{
	// 						id: 7,
	// 						title: 'Weika',
	// 						price: '$561.90',
	// 					},
	// 					{
	// 						id: 8,
	// 						title: 'GGG',
	// 						price: '$561.90',
	// 					},
	// 					{
	// 						id: 9,
	// 						title: 'Best window',
	// 						price: '$561.90',
	// 					},
	// 				],
	// 			},
	// 		],
	// 		properties: [
	// 			{
	// 				id: 1,
	// 				items: {
	// 					subtitle: 'CSI 08 37 00',
	// 					title: 'Single hung window',
	// 					chat: 2,
	// 					size: '36” x 60”',
	// 					quantity: 50,
	// 					unit: 'Unit',
	// 					status: 'Selection needed',
	// 					unitbudget: 400.0,
	// 				},
	// 			},
	// 			{
	// 				id: 2,
	// 				items: {
	// 					subtitle: 'CSI 08 37 00',
	// 					title: 'Single hung window',
	// 					chat: 0,
	// 					size: '36” x 60”',
	// 					quantity: 50,
	// 					unit: 'Unit',
	// 					status: 'Sampling',
	// 					unitbudget: 400.0,
	// 				},
	// 			},
	// 			{
	// 				id: 3,
	// 				items: {
	// 					subtitle: 'CSI 08 37 00',
	// 					title: 'Single hung window',
	// 					chat: 0,
	// 					size: '36” x 60”',
	// 					quantity: 50,
	// 					unit: 'Unit',
	// 					status: 'Ordered',
	// 					unitbudget: 400.0,
	// 				},
	// 			},
	// 		],
	// 	},
	// 	{
	// 		id: 2,
	// 		indificator: 'CSI 08',
	// 		category: 'Doors and Windows',
	// 		quotations: [
	// 			{
	// 				id: 1,
	// 				items: [
	// 					{
	// 						id: 1,
	// 						title: 'Weika',
	// 						price: '$561.90',
	// 					},
	// 					{
	// 						id: 2,
	// 						title: 'GGG',
	// 						price: '$561.90',
	// 					},
	// 					{
	// 						id: 3,
	// 						title: 'Best window',
	// 						price: '$561.90',
	// 					},
	// 				],
	// 			},
	// 			{
	// 				id: 2,
	// 				items: [
	// 					{
	// 						id: 4,
	// 						title: 'Weika',
	// 						price: '$561.90',
	// 					},
	// 					{
	// 						id: 5,
	// 						title: 'GGG',
	// 						price: '$561.90',
	// 					},
	// 					{
	// 						id: 6,
	// 						title: 'Best window',
	// 						price: '$561.90',
	// 					},
	// 				],
	// 			},
	// 			{
	// 				id: 3,
	// 				items: [
	// 					{
	// 						id: 7,
	// 						title: 'Weika',
	// 						price: '$561.90',
	// 					},
	// 					{
	// 						id: 8,
	// 						title: 'GGG',
	// 						price: '$561.90',
	// 					},
	// 					{
	// 						id: 9,
	// 						title: 'Best window',
	// 						price: '$561.90',
	// 					},
	// 				],
	// 			},
	// 		],
	// 		properties: [
	// 			{
	// 				id: 2,
	// 				items: {
	// 					subtitle: 'CSI 08 37 00',
	// 					title: 'Single hung window',
	// 					chat: 2,
	// 					size: '36” x 60”',
	// 					quantity: 50,
	// 					unit: 'Unit',
	// 					status: 'Selection needed',
	// 					unitbudget: 400.0,
	// 				},
	// 			},
	// 			{
	// 				id: 2,
	// 				items: {
	// 					subtitle: 'CSI 08 37 00',
	// 					title: 'Single hung window',
	// 					chat: 0,
	// 					size: '36” x 60”',
	// 					quantity: 50,
	// 					unit: 'Unit',
	// 					status: 'Sampling',
	// 					unitbudget: 400.0,
	// 				},
	// 			},
	// 			{
	// 				id: 3,
	// 				items: {
	// 					subtitle: 'CSI 08 37 00',
	// 					title: 'Single hung window',
	// 					chat: 0,
	// 					size: '36” x 60”',
	// 					quantity: 50,
	// 					unit: 'Unit',
	// 					status: 'Ordered',
	// 					unitbudget: 400.0,
	// 				},
	// 			},
	// 		],
	// 	},
	// ];
	{
		return (
			<div>
				<RFQCarFilters stateInputs={stateInputs} setStateInputs={setStateInputs} />
				{rfqsSorted.length < 1 ? <NoResult /> : <Products rfqs={rfqsSorted} />}
			</div>
		);
	}
};
