'use client';
import s from './Successful.module.scss';

import { useAppDispatch } from '@/redux/hooks';
import { useAppSelector } from '@/redux/hooks';

export const Successful = () => {
	const text = useAppSelector((state) => state.modalSlice.successfulText);
	return <div className={s.wrapper}>{text}</div>;
};
