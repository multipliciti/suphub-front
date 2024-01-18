'use client';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';

import { FetchStatus } from '@/types/fetch-status';
import { Spinner } from '@/components/UI/Spinner';
import { ROUTES } from '@/services/routes';
import { Api } from '@/services';

import s from './new-account-application.module.scss';

import check_success from '@/imgs/Modal/CreateBusinessAccount/check_success.svg';
import check_incorrect from '@/imgs/Modal/incorrect.svg';

type ActionParam = 'approve' | 'decline';
type CompanyTypeParam = 'seller' | 'buyer';

export const AdminNewAccountApplicationMailHandler = () => {
	const api = Api();

	const searchParams = useSearchParams();

	const type = (searchParams.get('action') as ActionParam) || '';
	const companyType = (searchParams.get('companyType') as CompanyTypeParam) || '';
	const companyId = searchParams.get('companyId') || '';
	const adminId = searchParams.get('adminId') || '';

	const [status, setStatus] = useState<FetchStatus>('loading');

	useEffect(() => {
		if (
			!type ||
			!['approve', 'decline'].includes(type) ||
			!companyType ||
			!['seller', 'buyer'].includes(companyType) ||
			!companyId ||
			!adminId
		) {
			setStatus('error');
			return;
		}

		void handleAction();
	}, []);

	const handleAction = async () => {
		try {
			if (companyType === 'seller' && type === 'approve') {
				await handleSellerApprove();
			}
			if (companyType === 'seller' && type === 'decline') {
				await handleSellerDecline();
			}
			if (companyType === 'buyer' && type === 'approve') {
				await handleBuyerApprove();
			}
			if (companyType === 'buyer' && type === 'decline') {
				await handleBuyerDecline();
			}

			setStatus('success');
		} catch (e) {
			setStatus('error');
		}
	};

	const handleSellerApprove = async () => {
		await api.sellerCompany.adminApprove({
			id: Number(companyId),
			params: {
				adminId,
				url: ROUTES.confirmEmail,
			},
		});
	};

	const handleSellerDecline = async () => {
		await api.sellerCompany.adminDecline({
			id: Number(companyId),
			params: {
				adminId,
				url: ROUTES.index,
			},
		});
	};

	const handleBuyerApprove = async () => {
		await api.buyerCompany.adminApprove({
			id: Number(companyId),
			params: {
				adminId,
				url: ROUTES.confirmEmail,
			},
		});
	};

	const handleBuyerDecline = async () => {
		await api.buyerCompany.adminDecline({
			id: Number(companyId),
			params: {
				adminId,
				url: ROUTES.index,
			},
		});
	};

	return (
		<div className={s.wrapper}>
			{status === 'loading' && <Spinner />}
			{status === 'success' && (
				<>
					<Image src={check_success} alt="success_icon" width={40} height={40} />
					<p>Action successfully completed</p>
				</>
			)}
			{status === 'error' && (
				<>
					<Image src={check_incorrect} alt="incorrect_icon" width={40} height={40} />
					<p>An error has occurred with the action</p>
				</>
			)}
		</div>
	);
};
