'use client';
import { ChangeEvent, useEffect, useState } from 'react';
import { classNames } from '@/utils/classNames';
import s from './OrderShipped.module.scss';
import Image from 'next/image';
import pdf_upload_2 from '@/imgs/Buyer&Seller/pdf_upload_2.svg';
import close_icon from '@/imgs/close.svg';

interface PropsType {
	activeDisplay: number[];
	index: number;
}

interface formDataType {
	carrier: string;
	traking: string;
	file: File | null;
}

export const OrderShipped = ({ activeDisplay, index }: PropsType) => {
	const [formData, setFormData] = useState<formDataType>({
		carrier: '',
		traking: '',
		file: null,
	});

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
				<div className={s.info}>
					<span className={s.info_data}>01/05/2023</span>
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
							type="text"
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
						{formData.file && (
							<div className={s.file_have}>
								{/* <Image src={pdf_icon} alt="pdf_icon" width={24} height={24} /> */}
								<p className={s.file_have_title}>{formData.file.name}</p>
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
					<button className={classNames(s.btn, formData.carrier && s.btn_active)}>
						Complete shipment
					</button>
				</div>
			</div>
		</>
	);
};
