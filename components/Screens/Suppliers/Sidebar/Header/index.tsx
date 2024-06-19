import React from 'react';
import { useAppDispatch } from '@/redux/hooks';
import { setSidebar } from '@/redux/slices/suppliers/suppliersSidebar';
import Image from 'next/image';

//img
import big_cross from '@/imgs/ProfileSettings/big_cross.svg';
import s from './SuppliersSidebarHeader.module.scss';

interface HeaderProps {
	title: string;
}

function SuppliersSidebarHeader({ title }: HeaderProps) {
	const dispatch = useAppDispatch();

	const handleCloseSidebar = () => {
		dispatch(setSidebar(false));
	};

	return (
		<div className={s.header}>
			<div className={s.header_title}>{title}</div>
			<Image
				src={big_cross}
				alt={'big_cross'}
				className={s.header_icon}
				onClick={handleCloseSidebar}
			/>
		</div>
	);
}

export default SuppliersSidebarHeader;
