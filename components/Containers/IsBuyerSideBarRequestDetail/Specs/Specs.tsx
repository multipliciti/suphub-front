'use client';
import { useEffect, useState, useRef } from 'react';
import s from './Specs.module.scss';
import { RfqItemGot } from '@/types/services/rfq';
import Image from 'next/image';
import { classNames } from '@/utils/classNames';
import { Api } from '@/services';
import { useAppSelector } from '@/redux/hooks';
import { categoriesToSubCategories } from '@/utils/categoriesToSubCategories';
import { SubCategoryItem } from '@/types/sideBar';

import arrow_icon from '@/imgs/arrow.svg';
import close_icon from '@/imgs/close.svg';
import add_img_purple from '@/imgs/Buyer&Seller/plus.svg';
import remove_icon from '@/imgs/Buyer&Seller/remove.svg';
import { truncateFileNameEnd } from '@/utils/names';

interface TypeProps {
	setIsLoading: (n: boolean) => void;
	subCategories: SubCategoryItem[];
	rfqId: number;
	data: RfqItemGot | null;
	setData: React.Dispatch<React.SetStateAction<any>>;
}

export const Specs = ({
	data,
	setData,
	rfqId,
	subCategories,
	setIsLoading,
}: TypeProps) => {
	//1 For fields with the "string" type inside the data useState, display it as the default value in the input. Create a handler to handle changes in the fields within the data useState and update accordingly.
	//2 For fields without the "string" type, simply add the ability to retrieve elements from the data useState. Create the necessary handler.
	//3 After changing the data useState, send it to the ready endpoint.
	//!!! Notes

	const api = Api();
	const [chooseCategory, setChooseCategory] = useState<boolean>(false);
	const certificationsInputRef = useRef<HTMLInputElement | null>(null);
	const certifications = data?.certifications;

	const handleUpdateData = async (key: string, value: string | number | null) => {
		setData((prevState: any) => ({ ...prevState, [key]: value }));
	};

	const handleAddFile = async (
		rfqId: number,
		type: string,
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		try {
			const selectedFile = event.target.files && event.target.files[0];
			if (selectedFile) {
				setIsLoading(true);
				const response = await api.rfq.updateFiles(rfqId, type, selectedFile);
				setData(response.data);
				setIsLoading(false);
			}
		} catch (error) {
			console.log('error add document handleDeleteFile function:', error);
		}
	};

	const handleDeleteFile = async (rfqId: number, key: string) => {
		try {
			setIsLoading(true);
			const response = await api.rfq.deleteFile(rfqId, key);
			setData(response.data);
			setIsLoading(false);
		} catch (error) {
			console.log('error handleDeleteFile function:', error);
		}
	};

	const handleAddCertification = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key === 'Enter' || event.key === ' ') {
			const updatedCertificationsArray = certifications?.split(' ');
			//replace(/^\s+/, '') for trim() for start
			const el = event.currentTarget.value.trim().replace(/^\s+/, '');

			// If the array exists, work with the existing array.
			if (updatedCertificationsArray && el !== '') {
				updatedCertificationsArray.push(el);
				const updatedCertifications = updatedCertificationsArray.join(' ');
				setData((prevState: any) => ({
					...prevState,
					certifications: updatedCertifications,
				}));
			} else {
				// Create a new array certifications
				const updatedCertifications = [el];
				setData((prevState: any) => ({
					...prevState,
					certifications: updatedCertifications.join(''), // Join without a space
				}));
			}
		}
	};

	//remove certification and return to string type
	const handleRemoveCertification = (el: string) => {
		const updatedCertificationsArray = certifications?.split(' ');

		if (updatedCertificationsArray && certifications) {
			const updatedCertifications = updatedCertificationsArray
				.filter((cert: string) => cert !== el)
				.join(' ');

			handleUpdateData('certifications', updatedCertifications || null);
		}
	};

	return (
		<div className={s.wrapper}>
			<div className={s.table_wrapper}>
				<h4 className={s.table_header}>General</h4>
				{data && (
					<>
						<table className={s.table}>
							<tbody className={s.body}>
								{/* //  */}
								<tr>
									<td>Product name</td>
									<td>
										<input
											id="name"
											className={s.input}
											type="text"
											defaultValue={data.productName}
											onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
												handleUpdateData('productName', e.target.value);
											}}
										/>
									</td>
								</tr>
								{/* //  */}
								<tr>
									<td>Subcategory</td>
									<td>
										<span
											onClick={() => setChooseCategory(!chooseCategory)}
											className={s.subcategory}
										>
											{data && (
												<span className={s.subcategory_title}>
													{
														subCategories.find((el) => el.id === data.subCategoryId)
															?.name
													}
												</span>
											)}
											<Image
												className={classNames(
													s.arrow,
													chooseCategory && s.arrow_active
												)}
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
												{subCategories?.map((subCategory, ind) => {
													return (
														<span
															key={ind}
															onClick={(e) => {
																handleUpdateData('subCategoryId', subCategory.id);
															}}
															className={s.subcategory_item}
														>
															{subCategory.name}
														</span>
													);
												})}
											</span>
										</span>
									</td>
								</tr>
								{/* //  */}
								<tr>
									<td>Quantity(Units)</td>
									<td>
										<input
											id="quantity"
											className={s.input}
											type="number"
											defaultValue={data.quantity}
											onChange={(e) =>
												handleUpdateData('quantity', Number(e.target.value))
											}
										/>
										{/* <span className={s.units}>Units</span> */}
									</td>
								</tr>
								{/* //  */}
								<tr>
									<td>Budget per unit (USD)</td>
									<td>
										<input
											id="budget"
											className={s.input}
											type="number"
											defaultValue={data.budget}
											onChange={(e) =>
												handleUpdateData('budget', Number(e.target.value))
											}
										/>
									</td>
								</tr>
								{/* //  */}
								<tr>
									<td>Required certifications</td>
									<td>
										<div className={s.certifications}>
											{certifications &&
												certifications.split(' ').length > 0 &&
												certifications?.split(' ').map((el: string, ind: number) => {
													return (
														<span className={s.certifications_item} key={ind}>
															{el}
															<Image
																src={close_icon}
																alt="close_icon"
																width={10}
																height={10}
																onClick={() => handleRemoveCertification(el)}
															/>
														</span>
													);
												})}

											<input
												ref={certificationsInputRef}
												onKeyDown={(e) => {
													handleAddCertification(e);
													// Clear input value after handleAddCertification function
													if ((e.target && e.key === 'Enter') || e.key === ' ') {
														(e.target as HTMLInputElement).value = '';
													}
												}}
												id="inputCertification"
												className={s.certifications_add}
												placeholder="add a tag"
												type="text"
											/>
										</div>
									</td>
								</tr>
								{/* //  */}
								<tr>
									<td>Files</td>
									<td>
										<span className={s.documents}>
											{data.documents?.map((el, ind) => {
												return (
													<span key={ind} className={s.documents_link}>
														<a href={el.url} className={s.documents_name}>
															{truncateFileNameEnd(el.name, 50)}
															{/* <span className={s.documents_size}>5.1 Mb</span> */}
														</a>

														<Image
															className={s.documents_delete}
															src={close_icon}
															alt="close_icon"
															width={10}
															height={10}
															onClick={() => handleDeleteFile(rfqId, el.key)}
														/>
													</span>
												);
											})}
											<label htmlFor="document" className={s.documents_add}>
												Add file
												<input
													id="document"
													className={s.documents_add_input}
													type="file"
													accept=".pdf, .txt, .csv, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-powerpoint, application/vnd.openxmlformats-officedocument.presentationml.presentation, application/zip, application/json, application/xml, text/xml"
													multiple
													onChange={(e) => {
														handleAddFile(rfqId, 'documents', e);
													}}
												/>
											</label>
										</span>
									</td>
								</tr>
								{/* //  */}
								<tr>
									<td>Product images</td>
									<td>
										{/* if have images  */}
										<div className={s.images}>
											<label className={s.images_add} htmlFor="addImage">
												<Image
													className={s.images_add_img}
													src={add_img_purple}
													alt="img_add"
													width={24}
													height={24}
												/>
												<input
													accept="image/*"
													id="addImage"
													className={s.images_input}
													type="file"
													onChange={(e) => {
														handleAddFile(rfqId, 'images', e);
													}}
												/>
											</label>

											{data.images?.map((el, ind) => {
												return (
													<span key={ind} className={s.images_img}>
														<span
															className={s.images_delete}
															onClick={() => handleDeleteFile(rfqId, el.key)}
														>
															<Image
																src={remove_icon}
																alt="close_icon"
																width={12}
																height={12}
															/>
														</span>
														<Image
															className={s.documents_delete}
															src={el.url}
															alt="close_icon"
															width={48}
															height={48}
														/>
													</span>
												);
											})}
										</div>
									</td>
								</tr>
								{/* //  */}
							</tbody>
						</table>

						<div className={s.description}>
							<h3 className={s.description_title}>Description</h3>

							<textarea
								className={s.description_textarea}
								defaultValue={data?.additionalComments}
								onChange={(e) =>
									handleUpdateData('additionalComments', e.target.value)
								}
							></textarea>
						</div>
					</>
				)}
			</div>
		</div>
	);
};
