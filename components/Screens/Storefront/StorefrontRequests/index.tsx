'use client';
import s from './StorefrontRequests.module.scss';
import { Filters } from './Filters';
import { RequestTable } from './RequestTable';
import { PaginationWrapper } from './PaginationWrapper';
import { useState, useEffect } from 'react';
import { Api } from '@/services';
import { Spinner } from '@/components/UI/Spinner';

export const StorefrontRequests = () => {
	const api = Api();
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [projects, setProjects] = useState<any[] | null>(null);
	//store filters-inputs value
	const [stateInputs, setStateInputs] = useState({
		search: '',
		type: [],
	});

	const [totalItems, setTotalItems] = useState<number>(0);
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [totalPages, setTotalPages] = useState<number>(0);
	const limitItems = 12;

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
		try {
			const response = await api.sellerProject.getSellerProjects({
				page: currentPage,
				limit: limitItems,
				searchParams: finalJsonString,
			});
			const projects = response.result;

			setProjects(projects || null);
			setTotalItems(response.total);
			setTotalPages(response.totalPages);
			setIsLoading(false);
		} catch (error) {
			console.error('getProjects seller error', error);
		}
	};

	useEffect(() => {
		getProjects(finalJsonString);
	}, [stateInputs, currentPage]);

	{
		return (
			<div className={s.wrapper}>
				<Filters stateInputs={stateInputs} setStateInputs={setStateInputs} />
				{isLoading ? (
					<Spinner className={s.spinner} />
				) : (
					<>
						<RequestTable data={projects} />
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
