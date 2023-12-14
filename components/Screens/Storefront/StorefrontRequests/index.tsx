'use client';
import s from './StorefrontRequests.module.scss';
import { Filters } from './Filters';
import { RequestTable } from './RequestTable';
import { PaginationWrapper } from './PaginationWrapper';
import { useState, useEffect } from 'react';
import { Api } from '@/services';
import { setProjects } from '@/redux/slices/storefront/storefrontProjectsSeller';
import { useAppDispatch } from '@/redux/hooks';
import { Spinner } from '@/components/UI/Spinner';
export const StorefrontRequests = () => {
	const dispatch = useAppDispatch();
	const api = Api();
	//store filters-inputs value
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [stateInputs, setStateInputs] = useState({
		search: '',
		type: [],
	});
	console.log('stateInputs', stateInputs);
	const [currentPage, setCurrentPage] = useState<number>(1);

	// create fetch objs
	const objFetchSearch = stateInputs.search
		? {
				name: { contains: stateInputs.search },
		  }
		: null;

	const typeFilterArr =
		stateInputs.type.length > 0
			? {
					type: { in: stateInputs.type },
			  }
			: null;

	const finalAttrObj = {
		...(objFetchSearch && { ...objFetchSearch }),
		...(typeFilterArr && { ...typeFilterArr }),
	};

	//Converting the combinedJsonObj to JSON for the request.
	const finalJsonString = JSON.stringify(finalAttrObj);

	const getProjects = async (finalJsonString: string) => {
		setIsLoading(true);
		try {
			const response = await api.sellerProject.getSellerProjects({
				page: currentPage,
				limit: 12,
				searchParams: finalJsonString,
			});
			const projects = response.result;
			dispatch(setProjects(projects));
		} catch (error) {
			console.error('getProjects seller error', error);
		}
		setIsLoading(false);
	};

	useEffect(() => {
		getProjects(finalJsonString);
	}, [stateInputs, currentPage]);

	{
		return (
			<div className={s.wrapper}>
				<Filters stateInputs={stateInputs} setStateInputs={setStateInputs} />
				{isLoading ? (
					<Spinner />
				) : (
					<>
						<RequestTable />
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
