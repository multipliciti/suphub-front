'use client';
import s from './AddToCart.module.scss';
import { useState } from 'react';

import { Api } from '@/services';
import { useAppSelector } from '@/redux/hooks';

import { classNames } from '@/utils/classNames';
import { Sample } from '@/types/products/product';
import { CartCreateBody } from '@/types/services/cart';
import { Spinner } from '@/components/UI/Spinner';

type TypeProps = {
	setActiveWindow: (n: number) => void;
	setError: (s: string) => void;
};

export const AddToCart = ({ setActiveWindow, setError }: TypeProps) => {
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
		//if has sampleCount
		if (Object.entries(sampleCount).length > 0) {
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
			} catch (error: any) {
				setActiveWindow(3);
				setError(error.response?.data.message || 'Unknown error occurred');
				console.error('Error retrieving cart ID:', error);
			}
		}
	};

	return (
		<div className={s.wrapper}>
			{/* <div className={s.header}></div> */}
			{/* body  */}
			<div className={s.body}>
				{isLoading && (
					<>
						<Spinner />
					</>
				)}

				{!isLoading && (
					<>
						{samples && samples.length < 1 && (
							<div className={s.sample_none}>No samples</div>
						)}
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
