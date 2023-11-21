'use client';
import { FC, PropsWithChildren } from 'react';

import { ProjectsSidebar } from './ProjectsSidebar';
import { ProjectsHeader } from './ProjectsHeader';
import { useAppSelector } from '@/redux/hooks';
import { classNames } from '@/utils/classNames';

export const ProjectsSidebarLayout: FC<PropsWithChildren> = ({ children }) => {
	const isSidebar = useAppSelector((state) => state.projectsSidebar.sidebar);

	return (
		<>
			<ProjectsSidebar />
			<div
				className={classNames(
					'content_container',
					isSidebar && 'content_container_sidebar'
				)}
			>
				<ProjectsHeader />

				{children}
			</div>
		</>
	);
};
