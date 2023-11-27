import { ButtonHTMLAttributes, FC, PropsWithChildren } from 'react';

import { classNames } from '@/utils/classNames';

import s from './Button.module.scss';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: 'text' | 'outlined' | 'contained';
}

export const Button: FC<PropsWithChildren<Props>> = ({
	children,
	variant = 'text',
	...props
}) => {
	return (
		<button className={classNames(s.button, s[`button_${variant}`])} {...props}>
			{children}
		</button>
	);
};
