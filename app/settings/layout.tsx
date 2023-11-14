'use client';
import type { Metadata } from 'next';
import SettingsSidebar from '@/components/Screens/ProfileSettings/Sidebar';
import s from '@/components/Screens/ProfileSettings/SettingsLayout.module.scss';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppSelector } from '@/redux/hooks';
import { Api } from '@/services';
import { useAppDispatch } from '@/redux/hooks';

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
	const router: any = useRouter();
	const dispatch = useAppDispatch();
	const previousUrl = router.query;
	const user = useAppSelector((state) => state.authSlice.user);
	const statusGetUser = useAppSelector((state) => state.authSlice.statusGetUser);

	const settingsUrls = [
		'/settings/personal-info',
		'/settings/company-info',
		'/settings/banking-info',
	];
	const api = Api();

	useEffect(() => {
		const fetch = async () => {
			if (statusGetUser === 'logouted' || statusGetUser === 'rejected') {
				router.push('/');
			}
		};
		fetch();
	}, [statusGetUser]);

	return (
		user !== null &&
		typeof user === 'object' && (
			<div className={s.settings_main}>
				<SettingsSidebar />
				<div className={s.settings_children}>
					<>{children}</>
				</div>
			</div>
		)
	);
}
