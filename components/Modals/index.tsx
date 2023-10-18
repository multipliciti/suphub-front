'use client';
import s from './Modals.module.scss';
import { useAppSelector } from '@/redux/hooks';
import { Login } from './Login';
import { ForgotPassword } from './ForgotPassword';
import { CheckEmail } from './ CheckEmail';
import { Registration } from './Registration';
import { classNames } from '@/utils/classNames';
import { VerifyEmail } from './VerifyEmail';
import { AddToRFQCart } from '@/components/Modals/AddToRFQCart';
import { EditPassword } from '@/components/Modals/EditPassword';
import { PasswordChanged } from '@/components/Modals/EditPassword/PasswordChanged';
import { SubmitForReview } from '@/components/Modals/SubmitForReview';
import { ShowPhoto } from './ShowPhoto';
import { CreateBusinessAccount } from '@/components/Modals/CreateBusinessAccount';

export const Modal = () => {
	const modal = useAppSelector((state) => state.modalSlice.modal);

	return (
		<>
			<div className={classNames(s.wrapper, modal === 'login' && s.wrapper_active)}>
				{modal === 'login' && <Login />}
			</div>

			<div
				className={classNames(
					s.wrapper,
					modal === 'forgotPassword' && s.wrapper_active
				)}
			>
				{modal === 'forgotPassword' && <ForgotPassword />}
			</div>

			<div
				className={classNames(s.wrapper, modal === 'checkEmail' && s.wrapper_active)}
			>
				{modal === 'checkEmail' && <CheckEmail />}
			</div>

			<div
				className={classNames(
					s.wrapper,
					modal === 'registration' && s.wrapper_active
				)}
			>
				<div className={s.modal}>{modal === 'registration' && <Registration />}</div>
			</div>

			<div
				className={classNames(
					s.wrapper,
					modal === 'verifyEmail' && s.wrapper_active
				)}
			>
				{modal === 'verifyEmail' && <VerifyEmail />}
			</div>

			<div
				className={classNames(
					s.wrapper,
					modal === 'addToRFQCart' && s.wrapper_active
				)}
			>
				<AddToRFQCart />
			</div>
			<div
				className={classNames(
					s.wrapper,
					modal === 'editPassword' && s.wrapper_active
				)}
			>
				<EditPassword />
				{modal === 'addToRFQCart' && <AddToRFQCart />}
			</div>

			<div
				className={classNames(s.wrapper, modal === 'showPhoto' && s.wrapper_active)}
			>
				{modal === 'showPhoto' && <ShowPhoto />}
			</div>

			<div
				className={classNames(
					s.wrapper,
					modal === 'passwordChanged' && s.wrapper_active
				)}
			>
				{modal === 'passwordChanged' && <PasswordChanged />}
			</div>

			<div
				className={classNames(
					s.wrapper,
					modal === 'submitForReview' && s.wrapper_active
				)}
			>
				{modal === 'submitForReview' && <SubmitForReview />}
			</div>

			<div
				className={classNames(
					s.wrapper,
					modal === 'createBusinessAccount' && s.wrapper_active
				)}
			>
				{modal === 'createBusinessAccount' && <CreateBusinessAccount />}
			</div>
		</>
	);
};
