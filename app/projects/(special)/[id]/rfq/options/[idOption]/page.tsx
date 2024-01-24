import { OptionsView } from '@/components/Screens/Projects/ProjectsViewOptionItem/OptionsView';

interface Props {
	params: {
		id: number;
		idOption: number;
	};
}

export default function ProjectsOptionItem({ params: { id, idOption } }: Props) {
	return (
		<>
			<OptionsView idProject={id} idOption={idOption} />
		</>
	);
}
