import { ProductPageComponent } from '@/components/Screens/ProductPage';

type PropsType = {
	params: {
		id: string;
	};
};

export default function ProductPage({ params: { id } }: PropsType) {
	return (
		<div>
			<ProductPageComponent id={Number(id)} />
		</div>
	);
}
