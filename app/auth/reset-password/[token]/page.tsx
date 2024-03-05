import { Metadata } from 'next';
import { ResetPassword } from '@/components/Screens/ResetPassword';

export const metadata: Metadata = {
	title: 'Reset password',
	description: 'Reset password ',
};

type PropsType = {
	params: {
		token: string;
	};
};

const ResetPasswordPage = ({ params: { token } }: PropsType) => {
	return (
		<>
			<ResetPassword token={token} />
		</>
	);
};

export default ResetPasswordPage;
