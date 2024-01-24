'use client';
import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { classNames } from '@/utils/classNames';
import s from './QuotationsTable.module.scss';
import { RfqItemGot } from '@/types/services/rfq';

import more_icon from '@/imgs/Buyer&Seller/more.svg';
import purchase_icon from '@/imgs/Buyer&Seller/purchase.svg';
import ordered_icon from '@/imgs/Buyer&Seller/ordered.svg';
import eye_icon from '@/imgs/Buyer&Seller/eye.svg';
import eye_icon_hover from '@/imgs/Buyer&Seller/eye_hover.svg';

interface TypeProps {
	projectId: number;
	rfqs: RfqItemGot[];
	compress: boolean;
}

export const QuotationsTable = ({ projectId, rfqs, compress }: TypeProps) => {
	const [maxOptionsLengthArr, setMaxOptionsLengthArr] = useState<number[]>([]);

	//states for modal 'more'
	const targetElement = useRef<HTMLDivElement | null>(null);
	const [indexMore, setIndexMore] = useState<number>(-1);
	const [rfqIdNavigation, setRfqIdNavigation] = useState<number>(0);
	const [topRelativeToParent, setTopRelativeToParent] = useState<number>(0);
	const [leftRelativeToParent, setLeftRelativeToParent] = useState<number>(0);

	// const [hoverRfq, setHoverRfq] = useState<number>(-1);

	useEffect(() => {
		const maxOptionsLength = rfqs.reduce((max, item) => {
			return Math.max(max, item.options.length);
		}, 0);
		//set max length options for render header index(number) option
		setMaxOptionsLengthArr(
			Array.from({ length: maxOptionsLength }, (_, index) => index + 1)
		);
	}, [rfqs]);

	const handleItemClick = (e: React.MouseEvent<HTMLImageElement>, index: number) => {
		if (targetElement.current) {
			const rect = e.currentTarget.getBoundingClientRect();
			const targetRect = targetElement.current.getBoundingClientRect();

			const topRelativeToTarget = rect.top - targetRect.top;
			const leftRelativeToTarget = rect.left - targetRect.left;

			setIndexMore(indexMore === index ? -1 : index);
			setTopRelativeToParent(topRelativeToTarget);
			setLeftRelativeToParent(leftRelativeToTarget);
		}
	};

	// later
	// useEffect(() => {
	// const handleScroll = () => {

	// };
	// if (targetElement.current && ) {
	// 	targetElement.current.addEventListener('scroll', handleScroll);

	// 	return () => {
	// 		targetElement.current.removeEventListener('scroll', handleScroll);
	// 	};
	// }
	// }, []);

	return (
		<div ref={targetElement} className={s.wrapper}>
			{indexMore !== -1 && (
				<div
					style={{
						top: `${topRelativeToParent + 25}px`,
						left: `${leftRelativeToParent - 159}px`,
					}}
					className={classNames(s.more, indexMore !== -1 && s.more_active)}
				>
					<Link
						href={`/projects/${projectId}/rfq/options/${rfqIdNavigation}`}
						className={s.more_item}
					>
						Product details
					</Link>
					<span className={s.more_item}>Order sample</span>
					<span className={classNames(s.more_item, s.more_decline)}>
						Decline offer
					</span>
				</div>
			)}

			<table className={classNames(s.table)}>
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
					{rfqs.map((rfq, ind) => {
						return (
							<tr key={ind} className={s.tr}>
								<td
									// onMouseOver={() => setHoverRfq(ind)}
									// onMouseOut={() => setHoverRfq(-1)}
									className={classNames(s.td, compress && s.td_compress)}
								>
									<Image
										className={s.eye_icon}
										// src={hoverRfq === ind ? eye_icon_hover : eye_icon}
										src={eye_icon}
										alt="eye_icon"
										width={20}
										height={20}
									/>
								</td>

								{rfq.options.length < 1 && (
									<td className={s.td}>
										<span className={s.noquotes}>You have no quotes yet.</span>
									</td>
								)}

								{rfq.options.map((option, ind) => {
									return (
										<td
											data-id={option.id}
											className={classNames(s.td, compress && s.td_compress)}
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
													<span className={s.item_info_size}>{option.size}</span>
													<span className={s.item_info_price}>
														{option.price ? `$${option.price}` : 'Not price'}
													</span>
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
														onClick={(e) => {
															handleItemClick(e, ind);
															setRfqIdNavigation(option.rfqId);
														}}
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
