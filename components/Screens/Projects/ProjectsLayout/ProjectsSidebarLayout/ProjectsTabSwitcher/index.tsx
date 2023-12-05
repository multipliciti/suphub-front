'use client';
import { FC, useEffect } from 'react';

import { setStatus as setProjectListStatus } from '@/redux/slices/projects/projects';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { TabSwitcher, TabSwitcherItem } from '@/components/UI/TabSwitcher';
import { setProject, setStatus } from '@/redux/slices/projects/projectItem';
import { Api } from '@/services';

const getTabList = (id: number): TabSwitcherItem[] => {
	return [
		{
			href: `/projects/${id}/overview`,
			title: 'Overview',
		},
		{
			href: `/projects/${id}/rfq`,
			title: 'RFQ Cart',
		},
		{
			href: `/projects/${id}/cart`,
			title: 'Cart',
		},
		{
			href: `/projects/${id}/orders`,
			title: 'Orders',
		},
	];
};

interface Props {
	id: number;
}

export const ProjectsTabSwitcher: FC<Props> = ({ id }) => {
	const api = Api();
	const dispatch = useAppDispatch();

	const project = useAppSelector((state) => state.projectItemSlice.project);

	useEffect(() => {
		fetchProjectById();
	}, []);

	const fetchProjectById = async () => {
		try {
			dispatch(setStatus('loading'));

			const response = await api.project.getProjectById(id);
			dispatch(setProject(response));

			dispatch(setStatus('success'));
		} catch (e) {
			dispatch(setStatus('rejected'));
			dispatch(setProjectListStatus('refetch'));
		}
	};

	if (!project) {
		return;
	}

	return <TabSwitcher tabs={getTabList(project.id)} />;
};
