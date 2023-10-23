'use client';
import React, { useEffect } from 'react';
import BankingInfo from '@/components/Screens/ProfileSettings/BankingInfo';
import { useAppSelector } from '@/redux/hooks';
import { useRouter } from 'next/navigation';

function Page() {
	const role = useAppSelector((state) => state.authSlice.user?.role);
	const router = useRouter();

	useEffect(() => {
		if (role === 'buyer') {
			router.push('/settings/personal-info');
		}
	}, []);

	return <>{role === 'seller' && <BankingInfo />}</>;
}

export default Page;
