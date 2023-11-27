'use client';
import s from './DisableRole.module.scss';
import { useAppSelector } from '@/redux/hooks';
import React from 'react';
import { LayoutModal } from '../layout';
import { Api } from '@/services';

export const DisableRole: React.FC = () => {
	const user = useAppSelector((state) => state.authSlice.user);
	console.log('user', user);
	return (
		<LayoutModal>
			<div className={s.wrapper}></div>
		</LayoutModal>
	);
};
