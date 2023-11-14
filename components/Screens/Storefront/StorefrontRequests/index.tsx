'use client';
import s from './Requests.module.scss';
import { Filters } from './Filters';
import { RequestTable } from './RequestTable';
import { PaginationWrapper } from './PaginationWrapper';
import { useState } from 'react';

export const StorefrontRequests = () => {
	//store filters-inputs value
	const [stateInputs, setStateInputs] = useState({
		search: '',
		manufacturer: [],
		status: [],
		orderType: [],
	});

	const [currentPage, setCurrentPage] = useState<number>(1);

	const data = [
		{
			customer: 'Domatic Inc.',
			RFQ: 3,
			QTY: 50,
			measurement: 'Unit',
			budget: 100.0,
			status: 'Draft',
			shipTo: 'City, State, 00000, Country',
		},
		{
			customer: 'ABC Co.',
			RFQ: 2,
			QTY: 90,
			measurement: 'Unit',
			budget: 100.0,
			status: 'Sampling',
			shipTo: 'City, State, 00000, Country',
		},
		{
			customer: 'Domatic Inc. Two',
			RFQ: 4,
			QTY: 50,
			measurement: 'Sampling',
			budget: 100.0,
			status: 'Draft',
			shipTo: 'City, State, 00000, Country',
		},
		{
			customer: 'ABC Co.',
			RFQ: 2,
			QTY: 90,
			measurement: 'Unit',
			budget: 100.0,
			status: 'Sampling',
			shipTo: 'City, State, 00000, Country',
		},
		{
			customer: 'ABC Co.',
			RFQ: 2,
			QTY: 90,
			measurement: 'Unit',
			budget: 100.0,
			status: 'Sampling',
			shipTo: 'City, State, 00000, Country',
		},
		{
			customer: 'ABC Co.',
			RFQ: 2,
			QTY: 90,
			measurement: 'Unit',
			budget: 100.0,
			status: 'Sampling',
			shipTo: 'City, State, 00000, Country',
		},
		{
			customer: 'ABC Co.',
			RFQ: 2,
			QTY: 90,
			measurement: 'Unit',
			budget: 100.0,
			status: 'Sampling',
			shipTo: 'City, State, 00000, Country',
		},
	];
	{
		return (
			<div className={s.wrapper}>
				<Filters stateInputs={stateInputs} setStateInputs={setStateInputs} />
				<RequestTable data={data} />
				<PaginationWrapper
					currentPage={currentPage}
					setActivePage={setCurrentPage}
					totalPages={20}
				/>
			</div>
		);
	}
};
