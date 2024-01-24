import { ProjectsRFQCart } from '@/components/Screens/Projects/ProjectsRFQCart';

interface Props {
	params: {
		id: number;
	};
}

export default function ProjectsRfqPage({ params: { id } }: Props) {
	return <ProjectsRFQCart projectId={id} />;
}
