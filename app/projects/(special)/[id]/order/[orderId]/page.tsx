import { ProjectsBuyerOrderItem } from '@/components/Screens/Projects/ProjectsBuyerOrderItem';

interface Props {
	params: {
		orderId: number;
		id: number;
	};
}
export default function ProjectsOrderItem({ params: { orderId, id } }: Props) {
	return <ProjectsBuyerOrderItem orderId={orderId} projectId={id} />;
}
