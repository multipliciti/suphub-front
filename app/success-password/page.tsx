import { Metadata } from 'next';
import { ResetPassword } from '@/components/screens/ResetPassword';
import { Success } from '@/components/screens/ResetPassword/Success';

export const metadata: Metadata = {
	title: 'Reset password Success',
	description: 'Reset password Success',
};

const SuccessPage = () => {
	return (
		<>
			<Success />
		</>
	);
};

export default SuccessPage;
