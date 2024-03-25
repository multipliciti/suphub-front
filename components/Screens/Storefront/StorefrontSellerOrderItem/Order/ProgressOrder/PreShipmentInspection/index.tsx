'use client';
import Image from 'next/image';
import { ChangeEvent, useState } from 'react';

import { classNames } from '@/utils/classNames';
import { useAppDispatch } from '@/redux/hooks';
import { setPhotoShow } from '@/redux/slices/Order/order';
import { setModal } from '@/redux/slices/modal';
import { Api } from '@/services';
import { formatDateString } from '@/utils/formatDateString';
import s from './PreShipmentInspection.module.scss';
import pdf_upload_icon from '@/imgs/Buyer&Seller/pdf_upload.svg';
import plus_icon from '@/imgs/Buyer&Seller/plus.svg';
import remove_icon from '@/imgs/Buyer&Seller/remove.svg';
import done_icon from '@/imgs/Buyer&Seller/done.svg';
import { OrderInterface } from '@/types/services/orders';

interface PropsType {
	date: string;
	activeDisplay: number[];
	orderId: number;
	order: OrderInterface;
	index: number;
	setRerenderProgress: any;
	activeStep: number;
	isSubmitted: boolean;
}

interface formDataType {
	amount: string;
	files: File[];
	photos: File[];
	type: string;
	estDate: string;
}

