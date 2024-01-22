import { StorefrontProductItemFiles } from '@/components/Screens/Storefront/StorefrontProductItem/Files';

interface Props {
	params: {
		id: number;
	};
}

export default function StorefrontProductFilesPage({ params }: Props) {
	return <StorefrontProductItemFiles id={params.id} />;
}
