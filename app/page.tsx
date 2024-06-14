'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppSelector } from '@/redux/hooks';
import { Spinner } from '@/components/UI/Spinner';

export default function Page() {
	const router = useRouter();

	const role = useAppSelector((state) => state.authSlice.user?.role);

	useEffect(() => {
		if (role === 'buyer') {
			router.push('/projects');
		} else if (role === 'seller') {
			router.push('/storefront/products');
		} else {
			router.push('/marketplace');
		}
	}, [role]);

	return <Spinner style={{ paddingTop: '32px' }} />;
}
