import React from 'react';
import s from './SupplierHeader.module.scss';
import { BackButton } from '@/components/UI/BackButton';

function SupplierHeader() {
	return (
		<div className={s.wrapper}>
			<BackButton href={'/suppliers'} />
		</div>
	);
}

export default SupplierHeader;
