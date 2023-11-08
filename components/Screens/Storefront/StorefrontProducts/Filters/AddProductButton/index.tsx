'use client';
import { useState } from 'react';

import { useAppDispatch } from '@/redux/hooks';
import { classNames } from '@/utils/classNames';
import { setModal } from '@/redux/slices/modal';

import s from './AddProductButton.module.scss';


export const StorefrontProductAddProductButton = () => {
	const dispatch = useAppDispatch();

	const [isOpen, setIsOpen] = useState(false);

	return (
		<div className={s.wrapper}>
			<button
				className={s.button}
				onClick={() => setIsOpen(!isOpen)}
			>
				Add new product
			</button>

			<div
				className={classNames(
					s.options,
					isOpen && s.options_active
				)}
			>
				<button
					onClick={() => dispatch(setModal('sellerAddNewProduct'))}
				>
					Add manually
				</button>
				<button
					onClick={() => dispatch(setModal('sellerProductBulkUpload'))}
				>
					Bulk upload
				</button>
			</div>
		</div>
	)
}