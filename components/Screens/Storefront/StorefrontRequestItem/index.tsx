'use client';
import { useState } from 'react';
import { useEffect } from 'react';

import s from './StorefrontRequestItem.module.scss';
import { Api } from '@/services';
import { QuoteDetailComponent } from './QuoteDetailComponent';
import { InvoiceChatComponent } from './InvoiceChatComponent';
import { Spinner } from '@/components/UI/Spinner';
import { findProjectById } from './utils';

type TypeProps = {
	id: number;
};

export const RequestItem = ({ id }: TypeProps) => {
	const api = Api();
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [activeProject, setActiveProject] = useState<any>();

	//get all projects
	const getProjects = async () => {
		try {
			const response = await api.sellerProject.getSellerProjects({
				page: 1,
				limit: 12000000000000,
				searchParams: '',
			});
			const projects = response.result;
			//filter active project
			const item = projects ? findProjectById(projects, id) : null;
			//set active projects
			setActiveProject(item);
			setIsLoading(false);
		} catch (error) {
			console.error('getProjects seller error', error);
		}
	};

	useEffect(() => {
		getProjects();
	}, []);

	return (
		<div className={s.wrapper}>
			{isLoading ? (
				<div className={s.spinner_wrapper}>
					<Spinner className={s.spinner} />
				</div>
			) : (
				<>
					<QuoteDetailComponent item={activeProject} />
					<InvoiceChatComponent />
				</>
			)}
		</div>
	);
};
