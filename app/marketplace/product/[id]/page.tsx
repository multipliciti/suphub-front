import { ProductPageComponent } from '@/components/screens/ProductPage';

type PropsType = {
	params: {
		id: string;
	};
};

export default function ProductPage({ params: { id } }: PropsType) {
	return (
		<div>
			<ProductPageComponent  backLink={'/marketplace'} id={Number(id) } />
		</div>
	);
}
