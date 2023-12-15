import { FC } from 'react';

import {
	ProductItemStatus,
	productLabelStatuses,
} from '@/types/products/productStatus';
import { classNames } from '@/utils/classNames';

import s from './StatusLabel.module.scss';

interface Props {
	status: ProductItemStatus;
}

export const StorefrontProductStatusLabel: FC<Props> = ({ status }) => {
	return (
		<span className={classNames(s.status_label, s[`status_label_${status}`])}>
			{productLabelStatuses[status] || 'Unknown'}
		</span>
	);
};
