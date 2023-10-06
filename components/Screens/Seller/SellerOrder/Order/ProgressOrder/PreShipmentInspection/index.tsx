'use client';
import { ChangeEvent, useState } from 'react';
import { classNames } from '@/utils/classNames';
import Image from 'next/image';
import s from './PreShipmentInspection.module.scss';
import pdf_upload_icon from '@/imgs/Buyer&Seller/pdf_upload.svg';
import plus_icon from '@/imgs/Buyer&Seller/plus.svg';
import remove_icon from '@/imgs/Buyer&Seller/remove.svg';

interface PropsType {
	activeDisplay: number[];
	index: number;
}

export const PreShipmentInspection = ({ activeDisplay, index }: PropsType) => {
	const [file, setFile] = useState<File | null>(null);
	const [photos, setPhotos] = useState<File[]>([]);
	//size to mb
	const fileSizeInMegabytes = file ? (file.size / (1024 * 1024)).toFixed(1) : 0;
	const [testShow, setTestShow] = useState<boolean>(false);
	//add photo
	const handleAddPhoto = (event: ChangeEvent<HTMLInputElement>) => {
		const selectedFile = event.target.files && event.target.files[0];

		if (selectedFile) {
			const isFileAlreadyAdded = photos.some(
				(photo) => photo.name === selectedFile.name
			);

			if (!isFileAlreadyAdded) {
				setPhotos((prevPhotos) => [...prevPhotos, selectedFile]);
			}
		}
	};

	//remove photo
	const handleRemovePhoto = (indexToRemove: number) => {
		setPhotos((prevPhotos) =>
			prevPhotos.filter((photo, index) => index !== indexToRemove)
		);
	};

	//add file
	const handleAddFile = (event: ChangeEvent<HTMLInputElement>) => {
		const selectedFile = event.target.files && event.target.files[0];

		if (selectedFile) {
			setFile(selectedFile);
		}
	};

	return (
		<div
			className={classNames(
				s.wrapper,
				activeDisplay.includes(index) && s.wrapper_active
			)}
		>
			<span className={s.data}>01/05/2023</span>

			<form className={s.form}>
				{/* choice type */}
				<div className={s.form_chapter}>
					<div className={s.block}>
						<h5 className={s.title}>Freight type</h5>
					</div>
					<div className={classNames(s.block, s.options)}>
						<span className={s.options_type}>Air</span>
						<span className={s.options_type}>Ocean</span>
						<span className={s.options_type}>Truck</span>
					</div>
				</div>
				{/* input amount */}
				<div className={s.form_chapter}>
					<div className={s.block}>
						<h5 className={s.title}>Shipment invoice amount</h5>
						<p className={s.subtitle}>If invoice included shipment, please skip</p>
					</div>
					<div className={s.block}>
						<input
							placeholder="Placeholder"
							className={s.input_amount}
							type="text"
						/>
					</div>
				</div>
				{/* pdf */}
				<div className={s.form_chapter}>
					<div className={s.block}>
						<h5 className={s.title}>Upload documents</h5>
						<p className={s.subtitle}>Bill of lading or other freight document</p>
					</div>
					<div className={classNames(s.block, s.pdf)}>
						<div className={s.pdf_description}>
							{file && (
								<>
									<span className={s.pdf_title}>{file.name}</span>
									<span className={s.pdf_size}>{fileSizeInMegabytes} Mb</span>
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
							/>
							<Image src={plus_icon} alt="plus_icon" width={24} height={24} />
						</label>

						{photos?.map((el, ind) => {
							return (
								<span className={s.photo_wrapper}>
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
					{testShow && (
						<>
							<div className={s.status}>
								<span className={s.status_paid}>Shipment paid</span>
								<span
									onClick={() => setTestShow(!testShow)}
									className={s.status_approved}
								>
									Milestone approved
								</span>
							</div>
						</>
					)}

					{!testShow && (
						<button onClick={() => setTestShow(!testShow)} className={s.send}>
							Send for approval
						</button>
					)}
				</div>
			</form>
		</div>
	);
};
