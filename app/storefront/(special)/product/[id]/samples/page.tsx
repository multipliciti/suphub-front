import { StorefrontProductItemSamples } from '@/components/Screens/Storefront/StorefrontProductItem/Samples';

interface Props {
	params: {
		id: number;
	};
}

export default function StorefrontProductSamplesPage({ params }: Props) {
	return <StorefrontProductItemSamples id={params.id} />;
}
