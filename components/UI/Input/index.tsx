import { FC, InputHTMLAttributes } from 'react';

import { classNames } from '@/utils/classNames';

import s from './Input.module.scss';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
	withBorder?: boolean;
}

export const Input: FC<Props> = ({ withBorder = false, ...props }) => {
	return (
		<input
			className={classNames(s.input, withBorder && s.input_border)}
			{...props}
		/>
	);
};
