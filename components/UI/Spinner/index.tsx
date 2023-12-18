import React, { FC, HTMLAttributes } from 'react';

import { classNames } from '@/utils/classNames';
import s from './Spinner.module.scss';

interface Props extends HTMLAttributes<HTMLDivElement> {}
export const Spinner: FC<Props> = ({ ...props }) => {
	return (
		<div {...props}>
			<div className={classNames(s.loader_wrapper)}>
				<span className={classNames(s.loader)}></span>
			</div>
		</div>
	);
};
