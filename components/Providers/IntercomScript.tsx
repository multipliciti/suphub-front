'use client';
import { useAppSelector } from '@/redux/hooks';
import { useEffect } from 'react';
import { initializeIntercomScript } from '@/utils/initializeIntercomScript';

export const IntercomScript = () => {
	const user = useAppSelector((state) => state.authSlice.user);

	useEffect(() => {
		if (user) initializeIntercomScript(user);
	}, [user]);

	return null;
};
