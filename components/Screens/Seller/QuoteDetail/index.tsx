'use client';
import s from './QuoteDetail.module.scss';
import { QuoteDetailComponent } from './QuoteDetailComponent';
import { InvoiceChatComponent } from './InvoiceChatComponent';

export const Request = () => {
	return (
		<div className={s.wrapper}>
			<QuoteDetailComponent />
			<InvoiceChatComponent />
		</div>
	);
};
