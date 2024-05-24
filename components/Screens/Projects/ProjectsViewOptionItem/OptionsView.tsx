'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import s from './OptionsView.module.scss';

import { useAppDispatch } from '@/redux/hooks';
import { setModal, setProjectId, setCartProject } from '@/redux/slices/modal';
import { setSamples } from '@/redux/slices/modal';
import { Spinner } from '@/components/UI/Spinner';
import { getUniqueLabels } from './utils';

import { Api } from '@/services';
import { Option } from '@/types/services/rfq';
import { BackButton } from '@/components/UI/BackButton';
import { CartCreateBody } from '@/types/services/cart';

import error_icon from '@/imgs/Buyer&Seller/process_error.svg';

type TypeProps = {
	idProject: number;
	idOption: number;
	rfqName: string;
};

export const OptionsView = ({ rfqName, idOption, idProject }: TypeProps) => {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [error, setError] = useState<string>('');
	const dispatch = useAppDispatch();
	const api = Api();
	const [options, setOptions] = useState<Option[]>([]);

	const dynamic_attr_arr = options.map((option: Option) => {
		return option.product.dynamic_attr;
	});
	const uniqueLabelsFromDynamicAtrr = getUniqueLabels(dynamic_attr_arr);
	const fetchGetOptions = async (projectId: number) => {
		try {
			const response = await api.rfqOption.getOptionsByRfqId(projectId);
			setOptions(response.data);
			setIsLoading(false);
		} catch (error) {
			console.error('Error fetchGetOptions options:', error);
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
			const response = await api.cart.findByProjectId(idProject);
			const cartId = response.id;
			//request add to cart option
			const data: CartCreateBody = {
				cartId,
				model: 'rfqOption',
				modelId: optionId,
				quantity: optionQuantity ?? 1,
				price: optionPrice ?? 0,
			};
			setIsLoading(false);
			await api.cart.create(data);
			//if success add to cart
			dispatch(setModal('goToCart'));
		} catch (error: any) {
			//handle useless backend error
			if (
				error.response?.data?.message.startsWith(
					'An operation failed because it depends on one or more records that were required but not found.'
				)
			) {
				dispatch(setModal('goToCart'));
			} else {
				setError(error.response?.data.message || 'Unknown error occurred');
				console.error('Error api.cart.create options:', error);
			}
		}
	};

	useEffect(() => {
		dispatch(setProjectId(idProject));
		fetchGetOptions(idOption);
		//Setting the project ID for the card for successful addition to the cart.
		dispatch(setCartProject(idProject));
	}, []);

	return (
		<div className={s.wrapper}>
			{isLoading && (
				<div className={s.modal}>
					<Spinner />
				</div>
			)}

			{error && (
				<div className={s.modal}>
					<div className={s.content}>
						<Image
							className={s.header_close}
							onClick={() => dispatch(setModal(''))}
							src={error_icon}
							alt="error_icon"
							width={100}
							height={100}
						/>
						<h3 className={s.error_title}>{error}</h3>
						<button
							onClick={() => {
								setError('');
							}}
							className={s.error_btn}
						>
							Close
						</button>
					</div>
				</div>
			)}

			<div className={s.header}>
				<BackButton href={`/projects/${idProject}/rfq`} />
				<span className={s.header_close}></span>
				<span className={s.header_title}>
					Compare - {decodeURIComponent(rfqName)}
				</span>
			</div>
			<div className={s.table_container}>
				{options.length > 0 && (
					<>
						{/* table  */}
						<table className={s.table}>
							<thead className={s.thead}>
								<tr>
									<th>Options</th>
									{options.map((el: Option, ind: number) => {
										return <th key={ind}>option {ind + 1}</th>;
									})}
								</tr>
							</thead>
							{/* tbody  */}
							<tbody className={s.tbody}>
								{/* image  */}
								<tr>
									<td>Image</td>
									{options.map((el: Option, ind: number) => {
										return (
											<td key={ind}>
												<Image
													className={s.img}
													src={el.product.images[0]?.url ?? ''}
													alt="product image"
													width={160}
													height={160}
													objectFit="cover"
												/>
											</td>
										);
									})}
								</tr>
								{/* Product name  */}
								<tr>
									<td>Product name</td>
									{options.map((el: Option, ind: number) => {
										return (
											<td
												className={s.product_name}
												onClick={() => {
													router.push(`/marketplace/product/${el.product.id}`);
												}}
												key={ind}
											>
												{el.product.name}
											</td>
										);
									})}
								</tr>
								{/* Unit Price  */}
								<tr>
									<td>Unit Price</td>
									{options.map((el: Option, ind: number) => {
										const minPriceOfPrices =
											el.product.prices.length > 0
												? el.product.prices.reduce(function (prev, current) {
														return prev.value < current.value ? prev : current;
												  })
												: null;
										return (
											<td className={s.price} key={ind}>
												{minPriceOfPrices != null
													? `${minPriceOfPrices.value}`
													: '0'}
												<span>{`/${el.product.unitOfMeasurement}`}</span>
											</td>
										);
									})}
								</tr>
								{/* Manufacturer */}
								<tr>
									<td>Manufacturer</td>
									{options.map((el: Option, ind: number) => {
										return <td key={ind}>{el.product.seller.name ?? 'null'}</td>;
									})}
								</tr>
								{/* MOQ */}
								<tr>
									<td>MOQ</td>
									{options.map((el: Option, ind: number) => {
										return (
											<td key={ind}>
												{el.product.moq} {el.product.unitOfMeasurement}
											</td>
										);
									})}
								</tr>
								{/* Lead time (weeks) */}
								<tr>
									<td>Lead time (weeks)</td>
									{options.map((el: Option, ind: number) => {
										return (
											<td key={ind}>
												{el.product.leadTime > 0 ? el.product.leadTime : 0}
												{el.product.leadTime > 1 ? ' Weeks' : ' Week'}
											</td>
										);
									})}
								</tr>
								{/* all dynamic attr  */}
								{uniqueLabelsFromDynamicAtrr.map(
									(element: string, index: number) => {
										return (
											<tr key={index}>
												<td>{element}</td>
												{options.map((el: Option, ind: number) => {
													const valueAttr = el.product.dynamic_attr.find(
														(attr) => attr.label === element
													)?.value;
													return <td key={ind}>{valueAttr ? valueAttr : '-'}</td>;
												})}
											</tr>
										);
									}
								)}
								<tr>
									<td>U-factor</td>
									{options.map((el: Option, ind: number) => {
										const ufactor = el.product.dynamic_attr.find(
											(attr) => attr.label === 'U-Factor'
										)?.value;
										return <td key={ind}>{ufactor ? ufactor : '-'}</td>;
									})}
								</tr>
							</tbody>
						</table>

						{/* last btns sticky */}

						{/* To be sticky relative to the wrapper, it should have been moved one level
						up in the container hierarchy */}
						<div className={s.table_btns}>
							<table className={s.table}>
								<tbody className={s.tbody}>
									<tr>
										<td className={s.td}></td>
										{options.map((el: Option, ind: number) => {
											return (
												<td className={s.td} key={ind}>
													<div className={s.btns}>
														<button
															onClick={() => {
																dispatch(setModal('addSampleToCartFromOption'));
																dispatch(setSamples(el.product.samples));
															}}
															className={s.btns_sample}
														>
															Order sample
														</button>
														<button
															onClick={() => {
																optionAddToCart(
																	el.id,
																	el.quantity ?? el.product.moq,
																	el.price ?? el.product.unitPrice
																);
															}}
															className={s.btns_cart}
														>
															Add to cart
														</button>
													</div>
												</td>
											);
										})}
									</tr>
								</tbody>
							</table>
						</div>
					</>
				)}
			</div>
		</div>
	);
};
