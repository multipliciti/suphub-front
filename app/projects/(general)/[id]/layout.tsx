import { ReactNode } from 'react';

import { ProjectsTabSwitcher } from '@/components/Screens/Projects/ProjectsLayout/ProjectsSidebarLayout/ProjectsTabSwitcher';

export default function ProjectIdLayout({
	children,
	params,
}: {
	children: ReactNode;
	params: { id: number };
}) {
	return (
		<div>
			<ProjectsTabSwitcher id={params.id} />

			<div style={{ paddingTop: '24px' }}>{children}</div>
		</div>
	);
}
