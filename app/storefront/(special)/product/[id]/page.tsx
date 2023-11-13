import { redirect } from 'next/navigation';

interface Props {
	params: {
		id: number;
	};
}

export default function StorefrontPageItem({ params: { id } }: Props) {
	return redirect(`/storefront/product/${id}/general`);
}
