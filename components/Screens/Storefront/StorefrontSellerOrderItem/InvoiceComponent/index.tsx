'use client';
import s from './InvoiceComponent.module.scss';
import { Invoice } from './Invoice';
import { useState } from 'react';
import { classNames } from '@/utils/classNames';
import { OrderInterface } from '@/types/services/orders';

type TypeProps = {
	order: OrderInterface;
};

export const InvoiceComponent = ({ order }: TypeProps) => {
	const [activeDisplay, setActiveDisplay] = useState<number>(1);
	return (
		<div className={s.wrapper}>
			<div className={s.nav}>
				<span
					onClick={() => setActiveDisplay(1)}
					className={classNames(s.nav_item, activeDisplay === 1 && s.nav_active)}
				>
					Invoice
				</span>
				<span
					onClick={() => setActiveDisplay(2)}
					className={classNames(s.nav_item, activeDisplay === 2 && s.nav_active)}
				>
					Chat
				</span>
			</div>
			{activeDisplay === 1 && <Invoice order={order} />}
		</div>
	);
};
