import { ProjectsOverview } from '@/components/Screens/Projects/ProjectsOverview';

interface Props {
	params: {
		id: number;
	};
}

export default function ProjectsOverviewPage({ params }: Props) {
	return <ProjectsOverview id={params.id} />;
}
