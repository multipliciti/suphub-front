'use client';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppSelector } from '@/redux/hooks';
const MyComponent = () => {
	const router = useRouter();
	const user = useAppSelector((state) => state.authSlice.user);

	useEffect(() => {
		router.push('/settings/personal-info');
	}, []);

	return <p>...Loading</p>;
};
export default MyComponent;
