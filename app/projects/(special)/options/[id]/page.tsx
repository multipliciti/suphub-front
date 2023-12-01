import { OptionsView } from '@/components/Screens/Projects/ProjectsViewOptionItem/OptionsView';

interface Props {
	params: {
		id: number;
	};
}

export default function ProjectsOptionItem({ params: { id } }: Props) {
	return (
		<>
			<OptionsView id={id} />
		</>
	);
}
