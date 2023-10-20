'use client';
import React, {useEffect} from 'react';
import CompanyInfo from '@/components/Screens/ProfileSettings/CompanyInfo';
import { useAppSelector } from '@/redux/hooks';
import {useRouter} from 'next/navigation'

function Page() {
	const role = useAppSelector((state) => state.authSlice.user?.role);
	const router = useRouter();

	useEffect(() => {
		if(role ==='buyer') {
			router.push('/settings/personal-info');
		}
	}, [])

	return (
		<>
			{role === 'seller' && <CompanyInfo />}
		</>
	);
}

export default Page;
