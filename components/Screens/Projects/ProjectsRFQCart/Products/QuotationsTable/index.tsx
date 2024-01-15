'use client';
import { useState, useRef, useEffect } from 'react';
import { classNames } from '@/utils/classNames';
import s from './QuotationsTable.module.scss';
import Image from 'next/image';
import more_icon from '@/imgs/Buyer&Seller/more.svg';
import delete_icon from '@/imgs/Buyer&Seller/delete.svg';
import purchase_icon from '@/imgs/Buyer&Seller/purchase.svg';
import ordered_icon from '@/imgs/Buyer&Seller/ordered.svg';
import { useRouter } from 'next/navigation';
import eye_icon from '@/imgs/Buyer&Seller/eye.svg';
import { RfqItemGot } from '@/types/services/rfq';
import Link from 'next/link';

interface TypeProps {
	rfqs: RfqItemGot[];
	compress: boolean;
}

export const QuotationsTable = ({ rfqs, compress }: TypeProps) => {
	const { push } = useRouter();
	const [indexMore, setIndexMore] = useState<number>(-1);
	const [rect, setRect] = useState<any>();
	const tHeadRef = useRef<HTMLTableSectionElement>(null);
	console.log('rfqs', rfqs);
	useEffect(() => {
		const targetElement = document.querySelector(`[data-id="${indexMore}"]`);

		if (targetElement) {
			const rect = targetElement.getBoundingClientRect();
			setRect(rect);
		}
	}, [indexMore, compress]);

	// const handleMouseEnter = (id: number) => {
	// 	setHoveredIds((prev) => [...prev, id]);
	// };

	// const handleMouseLeave = (id: number) => {
	// 	setHoveredIds((prev) => prev.filter((el) => el !== id));
	// };

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
		<div className={s.wrapper}>
			{rect && (
				<div
					style={{
						top: `${rect.top + (compress ? 55 : 52) - 215}px`,
						left: `${rect.left - (compress ? 0 : 0) - 262}px`,
					}}
					className={classNames(s.more, indexMore !== -1 && s.more_active)}
				>
					<Link href={`/projects/options/${indexMore}`} className={s.more_item}>
						Product details
					</Link>
					<span className={s.more_item}>Order sample</span>
					<span className={classNames(s.more_item, s.more_decline)}>
						Decline offer
					</span>
				</div>
			)}
			<table className={classNames(s.table, compress && s.table_compress)}>
				<thead ref={tHeadRef} className={s.thead}>
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
								<td className={classNames(s.td, compress && s.td_compress)}>
									<Image
										className={s.eye_icon}
										src={eye_icon}
										alt="eye_icon"
										width={20}
										height={20}
									/>
								</td>

								{el.options.length < 1 && (
									<td className={s.td}>
										<span className={s.noquotes}>You have no quotes yet.</span>
									</td>
								)}

								{el.options.map((el, ind) => {
									return (
										<td
											data-id={el.id}
											className={classNames(s.td, compress && s.td_compress)}
											// onClick={() => {
											// 	setIndexMore(indexMore === el.id ? -1 : el.id);
											// }}
											key={ind}
										>
											<span className={s.item}>
												{/* This is about borders, as td:hover is not working in the
												table.
												bad code */}

												{/* // */}
												{/* // */}
												<span className={classNames(s.border, s.border_top)}></span>
												<span
													className={classNames(s.border, s.border_bottom)}
												></span>
												<span className={classNames(s.border, s.border_left)}></span>
												<span
													className={classNames(s.border, s.border_right)}
												></span>
												{/* // */}
												{/* // */}

												<span className={s.item_info}>
													<span className={s.item_info_size}>{el.size}</span>
													<span className={s.item_info_price}>${el.price}</span>
												</span>
												<span className={s.item_icons}>
													<Image
														src={ordered_icon}
														alt="ordered_icon"
														width={20}
														height={20}
													/>
													<Image
														src={purchase_icon}
														alt="purchase_icon"
														width={20}
														height={20}
													/>
													<Image
														onClick={() =>
															setIndexMore(indexMore === el.id ? -1 : el.id)
														}
														className={s.icon_more}
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
		</div>
	);
};
