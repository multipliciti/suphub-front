'use client';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
const Page = () => {
	const router = useRouter();

	useEffect(() => {
		router.push('/settings/personal-info');
	}, []);

	return <p>...Loading</p>;
};
export default Page;
