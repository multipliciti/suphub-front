import { Metadata } from 'next';
import { ResetPassword } from '@/components/Screens/ResetPassword';

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
