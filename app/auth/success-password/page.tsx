import { Metadata } from 'next';
import { Success } from '@/components/Screens/ResetPassword/Success';

export const metadata: Metadata = {
	title: 'Reset password PasswordChanged',
	description: 'Reset password PasswordChanged',
};

const SuccessPage = () => {
	return (
		<>
			<Success
				title="Password changed"
				subtitle="Your password has been changed successfully."
			/>
		</>
	);
};

export default SuccessPage;
