'use client';
import { ResetForm } from './ResetForm';
import { Success } from './Success';
import s from './ResetPasswors.module.scss';
import { classNames } from '@/utils/classNames';
import { useAppSelector } from '@/redux/hooks';

export const ResetPassword = () => {
	const modal = useAppSelector((state) => state.modalSlice.modal);

	return (
		<>
			<div
				className={classNames(
					s.wrapper,
					modal !== 'reset sucsess' && s.wrapper_active,
					modal === 'reset sucsess' && s.reset_form
				)}
			>
				<ResetForm />
			</div>
			<div
				className={classNames(
					s.wrapper,
					modal === 'reset sucsess' && s.wrapper_active
				)}
			>
				<Success />
			</div>
		</>
	);
};
