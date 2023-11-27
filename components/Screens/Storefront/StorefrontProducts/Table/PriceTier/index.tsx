'use client';
import { FC, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import debounce from 'lodash.debounce';
import { classNames } from '@/utils/classNames';
import { Price } from '@/types/products/product';
import { Api } from '@/services';

import s from './PriceTier.module.scss';

import infoIcon from '@/imgs/Buyer&Seller/information.svg';
import clearIcon from '@/imgs/Buyer&Seller/clear.svg';

interface Props {
	productId: number;
	productPrices: Price[];
	platformCommission: number;
	titleColumn?: string;
}

export const StorefrontProductPriceTier: FC<Props> = (props) => {
	const { productId, productPrices, platformCommission, titleColumn } = props;

	const api = Api();

	const [prices, setPrices] = useState<Price[]>(productPrices);

	const addNewPrice = async () => {
		try {
			const response = await api.productPrice.addPrice({
				productId,
				value: 0,
				minCount: 0,
			});
			setPrices((prevState) => [...prevState, response]);
		} catch (e) {
			console.log('Error with add product price', e);
		}
	};

	const deletePrice = async (id: number) => {
		try {
			await api.productPrice.deletePrice(id);
			setPrices((prevState) => [...prevState].filter((item) => item.id !== id));
		} catch (e) {
			console.log('Error with delete product price', e);
		}
	};

	return (
		<table className={s.table}>
			<thead>
				{titleColumn && (
					<tr>
						<th colSpan={3}>Price</th>
					</tr>
				)}

				<tr className={classNames(titleColumn && s.reset_th_row)}>
					<th>Listing Unit Price (USD)</th>
					<th>
						<div className={s.earnings_label}>
							Your Earnings (USD)
							<Image src={infoIcon} alt="information_icon" width={16} height={16} />
						</div>
					</th>
					<th style={{ width: 52 }} />
				</tr>
			</thead>

			<tbody>
				{prices &&
					prices.length > 0 &&
					prices
						.toSorted((a, b) =>
							a.minCount === 0 ? 1 : b.minCount === 0 ? -1 : a.minCount - b.minCount
						)
						.map((item, index) => (
							<PriceTierItem
								key={`${index}-${item.id}-${item.productId}`}
								item={item}
								platformCommission={platformCommission}
								onDelete={() => deletePrice(item.id)}
							/>
						))}

				<tr>
					<td colSpan={3}>
						<button className={s.add_btn} onClick={addNewPrice}>
							Add a price tier
						</button>
					</td>
				</tr>
			</tbody>
		</table>
	);
};

interface PriceTierItemProps {
	item: Price;
	platformCommission: number;
	onDelete: () => void;
}
const PriceTierItem: FC<PriceTierItemProps> = ({
	item,
	platformCommission,
	onDelete,
}) => {
	const api = Api();

	const isFirstRender = useRef(true);

	const [minCount, setMinCount] = useState(item.minCount);
	const [value, setValue] = useState(item.value);

	const debouncedUpdate = debounce((value) => {
		onUpdate(value[0], value[1]);
	}, 300);

	useEffect(() => {
		if (isFirstRender.current) {
			isFirstRender.current = false;
			return;
		}
		debouncedUpdate([minCount, value]);
	}, [minCount, value]);

	useEffect(() => {
		return () => {
			debouncedUpdate.cancel();
		};
	}, [debouncedUpdate]);

	const onUpdate = async (minCount: number, value: number) => {
		try {
			await api.productPrice.updatePrice({ priceId: item.id, minCount, value });
		} catch (e) {
			console.log('Error with update product price', e);
		}
	};

	return (
		<tr>
			<td>
				<div className={s.price_row}>
					<div>QTY &gt;</div>
					<input
						style={{ width: 60 }}
						placeholder={'0'}
						type="number"
						value={minCount === 0 ? '' : minCount}
						onChange={(e) => setMinCount(Number(e.target.value))}
					/>
					<input
						style={{ width: 90 }}
						placeholder={'$0.00'}
						type="number"
						value={value === 0 ? '' : value}
						onChange={(e) => setValue(Number(e.target.value))}
					/>
					<span>per unit</span>
				</div>
			</td>

			<td>
				<input
					className={s.earnings_input}
					type="text"
					disabled={true}
					placeholder={'$0.00'}
					value={(value * (1 - platformCommission)).toFixed(2)}
				/>
			</td>
			<td>
				<div style={{ cursor: 'pointer' }} onClick={onDelete}>
					<Image src={clearIcon} alt="clear_icon" />
				</div>
			</td>
		</tr>
	);
};
