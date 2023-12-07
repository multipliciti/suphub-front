'use client';
import { FC } from 'react';

import { ProjectsOverviewTable } from '@/components/Screens/Projects/ProjectsOverview/ProjectsOverviewTable';
import { useAppSelector } from '@/redux/hooks';

interface Props {
	id: number;
}

export const ProjectsOverview: FC<Props> = () => {
	const status = useAppSelector((state) => state.projectItemSlice.status);

	if (status === 'idle' || status === 'loading') {
		return <div>Loading...</div>;
	}

	if (status === 'rejected') {
		return <div>Something went wrong</div>;
	}

	return <ProjectsOverviewTable />;
};
