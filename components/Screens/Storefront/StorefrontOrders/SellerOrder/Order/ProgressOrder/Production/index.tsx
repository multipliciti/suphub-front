'use client';
import s from './Production.module.scss';
import { ChangeEvent, useState } from 'react';
import { classNames } from '@/utils/classNames';
import { useAppDispatch } from '@/redux/hooks';
import { setPhotoShow } from '@/redux/slices/Order/order';
import { setModal } from '@/redux/slices/modal';
import { useEffect } from 'react';
import { Api } from '@/services';
import { formatDateString } from '@/utils/formatDateString';
import { orderProductionInterface } from '@/types/services/Orders';
import { ProductionItem } from '@/types/services/Orders';
import Image from 'next/image';
import plus_icon from '@/imgs/Buyer&Seller/plus.svg';
import remove_icon from '@/imgs/Buyer&Seller/remove.svg';

interface PropsType {
	activeDisplay: number[];
	orderId: number;
	index: number;
	rerenderProgress: boolean;
	setRerenderProgress: (n: boolean) => void;
	productionArr: ProductionItem[] | null;
}

export const Production = ({
	activeDisplay,
	index,
	rerenderProgress,
	setRerenderProgress,
	productionArr,
	orderId,
}: PropsType) => {
	const dispatch = useAppDispatch();
	const api = Api();
	const [testShow, setTestShow] = useState<boolean>(false);
	const [complete, setComplete] = useState<boolean>(false);
	const [newMessage, setNewMessage] = useState<boolean>(false);
	const [formData, setFormData] = useState<orderProductionInterface | null>({
		images: [],
		orderId,
		updates: '',
	});
	const currentdDate = new Date().toLocaleDateString('en-GB');

	// Add photo
	const handleAddPhoto = (event: ChangeEvent<HTMLInputElement>) => {
		const selectedFile = event.target.files && event.target.files[0];

		if (selectedFile) {
			setFormData((prevData) => {
				if (!prevData) return null;

				return {
					...prevData,
					images: [...prevData.images, selectedFile],
				};
			});
		}
	};

	// Remove photo
	const handleRemovePhoto = (indexToRemove: number) => {
		setFormData((prevData) => {
			if (!prevData) return null;

			const updatedPhotos = prevData.images.filter(
				(_, index) => index !== indexToRemove
			);

			return { ...prevData, images: updatedPhotos };
		});
	};

	// Add text updates
	const handleAddMessage = (event: ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value;
		setFormData((prevData) => {
			if (!prevData) return null;

			return { ...prevData, updates: value };
		});
	};

	const changeStatusPreShipment = async (orderId: number, status: string) => {
		try {
			await api.sellerOrder.changeStatus({
				id: orderId,
				status,
			});
			setComplete(true);
		} catch (error) {
			console.error('changeStatusPreShipment error:', error);
		}
	};

	const AddOrderProduction = async (data: orderProductionInterface) => {
		console.log('Data before FormData:', data);
		const formDataSend = new FormData();
		for (let i = 0; i < data.images.length; i++) {
			formDataSend.append('files', data.images[i]);
		}
		formDataSend.append('orderId', data.orderId.toString());
		formDataSend.append('updates', data.updates);
		console.log('FormData:', formDataSend);

		try {
			await api.sellerOrder.orderProduction(formDataSend);
		} catch (error) {
			console.error('AddOrderProduction error:', error);
		}
	};

	return (
		<>
			<div
				className={classNames(
					s.data_wrapper,
					!activeDisplay.includes(index) && s.data_active
				)}
			>
				<p>01/05/2023</p>
			</div>
			<div
				className={classNames(
					s.wrapper,
					activeDisplay.includes(index) && s.wrapper_active
				)}
			>
				<div className={s.form}>
					<div className={s.form_block}>
						<span className={s.data}>01/05/2023</span>
						<span className={s.title}>Production started</span>
					</div>
					{productionArr?.map((el: ProductionItem, ind: number) => {
						return (
							<div key={ind} className={s.form_block}>
								<span className={s.data}>{formatDateString(el.createdAt)}</span>
								<span className={s.title}>{el.updates}</span>
								<span className={s.imgs}>
									{el.images.length > 0 &&
										el.images.map((img: any, ind: number) => {
											return (
												<Image
													onClick={() => {
														dispatch(setPhotoShow(img.url));
														dispatch(setModal('showPhoto'));
													}}
													className={s.img}
													key={ind}
													src={img.url}
													alt="img"
													width={50}
													height={50}
												/>
											);
										})}
								</span>
							</div>
						);
					})}

					{/* add updates */}
					<div className={classNames(s.form_none, newMessage && s.form_block)}>
						<span className={s.data}>{currentdDate}</span>
						<div className={s.updates_wrapper}>
							<input
								onChange={handleAddMessage}
								placeholder="Provide updates"
								className={s.updates_input}
								name="updates"
								id="updates"
							/>
							<div className={s.updates_photo}>
								<label className={s.updates_photo_add} htmlFor="add_photo">
									<input
										onChange={handleAddPhoto}
										className={s.photo_input}
										accept="image/*"
										id="add_photo"
										type="file"
									/>
									<Image src={plus_icon} alt="plus_icon" width={24} height={24} />
								</label>

								{formData?.images?.map((el, ind) => {
									return (
										<span className={s.updates_photo_wrapper}>
											<span
												onClick={() => handleRemovePhoto(ind)}
												className={s.updates_photo_remove}
											>
												<Image
													src={remove_icon}
													alt="remove_icon"
													width={12}
													height={12}
												/>
											</span>
											<Image
												onClick={() => {
													dispatch(setPhotoShow(URL.createObjectURL(el)));
													dispatch(setModal('showPhoto'));
												}}
												className={s.updates_photo_img}
												key={ind}
												src={URL.createObjectURL(el)}
												alt="Image"
												width={60}
												height={60}
											/>
										</span>
									);
								})}
							</div>
						</div>
					</div>

					{/* sent new updates */}
					{testShow && formData && (
						<div className={classNames(s.form_block)}>
							<div className={s.status}>
								<p className={s.data}>No data</p>
								<p className={classNames(s.status_text, s.status_gray)}>Sent</p>
							</div>

							<div className={s.sent_wrapper}>
								<p className={s.sent_title}> {formData.updates} </p>
								<div className={s.sent_images}>
									{formData?.images.map((el, ind) => (
										<Image
											className={s.updates_photo_img}
											key={ind}
											src={URL.createObjectURL(el)}
											alt="sent_image"
											width={60}
											height={60}
										/>
									))}
								</div>
							</div>
						</div>
					)}

					{/* buttons */}
					<div className={s.buttons}>
						{!testShow && !newMessage && (
							<>
								<button
									onClick={() => {
										setNewMessage(true);
										setTestShow(false);
										setRerenderProgress(!rerenderProgress);
									}}
									className={classNames(
										s.buttons_updates,
										complete && s.buttons_updates_disable
									)}
								>
									+ Add an update
								</button>
								<button
									onClick={() => {
										changeStatusPreShipment(orderId, 'productionCompleted');
									}}
									className={classNames(
										s.buttons_production,
										complete && s.buttons_production_disable
									)}
								>
									Complete production
								</button>
							</>
						)}
						{testShow && !newMessage && (
							<span className={s.waiting}>Waiting for customer approval</span>
						)}
						{/* new updates */}
						{newMessage && !testShow && (
							<>
								<button
									onClick={() => {
										setNewMessage(false);
										setRerenderProgress(!rerenderProgress);
									}}
									className={s.buttons_cansel}
								>
									Cancel
								</button>
								<button
									onClick={() => {
										if (formData) AddOrderProduction(formData);
										setTestShow(true);
										setNewMessage(false);
									}}
									className={s.buttons_send}
								>
									Send
								</button>
							</>
						)}
					</div>
				</div>
			</div>
		</>
	);
};
