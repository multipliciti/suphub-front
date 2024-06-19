'use client';
import { ReactNode } from 'react';
import SuppliersSidebar from '@/components/Screens/Suppliers/Sidebar';
import SuppliersHeader from '@/components/Screens/Suppliers/Header';
import s from '@/components/Screens/Suppliers/Layout/layout.module.scss';

export default function Layout({ children }: { children: ReactNode }) {
	return (
		<div className={s.container}>
			<div className={s.main}>
				<SuppliersHeader />
				{children}
			</div>
			<SuppliersSidebar />
		</div>
	);
}
