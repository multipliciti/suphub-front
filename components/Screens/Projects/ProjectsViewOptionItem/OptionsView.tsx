'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import s from './OptionsView.module.scss';

import { useAppDispatch } from '@/redux/hooks';
import { setModal, setProjectId } from '@/redux/slices/modal';
import { setSamples } from '@/redux/slices/modal';
import { Spinner } from '@/components/UI/Spinner';

import { Api } from '@/services';
import { Option } from '@/types/services/rfq';
import { BackButton } from '@/components/UI/BackButton';
import { CartCreateBody } from '@/types/services/cart';

import error_icon from '@/imgs/Buyer&Seller/process_error.svg';
import success_icon from '@/imgs/ResetPassword/success.svg';

type TypeProps = {
	idProject: number;
	idOption: number;
	rfqName: string;
};

export const OptionsView = ({ rfqName, idOption, idProject }: TypeProps) => {
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [error, setError] = useState<string>('');
	const [successful, setSuccessful] = useState<string>('');
	const dispatch = useAppDispatch();
	const api = Api();
	const [options, setOptions] = useState<Option[]>([]);

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
				quantity: optionQuantity,
				price: optionPrice,
			};
			setIsLoading(false);
			await api.cart.create(data);
			setSuccessful('Option added to cart');
		} catch (error: any) {
			setError(error.response?.data.message || 'Unknown error occurred');
			console.error('Error api.cart.create options:', error);
		}
	};

	useEffect(() => {
		dispatch(setProjectId(idProject));
		fetchGetOptions(idOption);
	}, []);

	return (
		<div className={s.wrapper}>
			{isLoading && (
				<div className={s.modal}>
					<Spinner />
				</div>
			)}

			{(error || successful) && (
				<div className={s.modal}>
					<div className={s.content}>
						<Image
							className={s.header_close}
							onClick={() => dispatch(setModal(''))}
							src={successful ? success_icon : error_icon}
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
										return <td key={ind}>{el.product.name}</td>;
									})}
								</tr>
								{/* Unit Price  */}
								<tr>
									<td>Unit Price</td>
									{options.map((el: Option, ind: number) => {
										return (
											<td className={s.price} key={ind}>
												${el.price}
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
												{el.product.moq} {el.product.moq > 1 ? ' Units' : ' Unit'}
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
												{el.product.leadTime}
												{el.product.leadTime > 1 ? ' Weeks' : ' Week'}
											</td>
										);
									})}
								</tr>
								{/* Certification */}
								<tr>
									<td>Certification</td>
									{options.map((el: Option, ind: number) => {
										return <td key={ind}>Undefined</td>;
									})}
								</tr>
								{/* Warranty (years) */}
								<tr>
									<td>Warranty (years)</td>
									{options.map((el: Option, ind: number) => {
										return (
											<td key={ind}>
												{el.product.warranty}
												{el.product.warranty > 1 ? ' years' : ' year'}
											</td>
										);
									})}
								</tr>
								{/* Opening Size */}
								<tr>
									<td>Opening Size</td>
									{options.map((el: Option, ind: number) => {
										return <td key={ind}>{el.size}</td>;
									})}
								</tr>
								{/* Material */}
								<tr>
									<td>Material</td>
									{options.map((el: Option, ind: number) => {
										return <td key={ind}>Undefined</td>;
									})}
								</tr>
								{/* Glazing */}
								<tr>
									<td>Glazing</td>
									{options.map((el: Option, ind: number) => {
										return <td key={ind}>Undefined</td>;
									})}
								</tr>
								{/* U-factor */}
								<tr>
									<td>U-factor</td>
									{options.map((el: Option, ind: number) => {
										return <td key={ind}>Undefined</td>;
									})}
								</tr>
								<tr>
									<td></td>
									{options.map((el: Option, ind: number) => {
										return (
											<td key={ind}>
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
															optionAddToCart(el.id, el.quantity, el.price);
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
					</>
				)}
			</div>
		</div>
	);
};
