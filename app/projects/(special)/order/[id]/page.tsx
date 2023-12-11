import { ProjectsBuyerOrderItem } from '@/components/Screens/Projects/ProjectsBuyerOrderItem';

interface Props {
	params: {
		id: number;
	};
}
export default function ProjectsOrderItem({ params: { id } }: Props) {
	return <ProjectsBuyerOrderItem id={id} />;
}
