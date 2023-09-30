'use client';
import { useState } from 'react';
import { NoResult } from './NoResult';
import { RFQCarFilters } from './RFQCarFilters';
export const RFQCar = () => {
	//store filters-inputs value
	const [stateInputs, setStateInputs] = useState({
		search: '',
		categories: [],
		status: [],
	});
	//for btn change request, after we shoud make fetch
	const [request, setRequest] = useState<number>(1);
	{
		return (
			<div>
				<RFQCarFilters
					setRequest={setRequest}
					stateInputs={stateInputs}
					setStateInputs={setStateInputs}
				/>
				{/* <NoResult /> */}
			</div>
		);
	}
};
