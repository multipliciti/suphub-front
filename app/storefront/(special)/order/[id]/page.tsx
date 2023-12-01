import { SellerOrder } from '@/components/Screens/Storefront/StorefrontOrders/SellerOrder';

interface Props {
	params: {
		id: number;
	};
}

export default function StorefrontOrderItem({ params: { id } }: Props) {
	return <SellerOrder id={3} />;
}
