'use client';
import React, { ChangeEvent, useEffect, useState } from 'react';
import s from './RequestManuallyRFQ.module.scss';
import Image from 'next/image';
import { setModal } from '@/redux/slices/modal';
import { useAppDispatch } from '@/redux/hooks';
import { validateFormData } from './validation';
import { categoriesToSubCategories } from '@/utils/categoriesToSubCategories';
//imgs
import upload_icon from '@/imgs/Buyer&Seller/upload_icon.svg';
import { classNames } from '@/utils/classNames';
import close_img from '@/imgs/close.svg';
import add_img from '@/imgs/plus.svg';
import arrow_icon from '@/imgs/arrow.svg';
import remove_icon from '@/imgs/Buyer&Seller/remove.svg';
//types
import { RfqItemFetch } from '@/types/services/rfq';
//fetch
import { Api } from '@/services';

// Notes: need to finish adding image and file uploading and sending to the backend. Currently, the 'cover' property is hardcoded as a string before sending. Files are not sent at all. Attempting to send them will result in an error, as the backend is not ready, and there is no handling for them before sending.
export const RequestManuallyRFQ = () => {
	const api = Api();
	const dispatch = useAppDispatch();
	const [formData, setFormData] = useState<RfqItemFetch>({
		productName: '',
		quantity: 0,
		projectId: 2,
	});

	const [chooseCategory, setChooseCategory] = useState<boolean>(false);
	const [category, setCategory] = useState<any[]>([]);
	const subCategories = categoriesToSubCategories(category);

	// set handleKeysubCategoryId
	const handleKeysubCategoryId = (id: number) => {
		setFormData((prevState: RfqItemFetch) => ({
			...prevState,
			subCategoryId: id,
		}));
	};
	//set certifications
	const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
		const id = event.currentTarget.id;
		const value = event.currentTarget.value;

		if (id === 'certifications' && (event.key === 'Enter' || event.key === 'Tab')) {
			if (value.trim() !== '') {
				setFormData((prevState) => {
					const newCertifications = [
						...(prevState.certifications || []),
						value.trim(),
					];
					return {
						...prevState,
						certifications: newCertifications,
					};
				});
				//clear input
				event.currentTarget.value = '';
			}
			event.preventDefault();
		}
	};

	//set inputs value
	const handleValueFormData = (event: ChangeEvent<HTMLInputElement>) => {
		const id = event.target.id;
		const type = event.target.type;
		console.log('type', type);
		const value =
			type === 'number' ? Number(event.target.value) : event.target.value;

		setFormData((prevState) => ({ ...prevState, [id]: value }));
	};

	//remove certification item
	const handleRemoveCertification = (indexToRemove: number) => {
		setFormData((prevState) => ({
			...prevState,
			certifications: (prevState.certifications || []).filter(
				(_, index) => index !== indexToRemove
			),
		}));
	};

	//add photos
	const handleAddPhotos = (event: ChangeEvent<HTMLInputElement>) => {
		const selectedFile = event.target.files && event.target.files[0];

		setFormData((prevState) => {
			if (selectedFile) {
				return {
					...prevState,
					cover: [...(prevState.cover || []), selectedFile],
				};
			}

			return prevState;
		});
	};

	//handleRemovePhoto
	const handleRemovePhoto = (id: number) => {
		setFormData((prevState) => {
			return {
				...prevState,
				cover: prevState.cover?.filter((el, ind) => id !== ind),
			};
		});
	};

	//submit
	const submitData = async (data: RfqItemFetch) => {
		try {
			await api.rfq.createRfqItem(data);
			dispatch(setModal('submitedRFQ'));
		} catch (error) {
			console.error('error submitedRFQ', error);
		}
	};

	const getCategory = async () => {
		try {
			const category = await api.category.getCategories();
			setCategory(category);
		} catch (error) {
			console.error('error submitedRFQ', error);
		}
	};

	useEffect(() => {
		getCategory();
	}, []);
	return (
		<div className={s.wrapper_layout}>
			<div className={s.header_modal}>
				<span className={s.header_title}>Request for Quotation</span>
				<span
					onClick={() => {
						dispatch(setModal(''));
					}}
					className={s.close}
				>
					<Image src={close_img} alt="close" width={20} height={20} />
				</span>
			</div>

			<div className={s.form}>
				<div className={s.inputs}>
					<div className={s.input_wrapper}>
						<p className={s.input_title}>
							Subcategory<span className={s.input_necessarily}>*</span>
						</p>

						<span
							onClick={() => setChooseCategory(!chooseCategory)}
							className={s.subcategory}
						>
							{formData.subCategoryId && (
								<span className={s.subcategory_title}>
									{
										subCategories.filter(
											(el) => el.categoryId === formData.subCategoryId
										)[0].name
									}
								</span>
							)}
							{!formData.subCategoryId && (
								<span className={s.subcategory_title}>Choose subcategory</span>
							)}
							<Image
								className={classNames(s.arrow, chooseCategory && s.arrow_active)}
								src={arrow_icon}
								alt="arrow_icon"
								width={20}
								height={20}
							/>
							<span
								className={classNames(
									s.subcategory_items,
									chooseCategory && s.subcategory_items_active
								)}
							>
								{subCategories?.map((el, ind) => {
									return (
										<span
											onClick={() => handleKeysubCategoryId(el.id)}
											key={ind}
											className={s.subcategory_item}
										>
											{el.name}
										</span>
									);
								})}
							</span>
						</span>
					</div>
					<div className={s.input_wrapper}>
						<p className={s.input_title}>
							Product Name<span className={s.input_necessarily}>*</span>
						</p>
						<input
							onChange={handleValueFormData}
							id="productName"
							placeholder="Enter product name"
							className={s.input}
							type="text"
						/>
					</div>
					<div className={s.input_wrapper}>
						<p className={s.input_title}>
							Quantity<span className={s.input_necessarily}>*</span>
						</p>
						<input
							onChange={handleValueFormData}
							id="quantity"
							placeholder="Enter quantity"
							className={s.input}
							type="number"
						/>
					</div>
					<div className={s.input_wrapper}>
						<p className={s.input_title}>Unit Budget (USD)</p>
						<input
							onChange={handleValueFormData}
							id="budget"
							placeholder="Enter budget"
							className={s.input}
							type="number"
						/>
					</div>
					<div className={s.input_wrapper}>
						<p className={s.input_title}>Size</p>
						<input
							onChange={handleValueFormData}
							id="size"
							placeholder="Enter size"
							className={s.input}
							type="string"
						/>
					</div>
					<div className={s.input_wrapper}>
						<p className={s.input_title}>Required Certifications</p>
						<label className={s.tags_label} htmlFor="certifications">
							{formData.certifications?.map((tag: string, ind: number) => {
								return (
									<span key={ind} className={s.tags_item}>
										<span>{tag}</span>
										<Image
											onClick={() => handleRemoveCertification(ind)}
											className={s.close}
											src={close_img}
											alt="logo"
											width={15}
											height={15}
										/>
									</span>
								);
							})}
							<input
								onKeyDown={handleKeyDown}
								id="certifications"
								placeholder="Tags"
								className={s.tags_input}
								type="text"
							/>
						</label>
					</div>

					<div className={s.input_wrapper}>
						<p className={s.input_title}>Additional Comments</p>
						<textarea
							placeholder="Enter your comment here"
							name=""
							id="comment"
							className={s.comment}
						></textarea>
					</div>
				</div>
				{/* files upload */}
				<div className={s.upload}>
					{/* imgs  */}
					<div className={s.cover}>
						<p className={s.cover_title}>Product Cover Image</p>
						<div className={s.cover_imgs}>
							{/* imgs */}
							<label htmlFor="photo" className={s.cover_add}>
								<input
									onChange={handleAddPhotos}
									accept="image/*"
									id="photo"
									className={s.cover_input}
									type="file"
								/>
								<Image
									className={s.close}
									src={add_img}
									alt="logo"
									width={15}
									height={15}
								/>
							</label>
							{formData.cover?.map((el, ind) => {
								return (
									<span key={ind} className={s.img}>
										<span className={s.img_remove}>
											<Image
												onClick={() => handleRemovePhoto(ind)}
												className={s.close}
												src={remove_icon}
												alt="logo"
												width={10}
												height={10}
											/>
										</span>
										<Image
											className={s.photo}
											src={URL.createObjectURL(el)}
											alt="logo"
											width={64}
											height={64}
										/>
									</span>
								);
							})}
						</div>
					</div>
					{/* files */}
					<div className={s.files}>
						<p className={s.files_title}>Upload files</p>
						<label className={s.files_label} htmlFor="file">
							<Image
								className={s.photo}
								src={upload_icon}
								alt="upload_icon"
								width={40}
								height={40}
							/>
							<input
								size={5000000}
								accept=".pdf, .txt, .csv, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-powerpoint, application/vnd.openxmlformats-officedocument.presentationml.presentation, application/zip, application/json, application/xml, text/xml"
								multiple
								className={s.files_input}
								id="file"
								type="file"
							/>
							<p className={s.description}>
								Drag your .csv file or <span className={s.browse}>browse</span> to
								upload. Max size 5MB.
							</p>
						</label>
					</div>
				</div>
			</div>
			<div className={s.buttons}>
				<button onClick={() => dispatch(setModal(''))} className={s.cancel}>
					Cancel
				</button>
				<button
					className={classNames(
						s.invite,
						validateFormData(formData) && s.invite_active
					)}
					onClick={() => {
						submitData(formData);
					}}
				>
					Invite suppliers to quote
				</button>
			</div>
		</div>
	);
};
