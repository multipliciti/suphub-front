import { StorefrontProductItemGeneral } from '@/components/Screens/Storefront/StorefrontProductItem/General';

interface Props {
	params: {
		id: number;
	};
}

export default function StorefrontProductGeneralPage({ params }: Props) {
	return <StorefrontProductItemGeneral id={params.id} />;
}
