import { RequestItem } from '@/components/Screens/Storefront/StorefrontRequestItem';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'RequestRFQPage',
	description: 'RequestRFQPage',
};

type PropsType = {
	params: {
		id: string;
	};
};
export default function ProductPage({ params: { id } }: PropsType) {
	return (
		<div>
			<RequestItem id={Number(id)} />
		</div>
	);
}
