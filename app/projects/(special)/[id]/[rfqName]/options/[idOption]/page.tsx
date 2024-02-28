import { OptionsView } from '@/components/Screens/Projects/ProjectsViewOptionItem/OptionsView';

interface Props {
	params: {
		id: number;
		idOption: number;
		rfqName: string;
	};
}

export default function ProjectsOptionItem({
	params: { rfqName, id, idOption },
}: Props) {
	return (
		<>
			<OptionsView rfqName={rfqName} idProject={id} idOption={idOption} />
		</>
	);
}
