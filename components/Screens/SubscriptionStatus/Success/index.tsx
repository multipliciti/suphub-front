'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import s from '../SubscriptionStatus.module.scss';
import Image from 'next/image';
import checkmark from '@/imgs/ProfileSettings/password_changed_checkmark.svg';

function SuccessPage() {
	const router = useRouter();
	return (
		<div className={s.message}>
			<Image className={s.img_success} src={checkmark} alt="checkmark" />
			<h1 className={s.title}>Payment Successful</h1>
			<div className={s.desc}>
				Your payment has been successfully processed. Thank you for your purchase!
			</div>
			<button className={s.btn} onClick={() => router.push('/testSellerRFQ')}>
				Back to Seller Verification
			</button>
		</div>
	);
}

export default SuccessPage;
