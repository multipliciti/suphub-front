'use client';
import s from './StorefrontRequestItem.module.scss';
import { QuoteDetailComponent } from './QuoteDetailComponent';
import { InvoiceChatComponent } from './InvoiceChatComponent';
import { useAppSelector } from '@/redux/hooks';

type TypeProps = {
	id: number;
};

export const RequestItem = ({ id }: TypeProps) => {
	const items = useAppSelector(
		(state) => state.storefrontProjectsSellerSlice.projects
	);
	const item = items.find((project) => project.id === id);
	return (
		<div className={s.wrapper}>
			<QuoteDetailComponent item={item} />
			<InvoiceChatComponent />
		</div>
	);
};
