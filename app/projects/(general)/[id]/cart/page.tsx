import { ProjectsCart } from '@/components/Screens/Projects/ProjectsCart';

interface Props {
	params: {
		id: number;
	};
}

export default function ProjectsCartPage({ params }: Props) {
	return <ProjectsCart id={params.id} />;
}
