import { ProjectsOrders } from '@/components/Screens/Projects/ProjectsOrders';

interface Props {
	params: {
		id: number;
	};
}

export default function ProjectsOrdersPage({ params: { id } }: Props) {
	return <ProjectsOrders projectId={id} />;
}
