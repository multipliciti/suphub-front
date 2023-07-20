import { Metadata } from 'next';
import { ResetPassword } from '@/components/screens/ResetPassword';

export const metadata: Metadata = {
	title: 'Reset password',
	description: 'Reset password ',
};

const ResetPasswordPage = () => {
	return (
		<>
			<ResetPassword />
		</>
	);
};

export default ResetPasswordPage;
