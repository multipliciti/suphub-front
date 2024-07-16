'use client';
import { ProjectsEmptyTableMessageWrapper } from '@/components/Screens/Projects/ProjectsOverview/ProjectsEmptyTableMessage/ProjectsEmptyTableMessageWrapper';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { setModal } from '@/redux/slices/modal';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import s from './SuppliersTableEmptyMessage.module.scss';
//imgs
import inviteSuppliersIcon from '@/imgs/Buyer&Seller/Projects/invite_suppliers.svg';

export const SuppliersTableEmptyMessage = () => {
	const dispatch = useAppDispatch();
	const router = useRouter();
	const user = useAppSelector((state) => state.authSlice.user);

	const handleAddSuppliers = async () => {
		if (!user) {
			dispatch(setModal('login'));
			return;
		}
		dispatch(setModal('inviteSuppliers'));
	};

	useEffect(() => {
		if (user?.role === 'seller') router.push('/storefront/get-started');
	}, [user]);

	return (
		<ProjectsEmptyTableMessageWrapper
			title="Invite your first supplier!"
			text="Create your projects to build bill of materials, manage team tasks, and source components."
		>
			<button className={s.btn_suppliers} onClick={handleAddSuppliers}>
				<Image src={inviteSuppliersIcon} alt="Invite Suppliers icon" />
				<span className={s.btn_suppliers_text}>Add your suppliers</span>
			</button>
		</ProjectsEmptyTableMessageWrapper>
	);
};
