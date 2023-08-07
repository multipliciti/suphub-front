'use client';
import s from './Modals.module.scss';
import { useAppSelector } from '@/redux/hooks';
import { Login } from './Login';
import { ForgotPassword } from './ForgotPassword';
import { CheckEmail } from './ CheckEmail';
import { Registration } from './Registration';
import { classNames } from '@/utils/classNames';
import { VerifyEmail } from './VerifyEmail';

export const Modal = () => {
	const modal = useAppSelector((state) => state.modalSlice.modal);
	return (
		<>
			<div className={classNames(s.wrapper, modal === 'login' && s.wrapper_active)}>
				<Login />
			</div>

			<div
				className={classNames(
					s.wrapper,
					modal === 'forgotPassword' && s.wrapper_active
				)}
			>
				<ForgotPassword />
			</div>

			<div
				className={classNames(s.wrapper, modal === 'checkEmail' && s.wrapper_active)}
			>
				<CheckEmail />
			</div>

			<div
				className={classNames(
					s.wrapper,
					modal === 'registration' && s.wrapper_active
				)}
			>
				<div className={s.modal}>
					<Registration />
				</div>
			</div>

			<div
				className={classNames(
					s.wrapper,
					modal === 'verifyEmail' && s.wrapper_active
				)}
			>
				<VerifyEmail />
			</div>
		</>
	);
};
