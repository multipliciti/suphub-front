'use client';
import { useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';

import { ProjectsEmptyTableMessage } from '@/components/Screens/Projects/ProjectsOverview/ProjectsEmptyTableMessage';
import { useAppSelector } from '@/redux/hooks';
import { Spinner } from '@/components/UI/Spinner';

export const Projects = () => {
	const router = useRouter();
	const { projectList, project, status, user } = useAppSelector((state) => ({
		projectList: state.projectsSlice.result,
		project: state.projectItemSlice.project,
		status: state.projectsSlice.status,
		user: state.authSlice.user,
	}));

	const userStatus = useMemo(
		() => ({
			hasProjects: project && status === 'success',
			noProjects: status === 'success' && projectList.length === 0,
			justLoggedInBuyer: status === 'rejected' && user?.role === 'buyer',
			justLoggedInSeller: status === 'rejected' && user?.role === 'seller',
			loggedOut: status === 'rejected' && !user,
			rejected: status === 'rejected',
		}),
		[project, status, projectList, user]
	);

	useEffect(() => {
		if (userStatus.justLoggedInBuyer) window.location.reload();
		else if (userStatus.justLoggedInSeller) router.push('storefront/products');
	}, [user]);

	useEffect(() => {
		if (userStatus.hasProjects) {
			router.push(`/projects/${project?.id}/overview`);
		}
	}, [project]);

	if (userStatus.noProjects || userStatus.loggedOut) {
		return <ProjectsEmptyTableMessage />;
	}

	if (userStatus.rejected) {
		return <div>Something went wrong</div>;
	}

	return <Spinner style={{ marginTop: '15%' }} />;
};
