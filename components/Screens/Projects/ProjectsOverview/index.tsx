'use client';
import { FC, useEffect } from 'react';

import { setStatus as setProjectListStatus } from '@/redux/slices/projects/projects';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { ProjectsOverviewTable } from '@/components/Screens/Projects/ProjectsOverview/ProjectsOverviewTable';
import { setProject, setStatus } from '@/redux/slices/projects/projectItem';
import { Api } from '@/services';

interface Props {
	id: number;
}

export const ProjectsOverview: FC<Props> = ({ id }) => {
	const api = Api();
	const dispatch = useAppDispatch();

	const status = useAppSelector((state) => state.projectItemSlice.status);

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
			dispatch(setProjectListStatus('refetch'));
		}
	};

	if (status === 'idle' || status === 'loading') {
		return <div>Loading...</div>;
	}

	if (status === 'rejected') {
		return <div>Something went wrong</div>;
	}

	return <ProjectsOverviewTable />;
};
