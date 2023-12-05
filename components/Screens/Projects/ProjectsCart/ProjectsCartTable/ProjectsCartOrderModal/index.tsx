'use client';
import { FC, useEffect, useState } from 'react';

import { formatNumberAsCurrency } from '@/utils/numbers';
import { generateProductLabels } from '@/components/Screens/Projects/ProjectsCart/_helpers';
import { PurchaseOrderMessage } from '@/components/Screens/Projects/ProjectsCart/ProjectsCartTable/ProjectsCartOrderModal/PurchaseOrderMessage';
import { ProjectsCartProduct } from '@/components/Screens/Projects/ProjectsCart/ProjectsCartTable/ProjectsCartProduct';
import { useAppSelector } from '@/redux/hooks';
import { BuyerCompany } from '@/types/services/company';
import { ModalLayout } from '@/components/Features/ModalLayout';
import { CartProduct } from '@/types/products/cart';
import { SpanPrice } from '@/components/UI/SpanPrice';
import { Button } from '@/components/UI/Button';
import { Api } from '@/services';

import s from './ProjectsCartOrderModal.module.scss';

interface Props {
	onHide: () => void;
	sellerId: number;
}

export const ProjectsCartOrderModal: FC<Props> = ({ sellerId, onHide }) => {
	const api = Api();

	const user = useAppSelector((state) => state.authSlice.user);
	const project = useAppSelector((state) => state.projectItemSlice.project);
	const projectCart = useAppSelector((state) => state.projectCartSlice.projectCart);
	const selectedRows = useAppSelector(
		(state) => state.projectCartSlice.selectedRows
	);

	const [buyerCompany, setBuyerCompany] = useState<BuyerCompany>();
	const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'rejected'>(
		'idle'
	);

	useEffect(() => {
		fetchBuyerCompany();
	}, []);

	if (!projectCart) {
		return;
	}

	const fetchBuyerCompany = async () => {
		if (!user || !user.buyerCompanyId) {
			return;
		}
		try {
			const response = await api.buyerCompany.getById(user.buyerCompanyId);
			setBuyerCompany(response.data);
		} catch (e) {}
	};

	const getSelectedProducts = (): CartProduct[] => {
		const element = projectCart.elements.find((item) => item.sellerId === sellerId);
		if (!element) {
			return [];
		}

		const selectedRowsForElement = selectedRows.find(
			(item) => item.sellerId === sellerId
		);
		if (!selectedRowsForElement || selectedRowsForElement.selectedIds.length === 0) {
			return [];
		}

		return element.products.filter((item) => {
			return selectedRowsForElement.selectedIds.includes(item.id);
		});
	};

	const selectedProducts = getSelectedProducts();
	const total = selectedProducts.reduce((previousValue, currentValue) => {
		return previousValue + currentValue.price * currentValue.quantity;
	}, 0);

	const createOrder = async () => {
		try {
			setStatus('loading');

			await api.order.create({
				type: '',
				PO: '',
				estDate: '',
				shipmentAmount: 0,
				//  The fields above are empty because
				//  they have no meaning at the time of writing the code
				cartElementIds: selectedProducts.map((item) => item.id),
			});

			setStatus('success');
		} catch (e) {
			console.log(e);
			setStatus('rejected');
		}
	};

	const getCurrentDate = () => {
		const date = new Date();
		return new Intl.DateTimeFormat('en-US', {
			year: 'numeric',
			month: '2-digit',
			day: '2-digit',
		}).format(date);
	};

	return (
		<ModalLayout title="Purchase Order" size="m" onHide={onHide}>
			{status === 'success' ? (
				<PurchaseOrderMessage />
			) : (
				<div className={s.wrapper}>
					<div className={s.info}>
						<div className={s.info_column}>
							<h4>
								<span>{buyerCompany?.name || ''}</span>
							</h4>
							{buyerCompany && (
								<>
									{buyerCompany.address && (
										<>
											<p>{buyerCompany.address.street}</p>
											<p>{buyerCompany.address.city}</p>
											<p>{buyerCompany.address.state}</p>
											<p>{buyerCompany.address.zipcode}</p>
										</>
									)}
									<p>{buyerCompany.website}</p>
								</>
							)}
						</div>
						<div className={s.info_column}>
							<h4>
								<span>PO#:</span> -
							</h4>
							<p>
								<span>Date of issue:</span> {getCurrentDate()}
							</p>
							<p>
								<span>Approved by:</span> John Doe
							</p>
							<p>
								<span>Payment Terms:</span> 30/70 TT
							</p>
						</div>
						<div className={s.info_column}>
							<h3>Vendor</h3>
							<p>
								<span>Suphub</span>
							</p>
							<p>220 Manhattan Avenue</p>
							<p>New York, NY 10025</p>
						</div>
						<div className={s.info_column}>
							<h3>Ship To</h3>
							{project && (
								<>
									{project.name && (
										<p>
											<span>{project.name}</span>
										</p>
									)}
									<p>{project.address?.street}</p>
									<p>{project.address?.city}</p>
									<p>
										{project.address?.state} {project.address?.country}{' '}
										{project.address?.zipcode}
									</p>
								</>
							)}
						</div>
					</div>

					<div className={s.products}>
						<table className={s.products_table}>
							<thead>
								<tr>
									<th style={{ textAlign: 'start', width: '100%' }}>Product</th>
									<th>QTY</th>
									<th>Unit Price</th>
									<th style={{ textAlign: 'end' }}>Total</th>
								</tr>
							</thead>
							<tbody>
								{selectedProducts.map((item, index) => (
									<tr key={`${item.id}-${index}`}>
										<td>
											<ProjectsCartProduct
												imgUrl={item.model.product?.images[0].image.url}
												title={item.model.product?.name || ''}
												labels={generateProductLabels(item.model)}
											/>
										</td>
										<td>{item.quantity}</td>
										<td>
											<SpanPrice>{formatNumberAsCurrency(item.price)}</SpanPrice>
										</td>
										<td style={{ textAlign: 'end' }}>
											<SpanPrice>
												{formatNumberAsCurrency(item.quantity * item.price)}
											</SpanPrice>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>

					<div className={s.details}>
						<div>
							<div className={s.details_row}>
								<span>Subtotal</span>
								<span>{formatNumberAsCurrency(total)}</span>
							</div>
							<div className={s.details_row}>
								<span>Shipping Costs:</span>
								<span>{formatNumberAsCurrency(100)}</span>
							</div>
							<div className={s.details_row}>
								<span>Tax:</span>
								<span>{formatNumberAsCurrency(100)}</span>
							</div>
							<div className={s.details_row}>
								<SpanPrice>Total:</SpanPrice>
								<SpanPrice>{formatNumberAsCurrency(total)}</SpanPrice>
							</div>
						</div>
					</div>

					<div className={s.order_btn}>
						<Button
							variant="contained"
							disabled={status !== 'idle'}
							onClick={createOrder}
						>
							{status === 'loading' ? 'Loading...' : 'Issue Purchase Order'}
						</Button>
						{status === 'rejected' && <p>Something went wrong</p>}
					</div>
				</div>
			)}
		</ModalLayout>
	);
};
