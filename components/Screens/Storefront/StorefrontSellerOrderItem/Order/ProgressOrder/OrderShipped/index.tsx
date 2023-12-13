'use client';
import Image from 'next/image';
import { ChangeEvent, useState } from 'react';

import { classNames } from '@/utils/classNames';
import s from './OrderShipped.module.scss';
import { Api } from '@/services';
import { truncateFileName } from '@/utils/names';
import pdf_upload_2 from '@/imgs/Buyer&Seller/pdf_upload_2.svg';
import close_icon from '@/imgs/close.svg';
import { formatDateString } from '@/utils/formatDateString';

interface PropsType {
	date: string;
	preparingForShipmentDate: string;
	activeDisplay: number[];
	index: number;
	deliveryId: number | null;
	orderId: number;
}

interface formDataType {
	carrier: string;
	traking: string;
	file: File | null;
}

export const OrderShipped = ({
	date,
	preparingForShipmentDate,
	activeDisplay,
	index,
	deliveryId,
	orderId,
}: PropsType) => {
	const api = Api();
	const [formData, setFormData] = useState<formDataType>({
		carrier: '',
		traking: '',
		file: null,
	});

	const fileName = formData?.file?.name ?? '';

	// Function to handle changes in text fields
	const handleAddInputValue = (e: ChangeEvent<HTMLInputElement>) => {
		const { id, value } = e.target;

		// Check if the property with the given identifier exists in the form
		if (id in formData) {
			// Update the form state by copying the previous state and updating only the required property
			setFormData((prevData) => ({
				...prevData,
				[id]: value,
			}));
		}
	};

	// add file
	const handleAddFile = (event: ChangeEvent<HTMLInputElement>) => {
		const selectedFile = event.target.files && event.target.files[0];

		if (selectedFile) {
			setFormData((prevData) => ({
				...prevData,
				file: selectedFile,
			}));
		}
	};

	//remove file
	const handleRemoveFile = () => {
		setFormData((prevData) => ({
			...prevData,
			file: null,
		}));
	};

	const fetchDeliveryTracking = async () => {
		const formDataSend = new FormData();
		formDataSend.append('id', String(deliveryId));
		formDataSend.append('carrier', formData.carrier);
		formDataSend.append('trackingNumber', formData.traking);
		if (formData.file !== null) {
			formDataSend.append('bill', formData.file);
		}
		try {
			await api.sellerOrder.orderDeliveryAddtracking(formDataSend);
			await api.sellerOrder.changeStatus({ id: orderId, status: 'delivered' });
		} catch (error) {
			console.error('changeStatusPreShipment error:', error);
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
				<div className={s.info}>
					{formatDateString(preparingForShipmentDate) && (
						<span className={s.info_data}>
							{formatDateString(preparingForShipmentDate)}
						</span>
					)}
					<span className={s.info_title}>Preparing for shipment</span>
				</div>

				<div className={s.form}>
					<p className={s.form_title}>
						Add carrier, tracking number and bill of lading
					</p>

					<input
						onChange={handleAddInputValue}
						id="carrier"
						placeholder="Enter Carrier"
						className={s.form_input}
						type="text"
					/>

					<div className={s.form_inputs}>
						<input
							onChange={handleAddInputValue}
							id="traking"
							placeholder="Add tracking number"
							className={s.form_input}
							type="number"
						/>
						{/* if not have file */}
						{!formData.file && (
							<label className={s.file} htmlFor="file">
								<Image src={pdf_upload_2} alt="pdf_upload" width={20} height={20} />
								<input
									onChange={handleAddFile}
									id="file"
									className={s.file_input}
									type="file"
									accept=".pdf, .txt"
								/>
								<p className={s.file_title}>Upload bill of lading</p>
							</label>
						)}

						{/* {if have file} */}
						{formData?.file && (
							<div className={s.file_have}>
								<p className={s.file_have_title}>{truncateFileName(fileName, 40)}</p>
								<Image
									onClick={() => handleRemoveFile()}
									className={s.file_have_close}
									src={close_icon}
									alt="close_icon"
									width={15}
									height={15}
								/>
							</div>
						)}
					</div>
					<button
						onClick={() => {
							fetchDeliveryTracking();
						}}
						className={classNames(s.btn, formData.carrier && s.btn_active)}
					>
						Complete shipment
					</button>
				</div>
			</div>
		</>
	);
};
