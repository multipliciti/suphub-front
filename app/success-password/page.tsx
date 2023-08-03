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
			<Success
				title="Password changed"
				subtitle="Your password has been changed successfully."
			/>
		</>
	);
};

export default SuccessPage;
