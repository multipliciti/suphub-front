'use client';
import s from './Modals.module.scss';
import { useAppSelector } from '@/redux/hooks';
import { Login } from './Login';
import { ForgotPassword } from './ForgotPassword';
import { CheckEmail } from './ CheckEmail/CheckEmail';
export const Modal = () => {
	const modal = useAppSelector((state) => state.modalSlice.modal);
	return (
		<>
			{modal === 'login' && (
				<div className={s.wrapper}>
					<Login />
				</div>
			)}

			{modal === 'ForgotPassword' && (
				<div className={s.wrapper}>
					<ForgotPassword />
				</div>
			)}

			{modal === 'checkEmail' && (
				<div className={s.wrapper}>
					<CheckEmail />
				</div>
			)}
		</>
	);
};
