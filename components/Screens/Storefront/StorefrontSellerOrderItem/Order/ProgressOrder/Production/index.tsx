'use client';
import s from './Production.module.scss';
import Image from 'next/image';
import { ChangeEvent, useState, useRef } from 'react';

import { classNames } from '@/utils/classNames';
import { useAppDispatch } from '@/redux/hooks';
import { setPhotoShow } from '@/redux/slices/Order/order';
import { setModal } from '@/redux/slices/modal';
import { Api } from '@/services';
import { formatDateString } from '@/utils/formatDateString';
import { OrderProductionInterface } from '@/types/services/orders';
import { ProductionItem } from '@/types/services/orders';

import plus_icon from '@/imgs/Buyer&Seller/plus.svg';
import remove_icon from '@/imgs/Buyer&Seller/remove.svg';

interface PropsType {
	date: string;
	status: string;
	productionStartedDate: string;
	activeDisplay: number[];
	orderId: number;
	index: number;
	setActiveStep: (n: number) => void;
	activeStep: number;
	rerenderProgress: boolean;
	setRerenderProgress: (n: boolean) => void;
	productionArr: ProductionItem[] | null;
}

export const Production = ({
	date,
	productionStartedDate,
	activeDisplay,
	activeStep,
	status,
	index,
	rerenderProgress,
	setRerenderProgress,
	productionArr,
	setActiveStep,
	orderId,
}: PropsType) => {
	const dispatch = useAppDispatch();
	const api = Api();
	//for send new message. Display btns for new message
	const [newMessage, setNewMessage] = useState<boolean>(false);
	//when has alredy sent new message
	const [sentMessage, setSentMessage] = useState<boolean>(false);
	//disable btns
	const [complete, setComplete] = useState<boolean>(false);
	const [formData, setFormData] = useState<OrderProductionInterface | null>({
		images: [],
		orderId,
		updates: '',
	});
	const [sentMessages, setSentMessages] = useState<OrderProductionInterface[]>([]);
	const inputRef = useRef<HTMLInputElement>(null);
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
			setActiveStep(4);
		} catch (error) {
			console.error('changeStatusPreShipment error:', error);
		}
	};

	const AddOrderProduction = async (data: OrderProductionInterface) => {
		const formDataSend = new FormData();
		for (let i = 0; i < data.images.length; i++) {
			formDataSend.append('files', data.images[i]);
		}
		formDataSend.append('orderId', data.orderId.toString());
		formDataSend.append('updates', data.updates);
		try {
			await api.sellerOrder.orderProduction(formDataSend);
			setNewMessage(false);
			setSentMessages((prevState) => [...prevState, data]);
			setSentMessage(true);

			//reset data for new message
			setFormData({
				images: [],
				orderId,
				updates: '',
			});
			inputRef.current && (inputRef.current.value = '');
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
				<p>{formatDateString(date)}</p>
			</div>
			<div
				className={classNames(
					s.wrapper,
					activeDisplay.includes(index) && s.wrapper_active
				)}
			>
				<div className={s.form}>
					<div className={s.form_block}>
						<span className={s.data}>{formatDateString(productionStartedDate)}</span>
						<span className={s.title}>Production started</span>
					</div>

					{/* render the incoming messages from the backend here */}
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

					{/* If I have sent at least one message, we render the incoming messages from the backend here. */}
					{sentMessages.length > 0 &&
						sentMessage &&
						sentMessages.map((el, ind) => {
							return (
								<div key={ind} className={classNames(s.form_block)}>
									<div className={s.status}>
										<p className={s.data}>{currentdDate}</p>
										<p className={classNames(s.status_text, s.status_gray)}>Sent</p>
									</div>
									<div className={s.sent_wrapper}>
										<p className={s.sent_title}> {el.updates} </p>
										<div className={s.sent_images}>
											{el?.images.map((el, ind) => (
												<Image
													className={s.updates_photo_img}
													key={ind}
													onClick={() => {
														dispatch(setPhotoShow(URL.createObjectURL(el)));
														dispatch(setModal('showPhoto'));
													}}
													src={URL.createObjectURL(el)}
													alt="sent_image"
													width={60}
													height={60}
												/>
											))}
										</div>
									</div>
								</div>
							);
						})}
					{/* add updates */}
					<div className={classNames(s.form_none, newMessage && s.form_block)}>
						<span className={s.data}>{currentdDate}</span>
						<div className={s.updates_wrapper}>
							<input
								ref={inputRef}
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
										<span key={ind} className={s.updates_photo_wrapper}>
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
					<div className={s.buttons}>
						{/* // !!! Old (weremoved approve from buyer) #removeapprove */}
						{/* wait buyer approve  (inProduction status) */}
						{/* {status === 'inProduction' && (
							<span className={s.waiting}>Waiting for customer approval</span>
						)} */}
						{/* //  */}

						{/* // !!! Old (weremoved approve from buyer) #removeapprove */}
						{/* buyer has already approved (productionCompleted status)  */}
						{/* !newMessage && status === 'productionCompleted' && */}
						{!newMessage && status === 'inProduction' && (
							<>
								<button
									onClick={() => {
										setNewMessage(true);
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
										changeStatusPreShipment(orderId, 'preShipment');
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
						{/* new updates */}
						{newMessage && (
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
									}}
									className={classNames(
										s.buttons_send,
										formData && formData.updates.length < 1 && s.buttons_send_invalid
									)}
								>
									Send
								</button>
							</>
						)}
					</div>
				</div>
				{/* if step done  */}
				{activeStep >= 4 && <div className={s.approved}>Production completed</div>}
			</div>
		</>
	);
};
