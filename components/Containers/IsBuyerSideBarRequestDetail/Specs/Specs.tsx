'use client';
import { useEffect, useState, useRef } from 'react';
import s from './Specs.module.scss';
import { RfqItemGot } from '@/types/services/rfq';
import Image from 'next/image';
import { classNames } from '@/utils/classNames';
import { Api } from '@/services';
import { useAppSelector } from '@/redux/hooks';
import { RfqItemFetch } from '@/types/services/rfq';
import debounce from 'lodash.debounce';
import { categoriesToSubCategories } from '@/utils/categoriesToSubCategories';

import arrow_icon from '@/imgs/arrow.svg';
import close_icon from '@/imgs/close.svg';
import add_img from '@/imgs/plus.svg';
import add_img_purple from '@/imgs/Buyer&Seller/plus.svg';
import remove_icon from '@/imgs/Buyer&Seller/remove.svg';

import { truncateFileNameEnd } from '@/utils/names';

//!!! Notes
//When the endpoint for the update is available, follow these update steps:

//1 For fields with the "string" type inside the data useState, display it as the default value in the input. Create a handler to handle changes in the fields within the data useState and update accordingly.
//2 For fields without the "string" type, simply add the ability to retrieve elements from the data useState. Create the necessary handler.
//3 After changing the data useState, send it to the ready endpoint.
//!!! Notes

interface updateDataInterface {
	subCategoryId: number | null;
	productName: string | null;
	certifications: string | null;
}

interface TypeProps {
	updateData: updateDataInterface;
	setUpdateData: React.Dispatch<React.SetStateAction<any>>;
	data: RfqItemGot | null;
	setData: React.Dispatch<React.SetStateAction<any>>;
}

export const Specs = ({ data, setData, updateData, setUpdateData }: TypeProps) => {
	const api = Api();
	const rfqId = useAppSelector((state) => state.sideBarRequestDetailSlice.rfqId);

	const certificationsInputRef = useRef<HTMLInputElement | null>(null);

	console.log('data', data);
	// //data states
	// const [data, setData] = useState<RfqItemGot | null>(null);
	// //dataUpdate to operate the local changed state.
	// const [updateData, setUpdateData] = useState<updateDataInterface>({
	// 	subCategoryId: data?.subCategoryId || null,
	// 	productName: data?.productName || null,
	// 	certifications: data?.certifications || null,
	// });

	//category
	const [chooseCategory, setChooseCategory] = useState<boolean>(false);
	const [category, setCategory] = useState<any[]>([]);
	const subCategories = categoriesToSubCategories(category);

	const certifications = updateData.certifications ?? data?.certifications;

	const handleUpdateData = async (key: string, value: string | number | null) => {
		setUpdateData((prevState: any) => ({ ...prevState, [key]: value }));
	};

	const handleAddFile = async (
		rfqId: number,
		type: string,
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		try {
			const selectedFile = event.target.files && event.target.files[0];
			if (selectedFile) {
				const response = await api.rfq.updateFiles(rfqId, type, selectedFile);
				setData(response.data);
			}
		} catch (error) {
			console.log('error add document rfq:', error);
		}
	};

	const handleDeleteFile = async (rfqId: number, key: string) => {
		try {
			const response = await api.rfq.deleteFile(rfqId, key);
			setData(response.data);
		} catch (error) {
			console.log('error delete file rfq:', error);
		}
	};

	const handleAddCertification = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key === 'Enter' || event.key === ' ') {
			const updatedCertificationsArray = certifications?.split(' ');
			//replace(/^\s+/, '') for trim() for start
			const el = event.currentTarget.value.trim().replace(/^\s+/, '');

			// If the array exists, work with the existing array.
			if (updatedCertificationsArray) {
				updatedCertificationsArray.push(el);
				const updatedCertifications = updatedCertificationsArray.join(' ');
				setUpdateData((prevState: any) => ({
					...prevState,
					certifications: updatedCertifications,
				}));
				// Clear input after pushing certifications
				if (certificationsInputRef.current) {
					certificationsInputRef.current.value = '';
				}
			} else {
				// Create a new array certifications
				const updatedCertifications = [el];
				setUpdateData((prevState: any) => ({
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
				.filter((cert) => cert !== el)
				.join(' ');

			handleUpdateData('certifications', updatedCertifications || null);
		}
	};

	const getCategory = async () => {
		try {
			const category = await api.category.getCategories();
			setCategory(category);
		} catch (error) {
			console.error('error submit get category RFQ', error);
		}
	};

	useEffect(() => {
		getCategory();
	}, [rfqId]);

	return (
		<div className={s.wrapper}>
			<div className={s.table_wrapper}>
				<h4 className={s.table_header}>General</h4>
				{data && (
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
												{subCategories.find(
													(el) => el.id === updateData.subCategoryId
												)?.name ?? data.subCategoryId}
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
										onChange={(e) => handleUpdateData('quantity', e.target.value)}
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
										onChange={(e) => handleUpdateData('budget', e.target.value)}
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
											certifications?.split(' ').map((el, ind) => {
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
											}}
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

									{/* if not images  */}
									{/* {data.images.length < 1 && <span>Not images</span>} */}
								</td>
							</tr>
							{/* //  */}
						</tbody>
					</table>
				)}

				<div className={s.description}>
					<h3 className={s.description_title}>Description</h3>
					<div className={s.description_body}></div>
				</div>
			</div>
		</div>
	);
};
