import { StorefrontSellerOrderItem } from '@/components/Screens/Storefront/StorefrontSellerOrderItem';

interface Props {
	params: {
		id: number;
	};
}

export default function StorefrontOrderItem({ params: { id } }: Props) {
	return <StorefrontSellerOrderItem id={id} />;
}
