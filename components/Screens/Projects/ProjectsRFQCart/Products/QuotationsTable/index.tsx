'use client';
import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { classNames } from '@/utils/classNames';
import s from './QuotationsTable.module.scss';

import { Api } from '@/services';
import { Spinner } from '@/components/UI/Spinner';
import { truncateFileNameEnd } from '@/utils/names';

import { RfqItemGot } from '@/types/services/rfq';

import { CartCreateBody } from '@/types/services/cart';

import more_icon from '@/imgs/Buyer&Seller/more.svg';
import purchase_icon from '@/imgs/Buyer&Seller/purchase.svg';
import ordered_icon from '@/imgs/Buyer&Seller/ordered.svg';
import eye_icon from '@/imgs/Buyer&Seller/eye.svg';
import eye_icon_hover from '@/imgs/Buyer&Seller/eye_hover.svg';
import error_icon from '@/imgs/Buyer&Seller/process_error.svg';
import success_img from '@/imgs/ResetPassword/success.svg';

interface TypeProps {
	projectId: number;
	rfqs: RfqItemGot[];
	compress: boolean;
}

export const QuotationsTable = ({ projectId, rfqs, compress }: TypeProps) => {
	const api = Api();
	const router = useRouter();

	const [isLoading, setIsLoading] = useState<boolean>(false);
	// for local filter after click 'decline option'
	const [idsFilterOptions, setIdsFilterOptions] = useState<number[]>([]);
	//state one option for show status
	const [optionStatusShow, setOptionStatusShow] = useState<boolean>(false);
	const [statusOption, setStatusOption] = useState<{
		id: number;
		seccess: string;
		error: string;
	}>({
		id: -1,
		seccess: '',
		error: '',
	});

	useEffect(() => {
		const timer = setTimeout(() => {
			setOptionStatusShow(false);
		}, 5000);
		return () => clearTimeout(timer);
	}, [statusOption]);

	const [maxOptionsLengthArr, setMaxOptionsLengthArr] = useState<number[]>([]);

	//states for modal 'more'
	const targetElement = useRef<HTMLDivElement | null>(null);
	const [optionMore, setOptionMore] = useState<number>(-1);
	const [topRelativeToParent, setTopRelativeToParent] = useState<number>(0);
	const [leftRelativeToParent, setLeftRelativeToParent] = useState<number>(0);

	const [rfqIdNavigation, setRfqIdNavigation] = useState<number>(0);
	const [rfqNameNavigation, setRfqNameNavigation] = useState<string>('');
	const [hoverRfq, setHoverRfq] = useState<number>(-1);
	// const [lastClickEvent, setLastClickEvent] =
	// 	useState<React.MouseEvent<HTMLImageElement> | null>(null);

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
			setOptionMore(optionMore === index ? -1 : index);
			setTopRelativeToParent(topRelativeToTarget);
			setLeftRelativeToParent(leftRelativeToTarget);
		}
	};

	const tableRef = useRef<HTMLTableElement | null>(null);

	// useEffect(() => {
	// 	const handleScroll = () => {
	// 		if (optionMore !== -1 && targetElement.current) {
	// 			const rect = targetElement.current.getBoundingClientRect();
	// 			const topRelativeToTarget = rect.top + window.scrollY;
	// 			const leftRelativeToTarget = rect.left + window.scrollX;
	// 			console.log('topRelativeToTarget', topRelativeToTarget);
	// 			console.log('leftRelativeToTarget', leftRelativeToTarget);
	// 			setTopRelativeToParent(topRelativeToTarget);
	// 			setLeftRelativeToParent(leftRelativeToTarget);
	// 		}
	// 	};

	// 	const tableElement = tableRef.current;
	// 	if (tableElement) {
	// 		tableElement.addEventListener('scroll', handleScroll);
	// 	}

	// 	return () => {
	// 		if (tableElement) {
	// 			tableElement.removeEventListener('scroll', handleScroll);
	// 		}
	// 	};
	// }, [optionMore, targetElement]);

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

	// useEffect(() => {
	// 	const handleScroll = () => {
	// 		if (optionMore !== -1 && targetElement.current) {
	// 			const rect = targetElement.current.getBoundingClientRect();
	// 			const topRelativeToTarget = rect.top + window.scrollY;
	// 			const leftRelativeToTarget = rect.left + window.scrollX;
	// 			setTopRelativeToParent(topRelativeToTarget);
	// 			setLeftRelativeToParent(leftRelativeToTarget);
	// 		}
	// 	};

	// 	document.addEventListener('scroll', handleScroll);

	// 	return () => {
	// 		document.removeEventListener('scroll', handleScroll);
	// 	};
	// }, [optionMore, targetElement]);

	const declineOptionFunction = async (id: number) => {
		try {
			setIsLoading(true);
			await api.rfqOption.declineOption(id);
			setIdsFilterOptions((prevState) => {
				return [...prevState, id];
			});
			setIsLoading(false);
			setOptionMore(-1);
		} catch (e) {
			console.log('error decline option:', e);
		}
	};

	const optionAddToCart = async (
		optionId: number,
		optionQuantity: number,
		optionPrice: number
	) => {
		try {
			setIsLoading(true);
			// Request to get the cart ID
			const response = await api.cart.findByProjectId(projectId);
			const cartId = response.id;
			//request add to cart option
			const data: CartCreateBody = {
				cartId,
				model: 'rfqOption',
				modelId: optionId,
				quantity: optionQuantity,
				price: optionPrice,
			};
			setIsLoading(false);
			await api.cart.create(data);
			setStatusOption((prevState) => {
				return {
					...prevState,
					id: optionId,
					seccess: 'Option added to cart',
				};
			});
			setOptionStatusShow(true);
		} catch (error: any) {
			setStatusOption((prevState) => {
				return {
					...prevState,
					id: optionId,
					error: error.response?.data.message || 'Unknown error occurred',
				};
			});
			setOptionStatusShow(true);
			console.log('error optionAddToCart', error);
		}
	};

	return (
		<div
			ref={targetElement}
			className={classNames(s.wrapper, compress && s.wrapper_compress)}
		>
			{optionMore !== -1 && (
				<div
					style={{
						top: `${topRelativeToParent + 25}px`,
						left: `${leftRelativeToParent - 180}px`,
					}}
					className={classNames(s.more, optionMore !== -1 && s.more_active)}
				>
					<Link
						href={`/projects/${projectId}/${rfqNameNavigation}/options/${rfqIdNavigation}`}
						className={s.more_item}
					>
						Product details
					</Link>
					<span
						onClick={() => {
							const allOptions = rfqs.flatMap((rfqItem) => rfqItem.options);
							const currentOption = allOptions.find((el) => el.id === optionMore);
							currentOption &&
								optionAddToCart(
									currentOption?.id,
									currentOption?.quantity ?? 1,
									currentOption?.price ?? 0
								);
						}}
						className={s.more_item}
					>
						Add to cart
					</span>
					<span
						onClick={() => declineOptionFunction(optionMore)}
						className={classNames(s.more_item, s.more_decline)}
					>
						Decline offer
					</span>
				</div>
			)}

			<table ref={tableRef} className={s.table}>
				<thead className={s.thead}>
					<tr>
						<th className={s.th}>
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
							<tr
								key={ind}
								className={classNames(s.tr, hoverRfq === rfq.id && s.tr_active)}
							>
								<td
									onMouseOver={() => {
										//if have options can be hover active
										if (rfq.options.length > 0) {
											setHoverRfq(rfq.id);
										}
									}}
									onMouseOut={() => setHoverRfq(-1)}
									onClick={() => {
										if (rfq.options.length > 0) {
											router.push(
												`/projects/${projectId}/${rfq.productName}/options/${rfq.id}`
											);
										}
									}}
									className={s.td}
								>
									<Image
										className={s.eye_icon}
										src={hoverRfq === rfq.id ? eye_icon_hover : eye_icon}
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
								{rfq.options
									.filter((option) => !idsFilterOptions.includes(option.id))
									.map((option, ind) => {
										return (
											<td data-id={option.id} className={s.td} key={ind}>
												{/* processing declining option...  */}
												{isLoading && optionMore === option.id ? (
													<Spinner size={'s'} />
												) : (
													<span className={s.item}>
														<span className={s.info}>
															{optionStatusShow && statusOption.id === option.id ? (
																<span className={s.info_status}>
																	<Image
																		className={s.eye_icon}
																		src={
																			statusOption.seccess ? success_img : error_icon
																		}
																		alt="statis_icon"
																		width={20}
																		height={20}
																	/>
																	<p className={s.info_status_title}>
																		{statusOption.seccess
																			? statusOption.seccess
																			: statusOption.error}
																	</p>
																</span>
															) : (
																<>
																	{/* price and size  */}
																	<span className={s.info_inner}>
																		<span className={s.info_inner_size}>
																			{truncateFileNameEnd(
																				option.product.seller.name,
																				33
																			)}
																		</span>
																		<span className={s.info_inner_price}>
																			{option.price ? `$${option.price}` : '$0'}
																		</span>
																	</span>
																	{/* icons  */}
																	<span className={s.info_icons}>
																		{option.type === 'ordered' && (
																			<Image
																				src={ordered_icon}
																				alt="ordered_icon"
																				width={20}
																				height={20}
																			/>
																		)}
																		{option.type === 'inCart' && (
																			<Image
																				src={purchase_icon}
																				alt="purchase_icon"
																				width={20}
																				height={20}
																			/>
																		)}
																	</span>
																</>
															)}
															<Image
																onClick={(e) => {
																	handleItemClick(e, option.id);
																	setRfqIdNavigation(option.rfqId);
																	setRfqNameNavigation(rfq.productName);
																}}
																className={s.icon_more}
																src={more_icon}
																alt="more_icon"
																width={20}
																height={20}
															/>
														</span>
														{/* active text when hover rfq row (hover icon eye) */}
														<span
															className={classNames(
																s.compare,
																hoverRfq === rfq.id && ind === 0 && s.compare_active
															)}
														>
															Click to compare specs
														</span>
													</span>
												)}
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
