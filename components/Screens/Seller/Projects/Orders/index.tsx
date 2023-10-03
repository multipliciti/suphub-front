'use client';
import { Filters } from './Filters';
import { useState } from 'react';
import { ProjectsTable } from './ProjectsTable';
import { PaginationWrapper } from './PaginationWrapper';

export const Orders = () => {
	//store filters-inputs value
	const [stateInputs, setStateInputs] = useState({
		search: '',
		manufacturer: [],
		status: [],
		orderType: [],
	});

	const [currentPage, setCurrentPage] = useState<number>(1);

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

	const data = [
		{
			'PO#': 'S0596',
			'Issue Date': '02/26/2023',
			Manufacturer: 'Example',
			Product: 'Garage Door',
			'Order Type': 'Sample order',
			'Subtotal (USD)': '1000$',
			Status: 'Payment pending',
			'Est.Delivery': 'Est.Delivery',
		},
		{
			'PO#': 'S0593',
			'Issue Date': '02/26/2023',
			Manufacturer: 'Example',
			Product: 'Garage Door',
			'Order Type': 'Purchase order',
			'Subtotal (USD)': '1000$',
			Status: 'In transit',
			'Est.Delivery': 'Est.Delivery',
		},
		{
			'PO#': 'S0593',
			'Issue Date': '02/26/2023',
			Manufacturer: 'Example',
			Product: 'Garage Door',
			'Order Type': 'Purchase order',
			'Subtotal (USD)': '1000$',
			Status: 'In production',
			'Est.Delivery': 'Est.Delivery',
		},
		{
			'PO#': 'S0593',
			'Issue Date': '02/26/2023',
			Manufacturer: 'Example',
			Product: 'Garage Door',
			'Order Type': 'Purchase order',
			'Subtotal (USD)': '1000$',
			Status: 'PO issued',
			'Est.Delivery': 'Est.Delivery',
		},
		{
			'PO#': 'S0593',
			'Issue Date': '02/26/2023',
			Manufacturer: 'Example',
			Product: 'Garage Door mlknslkdcnasdfnlkanflknasknklnskf',
			'Order Type': 'Purchase order',
			'Subtotal (USD)': '1000$',
			Status: 'Delivered',
			'Est.Delivery': 'Est.Delivery',
		},
		// {
		// 	'PO#': 'S0596',
		// 	'Issue Date': '02/26/2023',
		// 	Manufacturer: 'Example',
		// 	Product: 'Garage Door',
		// 	'Order Type': 'Purchase order',
		// 	'Subtotal (USD)': '1000$',
		// 	Status: 'Payment pending',
		// 	'Est.Delivery': 'Est.Delivery',
		// },
		// {
		// 	'PO#': 'S0593',
		// 	'Issue Date': '02/26/2023',
		// 	Manufacturer: 'Example',
		// 	Product: 'Garage Door',
		// 	'Order Type': 'Purchase order',
		// 	'Subtotal (USD)': '1000$',
		// 	Status: 'In transit',
		// 	'Est.Delivery': 'Est.Delivery',
		// },
		// {
		// 	'PO#': 'S0593',
		// 	'Issue Date': '02/26/2023',
		// 	Manufacturer: 'Example',
		// 	Product: 'Garage Door',
		// 	'Order Type': 'Purchase order',
		// 	'Subtotal (USD)': '1000$',
		// 	Status: 'In production',
		// 	'Est.Delivery': 'Est.Delivery',
		// },
		// {
		// 	'PO#': 'S0593',
		// 	'Issue Date': '02/26/2023',
		// 	Manufacturer: 'Example',
		// 	Product: 'Garage Door',
		// 	'Order Type': 'Purchase order',
		// 	'Subtotal (USD)': '1000$',
		// 	Status: 'PO issued',
		// 	'Est.Delivery': 'Est.Delivery',
		// },
		// {
		// 	'PO#': 'S0593',
		// 	'Issue Date': '02/26/2023',
		// 	Manufacturer: 'Example',
		// 	Product: 'Garage Door',
		// 	'Order Type': 'Purchase order',
		// 	'Subtotal (USD)': '1000$',
		// 	Status: 'Delivered',
		// 	'Est.Delivery': 'Est.Delivery',
		// },
	];

	{
		return (
			<div>
				<Filters stateInputs={stateInputs} setStateInputs={setStateInputs} />
				<ProjectsTable columns={columns} data={data} />
				{/* <PaginationWrapper
					currentPage={currentPage}
					setActivePage={setCurrentPage}
					totalPages={20}
				/> */}
			</div>
		);
	}
};
