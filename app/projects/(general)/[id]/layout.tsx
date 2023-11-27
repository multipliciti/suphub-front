import { ReactNode } from 'react';

import { ProjectsTabSwitcher } from '@/components/Screens/Projects/ProjectsLayout/ProjectsSidebarLayout/ProjectsTabSwitcher';

export default function ProjectIdLayout({ children }: { children: ReactNode }) {
	return (
		<div>
			<ProjectsTabSwitcher />

			<div style={{ padding: '24px 0 24px' }}>{children}</div>
		</div>
	);
}
