'use client';
import s from './Requests.module.scss';
import { Filters } from './Filters';
import { RequestTable } from './RequestTable';
import { PaginationWrapper } from './PaginationWrapper';
import { useState, useEffect } from 'react';
import { Api } from '@/services';
import { setProjects } from '@/redux/slices/storefront/storefrontProjectsSeller';
import { useAppDispatch } from '@/redux/hooks';
export const StorefrontRequests = () => {
	const dispatch = useAppDispatch();
	const api = Api();
	//store filters-inputs value
	const [stateInputs, setStateInputs] = useState({
		search: '',
		manufacturer: [],
		status: [],
		orderType: [],
	});

	const [currentPage, setCurrentPage] = useState<number>(1);
	const getProjects = async () => {
		try {
			const response = await api.sellerProject.getSellerProjects({
				page: currentPage,
				limit: 12,
				searchParams: JSON.stringify({}),
			});
			const projects = response.result;
			dispatch(setProjects(projects));
		} catch (error) {
			console.error('getProjects seller error', error);
		}
	};

	useEffect(() => {
		getProjects();
	}, []);

	{
		return (
			<div className={s.wrapper}>
				<Filters stateInputs={stateInputs} setStateInputs={setStateInputs} />
				<RequestTable />
				<PaginationWrapper
					currentPage={currentPage}
					setActivePage={setCurrentPage}
					totalPages={20}
				/>
			</div>
		);
	}
};
