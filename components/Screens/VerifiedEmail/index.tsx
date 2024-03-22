'use client';
import { useSearchParams } from 'next/navigation';
import s from './VerifiedEmail.module.scss';
import { Spinner } from '@/components/UI/Spinner';
import { Api } from '@/services';
import { Success } from '../ResetPassword/Success';
import { useEffect, useState } from 'react';
import { confirmEmailType } from '@/types/services/auth';

export const VerifiedEmail = () => {
	const [status, setStatus] = useState<'padding' | 'success' | 'error'>('padding');
	const api = Api();
	const searchParams = useSearchParams();
	const id = searchParams.get('id') || null;
	const token = searchParams.get('token') || null;

	const fetchData = async (data: confirmEmailType) => {
		try {
			const valid = data.id !== null && data.token !== null;
			if (valid) {
				const response = await api.auth.confirmEmail(data);
				if (response.message === 'Email confirmed') {
					setStatus('success');
				}
			} else {
			}
		} catch (error: any) {
			console.error('error');
			setStatus('error');
		}
	};

	useEffect(() => {
		fetchData({ id: Number(id), token });
	}, [id, token]);

	return (
		<div>
			{status === 'padding' && (
				<div className={s.status_wrapper}>
					<Spinner />
				</div>
			)}

			{status === 'error' && (
				<div className={s.status_wrapper}>
					<span className={s.error}>error</span>
				</div>
			)}

			{status === 'success' && (
				<Success
					title={'Email confirmed'}
					subtitle="Your email has been confirmed successfully."
				/>
			)}
		</div>
	);
};
