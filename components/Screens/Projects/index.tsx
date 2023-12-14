'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ProjectsEmptyTableMessage } from '@/components/Screens/Projects/ProjectsOverview/ProjectsEmptyTableMessage';
import { useAppSelector } from '@/redux/hooks';
import { Spinner } from '@/components/UI/Spinner';

export const Projects = () => {
	const router = useRouter();

	const projectList = useAppSelector((state) => state.projectsSlice.result);
	const project = useAppSelector((state) => state.projectItemSlice.project);
	const status = useAppSelector((state) => state.projectsSlice.status);

	useEffect(() => {
		if (project && status === 'success') {
			router.push(`/projects/${project.id}/overview`);
		}
	}, [project]);

	if (status === 'success' && projectList.length === 0) {
		return <ProjectsEmptyTableMessage />;
	}
	if (status === 'rejected') {
		return <div>Something went wrong</div>;
	}
	return <Spinner />;
};
