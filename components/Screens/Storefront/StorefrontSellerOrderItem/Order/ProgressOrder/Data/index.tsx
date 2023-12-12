'use client';
import s from './Data.module.scss';
import { formatDateString } from '@/utils/formatDateString';

type TypeProps = {
	date: string;
};

export const Data = ({ date }: TypeProps) => {
	return <div className={s.wrapper}>{formatDateString(date)}</div>;
};
