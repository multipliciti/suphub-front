import { Metadata } from 'next';
import { ProductDetailComponent } from '@/components/Screens/Buyer/Projects/RFQCar/ProductDetail';

export const metadata: Metadata = {
	title: 'product detail',
	description: 'product detail',
};

const ProductDetail = () => {
	return <ProductDetailComponent />;
};

export default ProductDetail;
