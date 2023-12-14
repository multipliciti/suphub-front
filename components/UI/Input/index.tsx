import { FC, InputHTMLAttributes } from 'react';

import { classNames } from '@/utils/classNames';

import s from './Input.module.scss';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
	withBorder?: boolean;
	withFocusBorder?: boolean;
}

export const Input: FC<Props> = ({
	withBorder = false,
	withFocusBorder = true,
	className,
	...props
}) => {
	return (
		<input
			className={classNames(
				s.input,
				withBorder && s.input_border,
				withFocusBorder && s.input_focus_border,
				className
			)}
			{...props}
		/>
	);
};
