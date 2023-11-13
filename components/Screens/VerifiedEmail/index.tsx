'use client';
import { useSearchParams } from 'next/navigation';
import s from './VerifiedEmail.module.scss';
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

	useEffect(() => {
		const requestData = {
			id: Number(id),
			token,
		};

		const fetchData = async (data: confirmEmailType) => {
			try {
				const valid = data.id !== null && data.token !== null;
				if (valid) {
					const response = await api.auth.confirmEmail(requestData);
					if (response.message === 'Email confirmed') {
						setStatus('success');
					}
				} else {
				}
			} catch (error: any) {
				setStatus('error');
			}
		};

		fetchData(requestData);
	}, [id, token]);

	return (
		<div>
			{status === 'padding' && <span>loading...</span>}
			{status === 'error' && <span>error</span>}
			{status === 'success' && (
				<Success
					title={'Email confirmed'}
					subtitle="Your email has been confirmed successfully."
				/>
			)}
		</div>
	);
};
