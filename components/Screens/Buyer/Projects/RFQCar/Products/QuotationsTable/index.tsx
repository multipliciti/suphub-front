'use client';
import { useState, useRef, useEffect } from 'react';
import { classNames } from '@/utils/classNames';
import s from './QuotationsTable.module.scss';
import Image from 'next/image';
import more_icon from '@/imgs/Buyer&Seller/more.svg';
import delete_icon from '@/imgs/Buyer&Seller/delete.svg';
import sample_icon from '@/imgs/Buyer&Seller/sample.svg';
import purchase_icon from '@/imgs/Buyer&Seller/purchase.svg';
import { useRouter } from 'next/navigation';
import chat_image from '@/imgs/Buyer&Seller/chat_icon.svg';
import eye_icon from '@/imgs/Buyer&Seller/eye.svg';
import { RfqItemGot } from '@/types/services/rfq';
import { Option } from '@/types/services/rfq';

interface TypeProps {
	rfqs: RfqItemGot[];
	compress: boolean;
}

export const QuotationsTable = ({ rfqs, compress }: TypeProps) => {
	const { push } = useRouter();
	const [indexMore, setIndexMore] = useState<number>(-1);
	const [rect, setRect] = useState<any>();

	// const tbodyRef = useRef<HTMLTableSectionElement>(null);
	const tbodyRef = useRef<HTMLTableElement>(null);
	console.log('Координаты элемента:', rect);
	useEffect(() => {
		const targetElement = document.querySelector(`[data-id="${indexMore}"]`);

		console.log('targetElement', targetElement);
		if (targetElement) {
			const rect = targetElement.getBoundingClientRect();
			setRect(rect);
		}
	}, [indexMore, compress]);

	let maxOptionsLength = 0;
	let maxOptionsLengthArr = [];

	rfqs.forEach((item: RfqItemGot) => {
		if (item.options.length > maxOptionsLength) {
			maxOptionsLength = item.options.length;
		}
	});

	for (let i = 0; i < maxOptionsLength; i++) {
		maxOptionsLengthArr.push(i + 1);
	}

	return (
		<table
			ref={tbodyRef}
			className={classNames(s.table, compress && s.table_compress)}
		>
			{rect && (
				<div
					style={{
						top: `${rect.top + (compress ? 59 : 55)}px`,
						left: `${rect.left}px`,
					}}
					className={classNames(s.more, indexMore !== -1 && s.more_active)}
				>
					<span className={s.more_item}>Product details</span>
					<span className={s.more_item}>Order sample</span>
					<span className={classNames(s.more_item, s.more_decline)}>
						Decline offer
					</span>
				</div>
			)}
			<thead className={s.thead}>
				<tr>
					<th className={classNames(s.th, compress && s.th_compress)}>
						<span className={s.eye_icon}>
							<Image
								className={s.eye_icon}
								src={eye_icon}
								alt="eye_icon"
								width={20}
								height={20}
							/>
						</span>
					</th>
					{maxOptionsLengthArr.map((el, ind) => {
						return (
							<th key={ind} className={s.th}>
								<span className={s.option}>Option {el}</span>
							</th>
						);
					})}
				</tr>
			</thead>

			<tbody className={s.tbody}>
				{rfqs.map((el, ind) => {
					return (
						<tr key={el.id} className={s.tr}>
							<td className={s.td}>
								<Image
									className={s.eye_icon}
									src={eye_icon}
									alt="eye_icon"
									width={20}
									height={20}
								/>
							</td>
							{el.options.map((el, ind) => {
								return (
									<td
										data-id={el.id}
										className={classNames(s.td, compress && s.td_compress)}
										onClick={() => {
											setIndexMore(indexMore === el.id ? -1 : el.id);
										}}
										key={ind}
									>
										<span className={s.item}>
											<span className={s.item_info}>
												<span className={s.item_size}>{el.size}</span>
												<span className={s.item_price}>${el.price}</span>
											</span>

											<Image
												src={delete_icon}
												alt="delete_icon"
												width={20}
												height={20}
											/>
											<Image
												src={sample_icon}
												alt="sample_icon"
												width={20}
												height={20}
											/>
											<Image
												src={purchase_icon}
												alt="purchase_icon"
												width={20}
												height={20}
											/>
											<span>
												<Image
													className={s.icons_more}
													src={more_icon}
													alt="more_icon"
													width={20}
													height={20}
												/>
											</span>
										</span>
									</td>
								);
							})}
						</tr>
					);
				})}
			</tbody>
		</table>
	);
};
