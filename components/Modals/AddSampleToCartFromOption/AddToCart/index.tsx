'use client';
import s from './AddToCart.module.scss';
import { useState, useEffect } from 'react';

import { Api } from '@/services';
import { useAppSelector } from '@/redux/hooks';

import { classNames } from '@/utils/classNames';
import { Sample } from '@/types/products/product';
import { CartCreateBody } from '@/types/services/cart';
import { Spinner } from '@/components/UI/Spinner';

type TypeProps = {
	setActiveWindow: (n: number) => void;
};

export const AddToCart = ({ setActiveWindow }: TypeProps) => {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const samples = useAppSelector((state) => state.modalSlice.samples);
	const projectId = useAppSelector((state) => state.modalSlice.projectId);
	const api = Api();

	const [sampleCount, setSampleCount] = useState<{
		[key: number]: { quantity: number; price: number };
	}>({});

	const handleCountSample = (sampleId: number, quantity: number, price: number) => {
		setSampleCount((prevState) => {
			const newState = { ...prevState };

			if (quantity === 0) {
				delete newState[sampleId];
			} else {
				newState[sampleId] = { quantity, price };
			}

			return newState;
		});
	};

	const addToCartSamples = async () => {
		try {
			setIsLoading(true);
			// Request to get the cart ID
			const response = await api.cart.findByProjectId(projectId);
			const cartId = response.id;

			// Array to store promises for each sample addition
			const sampleAddPromises = [];

			// Iterate through the sampleCount entries
			for (const [sampleId, element] of Object.entries(sampleCount)) {
				try {
					// Create data for adding a sample to the cart
					const data: CartCreateBody = {
						cartId,
						model: 'sample',
						modelId: Number(sampleId),
						quantity: element.quantity,
						price: element.price,
					};

					// Push the promise for the sample addition to the array
					sampleAddPromises.push(api.cart.create(data));
					setIsLoading(false);
				} catch (error) {
					// Log any errors during the sample addition
					console.error('Error adding sample to cart:', error);
				}
			}

			// Wait for all sample addition promises to resolve
			await Promise.all(sampleAddPromises);

			// Set active window to 2 after all samples are successfully added
			setActiveWindow(2);
		} catch (error) {
			// Log any errors during the cart ID retrieval
			console.error('Error retrieving cart ID:', error);
		}
	};

	// const samples: Sample[] = [
	// 	{
	// 		id: 1000,
	// 		name: 'Test 330',
	// 		price: 700,
	// 		quantity: 1,
	// 		images: [
	// 			{
	// 				id: 6,
	// 				url: 'https://suphub-dev.s3.amazonaws.com/product/330/samples/5eef6543-da4e-4605-b7eb-95d2f8de733a.png',
	// 				name: 'fon.png',
	// 			},
	// 		],
	// 		description: 'none',
	// 		productId: 330,
	// 		updatedAt: '2024-02-01T16:53:28.994Z',
	// 		createdAt: '2024-02-01T16:53:28.994Z',
	// 	},
	// 	{
	// 		id: 100444,
	// 		name: 'Test 330 (2)',
	// 		price: 90000,
	// 		quantity: 1,
	// 		images: [
	// 			{
	// 				id: 9,
	// 				url: 'https://suphub-dev.s3.amazonaws.com/product/330/samples/b94cfabc-101b-4d3a-b11d-52c94e23da34.png',
	// 				name: 'fon.png',
	// 			},
	// 		],
	// 		description:
	// 			'nonefkn3rerlwkfnlkwrelgflwkenlkfnewknfkewnlrfnnonefkn3rerlwkfnlkwrelgflwkenlkfnewknfkewnlrfnnonefkn3rerlwkfnlkwrelgflwkenlkfnewknfkewnlrfnnonefkn3rerlwkfnlkwrelgflwkenlkfnewknfkewnlrfnnonefkn3rerlwkfnlkwrelgflwkenlkfnewknfkewnlrfnnonefkn3rerlwkfnlkwrelgflwkenlkfnewknfkewnlrfnnonefkn3rerlwkfnlkwrelgflwkenlkfnewknfkewnlrfnnonefkn3rerlwkfnlkwrelgflwkenlkfnewknfkewnlrfn',
	// 		productId: 330,
	// 		updatedAt: '2024-02-01T18:27:28.251Z',
	// 		createdAt: '2024-02-01T18:27:28.251Z',
	// 	},
	// ];
	return (
		<div className={s.wrapper}>
			<div className={s.header}></div>
			{/* body  */}
			<div className={s.body}>
				{isLoading && (
					<>
						<Spinner />
					</>
				)}

				{!isLoading && (
					<>
						{samples?.map((el: Sample, ind: number) => {
							const sampleId = el.id;
							const quantity = sampleCount[sampleId]?.quantity || 0;

							return (
								<div className={s.sample} key={ind}>
									<div className={s.info}>
										<p className={s.info_title}>{el.name}</p>

										<p className={s.info_price}>
											${el.price}
											<span className={s.unit}>/unit</span>
										</p>

										<div className={s.count}>
											<span
												onClick={() =>
													handleCountSample(sampleId, quantity - 1, el.price)
												}
												className={classNames(
													s.count_minus,
													quantity < 1 && s.count_minus_disable
												)}
											>
												-
											</span>
											<span className={s.count_number}>{quantity}</span>
											<span
												onClick={() =>
													handleCountSample(sampleId, quantity + 1, el.price)
												}
												className={s.count_plus}
											>
												+
											</span>
										</div>
									</div>
									<p className={s.description}>{el.description}</p>
								</div>
							);
						})}
					</>
				)}
			</div>
			{/* button */}
			<button
				onClick={() => addToCartSamples()}
				className={classNames(s.btn, s.btn_active)}
			>
				Add to cart
			</button>
		</div>
	);
};
