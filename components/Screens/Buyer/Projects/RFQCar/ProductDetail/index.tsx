'use client';
import s from './ProductDetail.module.scss';
import { Content } from './Content';
import { InvoiceChatComponent } from './InvoiceChatComponent';
export const ProductDetailComponent = () => {
	return (
		<div className={s.wrapper}>
			<Content />
			<InvoiceChatComponent />
		</div>
	);
};
