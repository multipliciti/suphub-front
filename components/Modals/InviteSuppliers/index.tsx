'use client';
import { useAppDispatch } from '@/redux/hooks';
import { setModal } from '@/redux/slices/modal';
import { useEffect } from 'react';
import Image from 'next/image';
import modal_close from '@/imgs/close.svg';
import s from './InviteSuppliers.module.scss';
import { InviteSuppliersSection } from './InviteSection';

export const InviteSuppliers = () => {
	const dispatch = useAppDispatch();

	const closeModal = () => {
		dispatch(setModal(''));
	};

	useEffect(() => {
		const handlePopState = () => {
			closeModal();
		};

		window.addEventListener('popstate', handlePopState);

		return () => {
			window.removeEventListener('popstate', handlePopState);
		};
	}, []);

	return (
		<div className={s.wrapper}>
			<div className={s.header}>
				<span className={s.header_text}>Invite Suppliers</span>
				<span onClick={closeModal} className={s.header_close}>
					<Image
						className={s.header_close}
						src={modal_close}
						alt="modal_close"
						width={15}
						height={15}
					/>
				</span>
			</div>
			<div className={s.content_wrapper}>
				<InviteSuppliersSection />
			</div>
		</div>
	);
};
