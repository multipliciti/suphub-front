import React from 'react';
import { useAppSelector } from '@/redux/hooks';
import s from './SuppliersSidebar.module.scss';
import MessageSection from '@/components/Screens/Suppliers/Sidebar/Messages';
import SuppliersSidebarHeader from '@/components/Screens/Suppliers/Sidebar/Header';
import SuppliersSidebarInput from '@/components/Screens/Suppliers/Sidebar/Input';
import { classNames } from '@/utils/classNames';

function SuppliersSidebar() {
	const sidebar = useAppSelector((state) => state.suppliersSidebar.sidebar);

	return (
		<div className={classNames(s.wrapper, sidebar && s.wrapper_active)}>
			<SuppliersSidebarHeader title={'Microsoft'} />
			<div className={s.content}>
				<MessageSection />
				<SuppliersSidebarInput />
			</div>
		</div>
	);
}

export default SuppliersSidebar;
