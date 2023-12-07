'use client';
import { FC } from 'react';

import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { formatNumberAsCurrency } from '@/utils/numbers';
import { classNames } from '@/utils/classNames';
import { toggleAll } from '@/redux/slices/projects/projectsCart';
import { SpanPrice } from '@/components/UI/SpanPrice';
import { Button } from '@/components/UI/Button';

import s from './ProjectsCartMenu.module.scss';

export const ProjectsCartMenu: FC = () => {
	const dispatch = useAppDispatch();

	const sidebar = useAppSelector((state) => state.projectsSidebar.sidebar);

	const project = useAppSelector((state) => state.projectCartSlice.projectCart);
	const selectedRows = useAppSelector(
		(state) => state.projectCartSlice.selectedRows
	);

	if (!project) {
		return;
	}

	let isAllSelected = selectedRows.every((item) => {
		return item.selectedIds.length === item.allProductIds.length;
	});

	const subtotal = project.elements.reduce((previousValue, currentValue) => {
		const sellerIdIndex = selectedRows.findIndex(
			(item) => item.sellerId === currentValue.sellerId
		);

		if (sellerIdIndex === -1) {
			return previousValue;
		}

		let subtotalProductsValue = currentValue.products.reduce((acc, val) => {
			const isProductSelected = selectedRows[sellerIdIndex].selectedIds.find(
				(item) => val.id === item
			);
			if (isProductSelected) {
				return acc + val.price * val.quantity;
			}
			return acc;
		}, 0);

		return previousValue + subtotalProductsValue;
	}, 0);

	const total = project.elements.reduce((previousValue, currentValue) => {
		let totalProductsValue = currentValue.products.reduce((acc, val) => {
			return acc + val.price * val.quantity;
		}, 0);
		return previousValue + totalProductsValue;
	}, 0);

	return (
		<div className={classNames(s.wrapper, sidebar && s.wrapper_sidebar)}>
			<label className={s.select}>
				<input
					type="checkbox"
					checked={isAllSelected}
					onChange={() => dispatch(toggleAll())}
				/>
				<span>Select all</span>
			</label>
			<div className={s.info}>
				<div>
					<div className={`${s.info_row} ${s.info_row_default}`}>
						<span>Subtotal</span>
						<span>{formatNumberAsCurrency(subtotal)}</span>
					</div>
					<div className={`${s.info_row} ${s.info_row_default}`}>
						<span>Est.Delivery</span>
						<span>Contact Support</span>
					</div>
					<div className={s.info_row}>
						<SpanPrice style={{ fontWeight: 'normal' }}>Total</SpanPrice>
						<SpanPrice>{formatNumberAsCurrency(total)}</SpanPrice>
					</div>
				</div>
				<Button variant="contained" disabled>
					Apply for Net Terms
				</Button>
			</div>
		</div>
	);
};
