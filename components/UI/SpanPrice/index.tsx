import { FC, HTMLProps, PropsWithChildren } from 'react';

import s from './SpanPrice.module.scss';

interface Props extends HTMLProps<HTMLSpanElement> {}

export const SpanPrice: FC<PropsWithChildren<Props>> = ({ children, ...props }) => {
	return (
		<span className={s.span_price} {...props}>
			{children}
		</span>
	);
};
