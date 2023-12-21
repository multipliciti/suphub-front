import { FC, useState } from 'react';

import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { ProjectsCartOrderModal } from './ProjectsCartOrderModal';
import { formatNumberAsCurrency } from '@/utils/numbers';
import { generateProductLabels } from '@/components/Screens/Projects/ProjectsCart/_helpers';
import { ProjectsCartQuantity } from './ProjectsCartQuantity';
import { ProjectsCartProduct } from './ProjectsCartProduct';
import { ProjectsCartDelete } from './ProjectsCartDelete';
import { ModalPortal } from '@/components/Features/ModalPortal';
import { CartElement } from '@/types/products/cart';
import { SpanPrice } from '@/components/UI/SpanPrice';
import { Button } from '@/components/UI/Button';
import {
	findAndToggleOneRow,
	findAndToggleAll,
} from '@/redux/slices/projects/projectsCart';

import s from './ProjectsCartTable.module.scss';

interface Props {
	item: CartElement;
}

export const ProjectsCartTable: FC<Props> = ({ item }) => {
	const dispatch = useAppDispatch();

	const selectedRows = useAppSelector(
		(state) => state.projectCartSlice.selectedRows
	);

	const [showOrderModal, setShowOrderModel] = useState(false);

	const handleSelectAll = () => {
		dispatch(findAndToggleAll({ sellerId: item.sellerId }));
	};

	const handleSelectOne = (id: number) => {
		dispatch(findAndToggleOneRow({ sellerId: item.sellerId, productId: id }));
	};

	const isAllSelected = () => {
		const row = selectedRows.find((el) => el.sellerId === item.sellerId);
		if (!row) {
			return false;
		}
		return row.selectedIds.length === row.allProductIds.length;
	};

	const isSelected = (id: number) => {
		const row = selectedRows.find((el) => el.sellerId === item.sellerId);
		if (!row) {
			return false;
		}
		return row.selectedIds.includes(id);
	};

	const checkDisableModal = () => {
		const row = selectedRows.find((el) => el.sellerId === item.sellerId);
		if (!row) {
			return true;
		}
		return row.selectedIds.length <= 0;
	};

	const totalPrice = item.products.reduce((previousValue, currentValue) => {
		return previousValue + currentValue.price * currentValue.quantity;
	}, 0);

	return (
		<div className={s.wrapper}>
			<div className={s.header}>
				<input
					type="checkbox"
					className={s.header_checkbox}
					checked={isAllSelected()}
					onChange={handleSelectAll}
				/>
				<div style={{ whiteSpace: 'pre-wrap' }}>
					{item.sellerName}
					{'   '}/{'   '}
					{item.products.length} items{'   '}/
				</div>
				<div className={s.header_subtotal} style={{ whiteSpace: 'pre-wrap' }}>
					Subtotal:{'  '}
					<SpanPrice>{formatNumberAsCurrency(totalPrice)}</SpanPrice>
				</div>
				<div className={s.header_btn}>
					<Button
						variant="contained"
						disabled={checkDisableModal()}
						onClick={() => setShowOrderModel(true)}
					>
						Issue Purchase Order
					</Button>

					<ModalPortal
						isOpen={showOrderModal}
						onHide={() => setShowOrderModel(false)}
					>
						<ProjectsCartOrderModal
							sellerId={item.sellerId}
							onHide={() => setShowOrderModel(false)}
						/>
					</ModalPortal>
				</div>
			</div>

			<table className={s.table}>
				<thead>
					<tr>
						<th style={{ paddingLeft: 12, paddingRight: 0 }}></th>
						<th style={{ textAlign: 'start', width: '100%' }}>Product</th>
						<th>Unit price</th>
						<th>QTY</th>
						<th>Metric</th>
						<th>Lead time (weeks)</th>
						<th>Warranty (years)</th>
						<th>Amount</th>
						<th></th>
					</tr>
				</thead>

				<tbody>
					{item.products.map((el, index) => (
						<tr key={`${el.cartId}-${index}`}>
							<td style={{ paddingLeft: 12, paddingRight: 0, margin: 'auto' }}>
								<input
									type="checkbox"
									style={{ width: 20, height: 20 }}
									checked={isSelected(el.id)}
									onChange={() => handleSelectOne(el.id)}
								/>
							</td>
							<td>
								<ProjectsCartProduct
									imgUrl={el.model.product?.images[0]?.image?.url}
									title={el.model.product?.name || ''}
									labels={generateProductLabels(el.model)}
								/>
							</td>
							<td>
								<SpanPrice>{formatNumberAsCurrency(el.price)}</SpanPrice>
							</td>
							<td>
								<ProjectsCartQuantity
									sellerId={item.sellerId}
									productId={el.id}
									initQuantity={el.quantity}
								/>
							</td>
							<td style={{ textTransform: 'capitalize' }}>
								{el.model.product?.unitOfMeasurement}
							</td>
							<td>{el.model.product?.leadTime}</td>
							<td>{el.model.product?.warranty}</td>
							<td style={{ textAlign: 'end' }}>
								<SpanPrice>
									{formatNumberAsCurrency(el.price * el.quantity)}
								</SpanPrice>
							</td>
							<td>
								<ProjectsCartDelete sellerId={item.sellerId} productId={el.id} />
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};
