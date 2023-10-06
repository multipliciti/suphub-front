'use client';
import { ChangeEvent, useState } from 'react';
import s from './Production.module.scss';
import { classNames } from '@/utils/classNames';
import Image from 'next/image';
import plus_icon from '@/imgs/Buyer&Seller/plus.svg';
import remove_icon from '@/imgs/Buyer&Seller/remove.svg';

interface PropsType {
	activeDisplay: number[];
	index: number;
}

export const Production = ({ activeDisplay, index }: PropsType) => {
	const [testShow, setTestShow] = useState<boolean>(false);
	const [message, setMessage] = useState<string>('');
	const [photos, setPhotos] = useState<File[]>([]);

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

	//add text message
	const handleAddMessage = (event: ChangeEvent<HTMLTextAreaElement>) => {
		const value = event.target.value;
		setMessage(value);
	};
	return (
		<div
			className={classNames(
				s.wrapper,
				activeDisplay.includes(index) && s.wrapper_active
			)}
		>
			<div className={s.header}>
				<span className={s.data}>01/05/2023</span>
				<span className={s.title}>Production started</span>
			</div>

			<div className={s.form}>
				<textarea
					onChange={handleAddMessage}
					placeholder="Provide updates"
					className={s.form_message}
					name="message"
					id="message"
				></textarea>

				<div className={s.photo}>
					<label className={s.photo_add} htmlFor="add_photo">
						<input
							onChange={handleAddPhoto}
							className={s.photo_input}
							accept="image/*"
							id="add_photo"
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

				<div className={s.buttons}>
					{!testShow && (
						<>
							<button
								onClick={() => setTestShow(!testShow)}
								className={s.buttons_updates}
							>
								+ Add an update
							</button>
							<button className={s.buttons_production}>Complete production</button>
						</>
					)}
					{testShow && (
						<span className={s.waiting}>Waiting for customer approval</span>
					)}
				</div>
			</div>
		</div>
	);
};
