import { FC, HTMLAttributes } from 'react';

import { classNames } from '@/utils/classNames';

import s from './Spinner.module.scss';

interface Props extends HTMLAttributes<HTMLDivElement> {
	size?: 's' | 'm' | 'l';
}

export const Spinner: FC<Props> = ({ size = 'l', className, ...props }) => {
	return (
		<div className={classNames(s.wrapper, className)} {...props}>
			<div className={classNames(s.loader, s[`loader_${size}`])} />
		</div>
	);
};
