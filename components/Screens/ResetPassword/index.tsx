'use client';
import { ResetForm } from './ResetForm';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import { Success } from './Success';
import s from './ResetPasswors.module.scss';
import { classNames } from '@/utils/classNames';
import { useAppSelector } from '@/redux/hooks';

interface PropsType {
	token: string;
}

export const ResetPassword = ({ token }: PropsType) => {
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
				<ResetForm token={token} />
			</div>
		</>
	);
};
