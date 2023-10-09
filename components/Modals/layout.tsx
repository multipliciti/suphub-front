'use client';
import React, { useState } from 'react';
import s from './Modals.module.scss';
import Image from 'next/image';
import { setModal } from '@/redux/slices/modal';
import { useAppDispatch } from '@/redux/hooks';
import { classNames } from '@/utils/classNames';
//imgs
import modal_logo from '@/imgs/Modal/Modal_logo.svg';
import modal_close from '@/imgs/close.svg';
import modal_email from '@/imgs/Modal/email.svg';

export const LayoutModal = ({ children }: { children: React.ReactNode }) => {
	const dispatch = useAppDispatch();

	return (
		<div className={s.wrapper_layout}>
			<div className={s.modal_header}>
				<div className={s.logo}>
					<Image src={modal_logo} alt="logo" width={32} height={32} />
				</div>

				<span
					onClick={() => {
						dispatch(setModal(''));
					}}
					className={s.close}
				>
					<Image src={modal_close} alt="logo" width={15} height={15} />
				</span>
			</div>

			{children}
		</div>
	);
};
