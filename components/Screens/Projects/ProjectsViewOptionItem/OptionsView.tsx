'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import s from './OptionsView.module.scss';

import { useAppDispatch } from '@/redux/hooks';
import { setModal, setSample } from '@/redux/slices/modal';
import { setSamples } from '@/redux/slices/modal';
import { setSuccessfulText } from '@/redux/slices/modal';
import { Spinner } from '@/components/UI/Spinner';

import { Api } from '@/services';
import { Option } from '@/types/services/rfq';
import { BackButton } from '@/components/UI/BackButton';
import { CartCreateBody } from '@/types/services/cart';

type TypeProps = {
	idProject: number;
	idOption: number;
};

export const OptionsView = ({ idOption, idProject }: TypeProps) => {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const dispatch = useAppDispatch();
	const api = Api();
	const [options, setOptions] = useState<Option[]>([]);

	const fetchDetOptions = async (projectId: number) => {
		try {
			const response = await api.rfqOption.getOptionsByRfqId(projectId);
			setOptions(response.data);
		} catch (error) {
			console.error('Error fetchDetOptions options:', error);
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
				model: 'option',
				modelId: optionId,
				quantity: optionQuantity,
				price: optionPrice,
			};
			setIsLoading(false);
			const responce = await api.cart.create(data);
			setModal('successful');
			setSuccessfulText('Option added to cart');
		} catch (error) {
			console.error('Error fetchDetOptions options:', error);
		}
	};

	useEffect(() => {
		fetchDetOptions(idOption);
	}, []);

	return (
		<div className={s.wrapper}>
			<div className={s.header}>
				<BackButton href={`/projects/${idProject}/rfq`} />
				<span className={s.header_close}></span>
				<span className={s.header_title}>Compare - Fixed Window</span>
			</div>
			<div className={s.table_container}>
				{isLoading && (
					<div className={s.spinner}>
						<Spinner />
					</div>
				)}

				{options.length > 0 && !isLoading && (
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
