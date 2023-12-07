import { ProjectsBuyerOrderItem } from '@/components/Screens/Projects/ProjectsBuyerOrderItem';

<<<<<<< HEAD
export default function ProjectsOrderItem() {
	return <ProjectsBuyerOrderItem id={3} />;
=======
interface Props {
	params: {
		id: number;
	};
}
export default function ProjectsOrderItem({ params: { id } }: Props) {
	return <ProjectsBuyerOrderItem id={id} />;
>>>>>>> 25fdac4f17cfa965a4e7a9cc5b430a29ef1ecace
}
