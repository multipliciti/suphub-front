'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import s from '../SubscriptionStatus.module.scss';
import Image from 'next/image';
import alert_icon from '@/imgs/Buyer&Seller/SellerVerification/alert-icon.svg';

export function CancelPage() {
	const router = useRouter();
	return (
		<>
			<div className={s.message}>
				<div className={s.img_bg}>
					<Image alt={'Alert logo'} className={s.img} src={alert_icon} />
				</div>
				<h1 className={s.title}>Payment canceled</h1>
				<div className={s.desc}>
					We encountered an issue with your payment for this transaction. Please try
					again.
				</div>
				<button className={s.btn} onClick={() => router.push('/testSellerRFQ')}>
					Back to Seller Verification
				</button>
			</div>
		</>
	);
}
