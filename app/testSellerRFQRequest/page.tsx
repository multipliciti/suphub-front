import { Request } from '@/components/Screens/Seller/QuoteDetail';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'RequestRFQPage',
	description: 'RequestRFQPage',
};

const RequestRFQPage = () => {
	return (
		<>
			<Request />
		</>
	);
};

export default RequestRFQPage;
