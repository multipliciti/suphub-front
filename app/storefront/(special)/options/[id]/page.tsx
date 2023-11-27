import { OptionsView } from '@/components/Screens/Buyer/Projects/OptionsView/OptionsView';
interface Props {
	params: {
		id: number;
	};
}

export default function OptionsPage({ params: { id } }: Props) {
	return (
		<>
			<OptionsView id={id} />
		</>
	);
}