export const PreShipmentInspection = ({
	date,
	activeDisplay,
	index,
	orderId,
	order,
	activeStep,
	setRerenderProgress,
	isSubmitted,
}: PropsType) => {
	const dispatch = useAppDispatch();
	const api = Api();
	const [formData, setFormData] = useState<formDataType>({
		files: [],
		photos: [],
		type: '',
		amount: '',
		estDate: '',
	});

	// for local rerenderind
	const [approved, setApproved] = useState<boolean>(false);

	const handleDateChange = (event: any) => {
		const inputValue = event.target.value;
		const sanitizedValue = inputValue.replace(/\D/g, '');
		let formattedValue = '';

		// Format the value as MM/DD/YYYY
		if (sanitizedValue.length <= 2) {
			formattedValue = sanitizedValue;
		} else if (sanitizedValue.length <= 4) {
			formattedValue = `${sanitizedValue.slice(0, 2)}/${sanitizedValue.slice(2)}`;
		} else {
			formattedValue = `${sanitizedValue.slice(0, 2)}/${sanitizedValue.slice(
				2,
				4
			)}/${sanitizedValue.slice(4, 8)}`;
		}

		setFormData((prevData) => ({ ...prevData, estDate: formattedValue }));
	};

	function convertDateFormat(inputDate: string) {
		// Split the input date string into its components
		const [month, day, year] = inputDate.split('/');

		// Create a new Date object using the components (Note: months are zero-based in JavaScript)
		const date = new Date(+year, +month - 1, +day);

		// Format the date components into the desired format
		const formattedDate = `${date.getFullYear()}-${padZero(
			date.getMonth() + 1
		)}-${padZero(date.getDate())} ${padZero(date.getHours())}:${padZero(
			date.getMinutes()
		)}:${padZero(date.getSeconds())}.${date.getMilliseconds()}`;

		return formattedDate;
	}

	// Helper function to pad single-digit numbers with leading zeros
	function padZero(num: number) {
		return num.toString().padStart(2, '0');
	}

	// add photo
	const handleAddPhoto = (event: ChangeEvent<HTMLInputElement>) => {
		const selectedFile = event.target.files && event.target.files[0];

		if (selectedFile) {
			const isFileAlreadyAdded = formData.photos.some(
				(photo) => photo.name === selectedFile.name
			);

			if (!isFileAlreadyAdded) {
				setFormData((prevData) => ({
					...prevData,
					photos: [...prevData.photos, selectedFile],
				}));
			}
		}
	};

	// remove photo
	const handleRemovePhoto = (indexToRemove: number) => {
		setFormData((prevData) => ({
			...prevData,
			photos: prevData.photos.filter((photo, index) => index !== indexToRemove),
		}));
	};

	// add file
	const handleAddFile = (event: ChangeEvent<HTMLInputElement>) => {
		const selectedFile = event.target.files && event.target.files[0];

		if (selectedFile) {
			setFormData((prevData) => ({
				...prevData,
				files: [...prevData?.files, selectedFile],
			}));
		}
	};

	const handleAddInputValue = (event: ChangeEvent<HTMLInputElement>) => {
		setFormData((prevData) => ({ ...prevData, amount: event.target.value }));
	};

	const handleAddTypes = (type: string) => {
		if (isSubmitted) return;
		setFormData((prevData) => ({ ...prevData, type }));
	};

	const postOrdeDelivery = async (data: formDataType) => {
		const formDataSend = new FormData();
		formDataSend.append('orderId', orderId.toString());
		formDataSend.append('amount', data.amount.toString());
		formDataSend.append('type', data.type);
		formDataSend.append('estDate', convertDateFormat(data.estDate));
		try {
			await api.sellerOrder.orderDelivery(formDataSend);
			setApproved(true);
			setRerenderProgress((prev: boolean) => !prev);
		} catch (error) {
			console.error('postOrdeDelivery error:', error);
		}
	};

	const optionsArr = [
		{ id: 1, title: 'Air', value: 'air' },
		{ id: 2, title: 'Ocean', value: 'ocean' },
		{ id: 3, title: 'Truck', value: 'truck' },
	];

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
				{activeStep < 5 && (
					<>
						<span className={s.data}>{formatDateString(date)}</span>
						<form className={s.form}>
							{/* choice type */}
							<div className={s.form_chapter}>
								<div className={s.block}>
									<h5 className={s.title}>Freight type</h5>
								</div>
								<div className={classNames(s.block, s.options)}>
									{optionsArr.map((option, index) => {
										return (
											<span
												onClick={() => handleAddTypes(option.value)}
												key={index}
												className={classNames(
													classNames(
														s.options_type,
														formData.type === option.value && s.options_type_active
													)
												)}
											>
												<p>{option.title}</p>
												<span
													className={classNames(
														s.options_checkbox,
														formData.type === option.value &&
															s.options_checkbox_active
													)}
												>
													<Image
														src={done_icon}
														alt="done_icon"
														width={14}
														height={12}
													/>
												</span>
											</span>
										);
									})}
								</div>
							</div>
							{/* Estimated delivery date */}
							<div className={s.form_chapter}>
								<div className={s.block}>
									<h5 className={s.title}>Estimated delivery date</h5>
								</div>
								<div className={s.block}>
									<input
										onChange={handleDateChange}
										placeholder="MM/DD/YYYY"
										className={s.input_amount}
										value={formData.estDate}
										disabled={isSubmitted}
									/>
								</div>
							</div>
							{/* input amount */}
							<div className={s.form_chapter}>
								<div className={s.block}>
									<h5 className={s.title}>Shipment invoice amount</h5>
									<p className={s.subtitle}>
										If invoice included shipment, please skip
									</p>
								</div>
								<div className={s.block}>
									<input
										onChange={handleAddInputValue}
										placeholder="Amount"
										className={s.input_amount}
										type="number"
										disabled={isSubmitted}
									/>
								</div>
							</div>
							{/* pdf */}
							<div className={s.form_chapter}>
								<div className={s.block}>
									<h5 className={s.title}>Upload documents</h5>
									<p className={s.subtitle}>
										Bill of lading or other freight document
									</p>
								</div>
								<div className={classNames(s.block, s.pdf)}>
									<div className={s.pdf_files}>
										{formData.files.length > 0 && (
											<>
												{formData.files.map((el: File, ind) => {
													return (
														<span key={ind} className={s.pdf_files_item}>
															<span className={s.pdf_title}>{el.name}</span>
															<span className={s.pdf_size}>
																{(el.size / (1024 * 1024)).toFixed(3)} Mb
															</span>
														</span>
													);
												})}
											</>
										)}
									</div>

									<label htmlFor="pdf" className={s.pdf_upload}>
										<Image
											src={pdf_upload_icon}
											alt="pdf_upload_icon"
											width={20}
											height={20}
										/>
										<input
											onChange={handleAddFile}
											accept=".txt, .pdf"
											id="pdf"
											className={s.pdf_input}
											type="file"
											disabled={isSubmitted}
										/>
										<span className={s.pdf_upload_text}>Upload files</span>
									</label>
								</div>
							</div>
							{/* Images */}
							<div className={s.form_chapter}>
								<div className={s.block}>
									<h5 className={s.title}>Upload images</h5>
								</div>
								<div className={classNames(s.block, s.photo)}>
									<label className={s.photo_add} htmlFor="photo">
										<input
											onChange={handleAddPhoto}
											className={s.photo_input}
											accept="image/*"
											id="photo"
											type="file"
											disabled={isSubmitted}
										/>
										<Image src={plus_icon} alt="plus_icon" width={24} height={24} />
									</label>

									{formData.photos?.map((el, ind) => {
										return (
											<span key={ind} className={s.photo_wrapper}>
												<span
													onClick={() => handleRemovePhoto(ind)}
													className={s.photo_remove}
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
													className={s.photo_img}
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

							<div className={s.buttons}>
								<button
									onClick={() => {
										postOrdeDelivery(formData);
										setApproved(!approved);
									}}
									disabled={isSubmitted}
									className={s.send}
								>
									Send for approval
								</button>
							</div>
						</form>
					</>
				)}
				{approved ||
					(activeStep >= 5 && order?.delivery && (
						<>
							<span className={s.data}>{formatDateString(date)}</span>
							<form className={s.form}>
								{/* choice type */}
								<div className={s.form_chapter}>
									<div className={s.block}>
										<h5 className={s.title}>Freight type</h5>
									</div>
									<div className={classNames(s.block, s.options)}>
										{optionsArr.map((option, index) => {
											return (
												<span
													key={index}
													className={classNames(
														classNames(
															s.options_type,
															order?.delivery?.type === option.value &&
																s.options_type_active
														)
													)}
												>
													<p>{option.title}</p>
													<span
														className={classNames(
															s.options_checkbox,
															order?.delivery?.type === option.value &&
																s.options_checkbox_active
														)}
													>
														<Image
															src={done_icon}
															alt="done_icon"
															width={14}
															height={12}
														/>
													</span>
												</span>
											);
										})}
									</div>
								</div>
								{/* Estimated delivery date */}
								<div className={s.form_chapter}>
									<div className={s.block}>
										<h5 className={s.title}>Estimated delivery date</h5>
									</div>
									<div className={s.block}>
										<input
											className={s.input_amount}
											value={formatDateString(order.delivery.estDate)}
											disabled
										/>
									</div>
								</div>
								{/* input amount */}
								<div className={s.form_chapter}>
									<div className={s.block}>
										<h5 className={s.title}>Shipment invoice amount</h5>
										<p className={s.subtitle}>
											If invoice included shipment, please skip
										</p>
									</div>
									<div className={s.block}>
										<input
											className={s.input_amount}
											value={order.delivery.amount}
											type="number"
											disabled
										/>
									</div>
								</div>
								{/* pdf */}
								<div className={s.form_chapter}>
									<div className={s.block}>
										<h5 className={s.title}>Upload documents</h5>
										<p className={s.subtitle}>
											Bill of lading or other freight document
										</p>
									</div>
									<div className={classNames(s.block, s.pdf)}>
										<div className={s.pdf_files}>
											{formData.files.length > 0 && (
												<>
													{formData.files.map((el: File, ind) => {
														return (
															<span key={ind} className={s.pdf_files_item}>
																<span className={s.pdf_title}>{el.name}</span>
																<span className={s.pdf_size}>
																	{(el.size / (1024 * 1024)).toFixed(3)} Mb
																</span>
															</span>
														);
													})}
												</>
											)}
										</div>

										<label htmlFor="pdf" className={s.pdf_upload}>
											<Image
												src={pdf_upload_icon}
												alt="pdf_upload_icon"
												width={20}
												height={20}
											/>
											<input
												accept=".txt, .pdf"
												id="pdf"
												className={s.pdf_input}
												type="file"
												disabled
											/>
											<span className={s.pdf_upload_text}>Upload files</span>
										</label>
									</div>
								</div>
								{/* Images */}
								<div className={s.form_chapter}>
									<div className={s.block}>
										<h5 className={s.title}>Upload images</h5>
									</div>
									<div className={classNames(s.block, s.photo)}>
										<label className={s.photo_add} htmlFor="photo">
											<input
												className={s.photo_input}
												accept="image/*"
												id="photo"
												type="file"
												disabled
											/>
											<Image
												src={plus_icon}
												alt="plus_icon"
												width={24}
												height={24}
											/>
										</label>

										{formData.photos?.map((el, ind) => {
											return (
												<span key={ind} className={s.photo_wrapper}>
													<span
														onClick={() => handleRemovePhoto(ind)}
														className={s.photo_remove}
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
														className={s.photo_img}
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

								<div className={s.buttons}>
									<button disabled className={s.send}>
										Sent for approval
									</button>
								</div>
							</form>
						</>
					))}
			</div>
		</>
	);
};
