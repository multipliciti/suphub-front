import { Metadata } from 'next';
import { ResetPassword } from '@/components/Screens/ResetPassword';
import { Success } from '@/components/Screens/ResetPassword/Success';

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
