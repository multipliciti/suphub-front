'use client';
import { useRef } from 'react';
import { classNames } from '@/utils/classNames';
import s from './Invoice.module.scss';
import edit_icon from '@/imgs/Buyer&Seller/edit.svg';
import Image from 'next/image';
import { OrderInterface } from '@/types/services/orders';
import { truncateFileNameEnd } from '@/utils/names';

type TypeProps = {
	order: OrderInterface;
};

export const Invoice = ({ order }: TypeProps) => {
	const textareaRef = useRef<HTMLTextAreaElement>(null);

	const handleEditClick = () => {
		if (textareaRef.current) {
			textareaRef.current.focus();
		}
	};

	const totalPrice = order.elements?.reduce(
		(acc, order) => acc + (order.price || 0),
		0
	);
	const formattedAddress = order.buyerCompany.address
		? `${order.buyerCompany.address.street}\n${order.buyerCompany.address.city}, ${order.buyerCompany.address.state} ${order.buyerCompany.address.zipcode}\n${order.buyerCompany.address.country}`
		: 'Not adress';

	return (
		<div className={s.wrapper}>
			{/* Manufacturer && Ship To */}
			<div className={s.info_ship}>
				<div className={s.block}>
					<p className={s.header}>Manufacturer</p>
					<p className={s.title}>
						{order.sellerCompany.abbreviation} <br />
						<span className={s.subtitle}>{order.sellerCompany.name}</span>
					</p>
				</div>

				<div className={s.block}>
					<p className={s.header}>
						Ship To
						<span onClick={handleEditClick} className={s.edit}>
							<Image src={edit_icon} alt="edit_icon" width={20} height={20} />
							<span>Edit</span>
						</span>
					</p>
					<textarea
						ref={textareaRef}
						defaultValue={formattedAddress}
						className={classNames(s.input, s.title)}
					></textarea>
				</div>
			</div>

			{/* Product table  */}
			{order.elements && order.elements.length > 0 && (
				<div className={s.info_product}>
					<table className={s.table}>
						<thead className={s.thead}>
							<tr className={s.tr}>
								<th>Product</th>
								<th>QTY</th>
								<th>Unit Price</th>
								<th>Amount</th>
							</tr>
						</thead>
						<tbody>
							{order.elements.map((product, ind) => {
								return (
									<tr className={s.tr} key={ind}>
										<td className={s.description}>
											<span className={s.title}>
												{truncateFileNameEnd(product.modelName ?? '', 35) ??
													'Not name'}
											</span>
											{/* <span className={s.size}>{'None'}</span> */}
										</td>
										<td className={s.td_info}>{product.quantity}</td>
										<td className={s.td_info}>${product.price}</td>
										<td className={s.td_info}>
											${`${(product.quantity * product.price).toFixed(0)}`}
										</td>
									</tr>
								);
							})}
						</tbody>
					</table>

					<div className={s.amount}>
						<p className={s.amount_shipping}>
							<span>Shipping</span> <span>Not now</span>
						</p>
						<p className={s.amount_total}>
							<span>Total</span>
							<span>${totalPrice?.toFixed(0)}</span>
						</p>
					</div>
				</div>
			)}

			{/* description key = value  */}
			<div className={s.items}>
				<div className={s.item}>
					<span className={s.item_key}>Lead time (weeks):</span>
					<span className={s.item_value}>{'None'}</span>
				</div>
				<div className={s.item}>
					<span className={s.item_key}>Payment terms:</span>
					<span className={s.item_value}>{'None'}</span>
				</div>
				<div className={s.item}>
					<span className={s.item_key}>Certifications:</span>
					<span className={s.item_value}>{'None'}</span>
				</div>
				<div className={s.item}>
					<span className={s.item_key}>Warranty (years):</span>
					<span className={s.item_value}>{'None'}</span>
				</div>
				<div className={s.item}>
					<span className={s.item_key}>Shipment:</span>
					<span className={s.item_value}>{'None'}</span>
				</div>
			</div>
		</div>
	);
};
