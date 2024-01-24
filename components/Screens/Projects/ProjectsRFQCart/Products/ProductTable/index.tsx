'use client';
import { useEffect, useRef, useState } from 'react';
import { useAppDispatch } from '@/redux/hooks';

import { classNames } from '@/utils/classNames';
import s from './ProductTable.module.scss';
import Image from 'next/image';
import chat_image from '@/imgs/Buyer&Seller/chat_icon.svg';
import { RfqItemGot } from '@/types/services/rfq';
import { setRfqId } from '@/redux/slices/sideBars/sideBarRequestDetail';
import { Api } from '@/services';
import debounce from 'lodash.debounce';

import { extractCode } from './halpers';

interface TypeProps {
	properties: RfqItemGot[];
	compress: boolean;
}

export const ProductTable = ({ properties, compress }: TypeProps) => {
	const api = Api();
	const dispatch = useAppDispatch();
	const tableRef = useRef<HTMLTableSectionElement | null>(null);
	const inputBugetRef = useRef<HTMLInputElement | null>(null);

	//handle string input
	const handleUpdateRfqFetch = async (
		id: number,
		key: string,
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		const value = e.target.value;

		try {
			await api.rfq.updateRfq(id, { [key]: value });
		} catch (error) {
			console.log('error update rfq:', error);
		}
	};

	//handle number input
	const handleUpdateRfqFetchNumberType = async (
		id: number,
		key: string,
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		let data;
		//remove $ if had
		const value = e.target.value.startsWith('$')
			? e.target.value.slice(1)
			: e.target.value;

		data = Number(value);
		//if data number
		if (!isNaN(data) && typeof data === 'number') {
			try {
				await api.rfq.updateRfq(id, { [key]: data });
			} catch (error) {
				console.log('error update rfq:', error);
			}
		}
	};

	const debouncedHandleUpdateRfqFtch = debounce(handleUpdateRfqFetch, 300);

	useEffect(() => {
		// Clean up debounce on component unmount
		return () => debouncedHandleUpdateRfqFtch.cancel();
	}, [debouncedHandleUpdateRfqFtch]);

	return (
		<div className={s.wrapper}>
			<table className={classNames(s.table)}>
				{/* thead */}
				<thead className={s.thead}>
					<tr>
						<th>
							<label htmlFor={s.input_label}>
								<input className={s.input_checkbox} type="checkbox" />
							</label>
						</th>
						<th>Product</th>
						<th>Chat</th>
						<th>Size</th>
						<th>Quantity</th>
						<th>Unit</th>
						<th>Status</th>
						<th>Unit Budget</th>
					</tr>
				</thead>
				{/* tbody  */}
				<tbody
					ref={tableRef}
					className={classNames(s.tbody, compress && s.tbody_compress)}
				>
					{properties.map((rfq: RfqItemGot, ind: number) => (
						<tr key={ind}>
							{/* title  */}
							<td>
								<label htmlFor={s.input_label}>
									<input className={s.input_checkbox} type="checkbox" />
								</label>
							</td>
							<td>
								<div className={s.description}>
									<span className={s.subtitle}>
										{/* refactoring */}
										CSI {extractCode(rfq.subCategory.csiCode)}
									</span>
									<p onClick={() => dispatch(setRfqId(rfq.id))} className={s.title}>
										{rfq.productName}
									</p>
								</div>
							</td>
							{/* chat */}
							<td>
								<div className={s.chat_wrapper}>
									<span className={s.chat}>
										<Image
											src={chat_image}
											alt="chat_image"
											width={24}
											height={24}
										/>
										<div
											className={classNames(
												s.chat_sms,
												//hardcode
												1 > 0 && s.chat_sms_active
											)}
										>
											{/* hardcode  */}
											<span className={s.chat_number}>{1}</span>
										</div>
									</span>
								</div>
							</td>
							{/* size  */}
							<td className={s.size}>
								<input
									defaultValue={rfq.size ? rfq.size : 'null'}
									className={s.input}
									onChange={(e) => debouncedHandleUpdateRfqFtch(rfq.id, 'size', e)}
									type="text"
								/>
							</td>
							{/* Quantity  */}
							<td>
								<input
									defaultValue={rfq.quantity ? rfq.quantity : 'null'}
									className={s.input}
									onChange={(e) =>
										handleUpdateRfqFetchNumberType(rfq.id, 'quantity', e)
									}
									type="number"
								/>
							</td>
							{/* Unit  */}
							<td>Unit</td>
							{/* Status  */}
							<td>
								<span
									className={classNames(
										s.status,
										compress && s.status_compress,
										rfq.status === 'draft' && s.status_requested,
										rfq.status === 'requested' && s.status_requested,
										rfq.status === 'selectionNeeded' && s.status_selectionNeeded,
										rfq.status === 'ordered' && s.status_ordered
									)}
								>
									{rfq.status.charAt(0).toUpperCase() + rfq.status.slice(1)}
								</span>
							</td>
							{/* Unit Budget  */}
							<td>
								<input
									ref={inputBugetRef}
									defaultValue={`$` + `${rfq.budget}`}
									className={s.input}
									onChange={(e) =>
										handleUpdateRfqFetchNumberType(rfq.id, 'budget', e)
									}
									// type="string" because I don’t know how to put the dollar at the beginning of the default state for the number type
									type="string"
								/>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};
