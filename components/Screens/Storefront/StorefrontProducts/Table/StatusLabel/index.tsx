import { FC } from 'react';

import { ProductItemStatus } from '@/types/products/product';
import { classNames } from '@/utils/classNames';

import s from './StatusLabel.module.scss';

interface Props {
	status: ProductItemStatus;
}

const getStatusTitle = (status: ProductItemStatus) => {
	switch (status) {
		case 'published':
			return 'Published';
		case 'draft':
			return 'Draft';
		case 'archived':
			return 'Archived';
		case 'rfqOnly':
			return 'RFQ';
		default:
			return 'Unknown';
	}
};

export const StorefrontProductStatusLabel: FC<Props> = ({ status }) => {
	return (
		<span className={classNames(s.status_label, s[`status_label_${status}`])}>
			{getStatusTitle(status)}
		</span>
	);
};
