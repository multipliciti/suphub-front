'use client';
import { TabSwitcher, TabSwitcherItem } from '@/components/UI/TabSwitcher';
import { useAppSelector } from '@/redux/hooks';

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
			href: `/projects/${id}/orders`,
			title: 'Orders',
		},
	];
};

export const ProjectsTabSwitcher = () => {
	const project = useAppSelector((state) => state.projectItemSlice.project);

	if (!project) {
		return;
	}

	return <TabSwitcher tabs={getTabList(project.id)} />;
};
