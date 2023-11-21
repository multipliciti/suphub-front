import { ReactNode } from 'react';

import { ProjectsSidebarLayout } from '@/components/Screens/Projects/ProjectsLayout/ProjectsSidebarLayout';

export default function ProjectsLayout({ children }: { children: ReactNode }) {
	return <ProjectsSidebarLayout>{children}</ProjectsSidebarLayout>;
}
