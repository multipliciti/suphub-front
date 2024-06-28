'use client';
import { ReactNode } from 'react';
import SuppliersSidebar from '@/components/Screens/Suppliers/Sidebar';
import { useAppSelector } from '@/redux/hooks';
import { classNames } from '@/utils/classNames';
import s from '@/components/Screens/Suppliers/Layout/layout.module.scss';

export default function Layout({ children }: { children: ReactNode }) {
	const isSidebarActive = useAppSelector(
		(state: any) => state.suppliersSidebar.sidebar
	);

	return (
		<div className={s.container}>
			<div className={classNames(s.main, isSidebarActive && s.main_active)}>
				{children}
			</div>
			<SuppliersSidebar />
		</div>
	);
}
