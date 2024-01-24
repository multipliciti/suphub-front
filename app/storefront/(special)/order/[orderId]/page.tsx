import { StorefrontSellerOrderItem } from '@/components/Screens/Storefront/StorefrontSellerOrderItem';

interface Props {
	params: {
		orderId: number;
	};
}

export default function StorefrontOrderItem({ params: { orderId } }: Props) {
	return <StorefrontSellerOrderItem orderId={orderId} />;
}
