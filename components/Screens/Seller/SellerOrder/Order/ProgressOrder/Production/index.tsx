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
	rerenderProgress: boolean;
	setRerenderProgress: (n: boolean) => void;
}

export const Production = ({
	activeDisplay,
	index,
	rerenderProgress,
	setRerenderProgress,
}: PropsType) => {
	const [testShow, setTestShow] = useState<boolean>(false);
	const [complete, setComplete] = useState<boolean>(false);
	const [newMessage, setNewMessage] = useState<boolean>(false);
	const [formData, setFormData] = useState<{
		data: string;
		message: string;
		photos: File[];
	} | null>({
		data: new Date().toLocaleDateString('en-GB'),
		message: '',
		photos: [],
	});
	const currentdDate = new Date().toLocaleDateString('en-GB');
	console.log('formData', formData);
	// Add photo
	const handleAddPhoto = (event: ChangeEvent<HTMLInputElement>) => {
		const selectedFile = event.target.files && event.target.files[0];

		if (selectedFile) {
			setFormData((prevData) => {
				if (!prevData) return null;

				return {
					...prevData,
					photos: [...prevData.photos, selectedFile],
				};
			});
		}
	};

	// Remove photo
	const handleRemovePhoto = (indexToRemove: number) => {
		setFormData((prevData) => {
			if (!prevData) return null;

			const updatedPhotos = prevData.photos.filter(
				(_, index) => index !== indexToRemove
			);

			return { ...prevData, photos: updatedPhotos };
		});
	};

	// Add text message
	const handleAddMessage = (event: ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value;
		setFormData((prevData) => {
			if (!prevData) return null;

			return { ...prevData, message: value };
		});
	};
	return (
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
				{/* add message */}
				<div className={classNames(s.form_none, newMessage && s.form_block)}>
					<span className={s.data}>{currentdDate}</span>
					<div className={s.message_wrapper}>
						<input
							onChange={handleAddMessage}
							placeholder="Provide updates"
							className={s.message_input}
							name="message"
							id="message"
						/>
						<div className={s.message_photo}>
							<label className={s.message_photo_add} htmlFor="add_photo">
								<input
									onChange={handleAddPhoto}
									className={s.photo_input}
									accept="image/*"
									id="add_photo"
									type="file"
								/>
								<Image src={plus_icon} alt="plus_icon" width={24} height={24} />
							</label>

							{formData?.photos?.map((el, ind) => {
								return (
									<span className={s.message_photo_wrapper}>
										<span
											onClick={() => handleRemovePhoto(ind)}
											className={s.message_photo_remove}
										>
											<Image
												src={remove_icon}
												alt="remove_icon"
												width={12}
												height={12}
											/>
										</span>
										<Image
											className={s.message_photo_img}
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

				{/* sent new message */}
				{testShow && formData && (
					<div className={classNames(s.form_block)}>
						<div className={s.status}>
							<p className={s.data}>{formData.data}</p>
							<p className={classNames(s.status_text, s.status_gray)}>Sent</p>
						</div>

						<div className={s.sent_wrapper}>
							<p className={s.sent_title}> {formData.message} </p>
							<div className={s.sent_photos}>
								{formData?.photos.map((el, ind) => (
									<Image
										className={s.message_photo_img}
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
								onClick={() => setComplete(true)}
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
					{/* new message */}
					{newMessage && !testShow && (
						<>
							<button
								onClick={() => {
									setNewMessage(false);
								}}
								className={s.buttons_cansel}
							>
								Cancel
							</button>
							<button
								onClick={() => {
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
	);
};
