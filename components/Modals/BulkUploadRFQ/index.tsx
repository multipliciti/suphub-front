'use client';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { useAppDispatch } from '@/redux/hooks';
import { categoryService } from '@/services/categoryApi';
import { Select } from '@/components/UI/Select';
import { setModal } from '@/redux/slices/modal';
import { setStatus } from '@/redux/slices/storefront/storefrontProducts';
import { Button } from '@/components/UI/Button';
import { Dropzone } from '@/components/UI/Dropzone';
import { BulkUploadRFQModalLayout } from './layout';
import { CategoryItem } from '@/types/sideBar';
import { Api } from '@/services';

import downloadIcon from '@/imgs/Buyer&Seller/download.svg';
import warningIcon from '@/imgs/Buyer&Seller/warning.svg';
import s from './BulkUploadRFQ.module.scss';

type FormValues = {
	subcategory: string;
	file: File;
};

export const BulkUploadRFQ = () => {
	const api = Api();
	const dispatch = useAppDispatch();

	const { id: projectId } = useParams();

	const [categories, setCategories] = useState<CategoryItem[]>([]);
	const [subCategories, setSubCategories] = useState<string[]>([]);
	const [subcategory, setSubcategory] = useState<string[]>([]);

	const [files, setFiles] = useState<File[]>([]);

	const [successMessage, setSuccessMessage] = useState('');
	const [errorMessage, setErrorMessage] = useState<string>();

	const { register, handleSubmit, formState, setValue } = useForm<FormValues>({
		defaultValues: {
			subcategory: '',
			file: undefined,
		},
		mode: 'onChange',
	});

	useEffect(() => {
		register('subcategory', { required: true });
		register('file', { required: true });
	}, [register]);

	useEffect(() => {
		if (subCategories) {
			setSubcategory([subCategories[0]]);
			setValue('subcategory', subCategories[0], { shouldValidate: true });
		}
	}, [subCategories]);

	useEffect(() => {
		setValue('file', files[0], { shouldValidate: true });
	}, [files]);

	useEffect(() => {
		const fetch = async () => {
			const categories = await api.category.getCategories();
			const subCategories = categoryService.getSubcategories(categories);
			setCategories(categories);
			setSubCategories(subCategories);
		};
		if (!categories.length || !subCategories.length) fetch();
	}, []);

	useEffect(() => {
		if (successMessage) {
			setTimeout(() => {
				hideModal();
				refetchSellerProducts();
			}, 1000);
		}
	}, [successMessage]);

	const onSubmit: SubmitHandler<FormValues> = async (values) => {
		try {
			//TODO IS this check required when uploading???
			if (!categories?.length) {
				throw new Error('Error with no categories');
			}
			const subCategoryId = categoryService.findSubcategoryIdByName(
				categories,
				values.subcategory
			);

			if (!subCategoryId) {
				throw new Error('Error with missing subcategoryId');
			}

			const response = await api.rfq.bulkUploadCsv(values.file);

			if (!response.error) {
				setSuccessMessage(response.message);
			}
		} catch (e: any) {
			if (
				['missing', 'unknown'].includes(e.response.data.message) ||
				e.response.data.message.length > 250
			) {
				setErrorMessage(
					'The provided .csv file is either missing expected columns or contains unexpected columns. Please download our sample file again and ensure the file matches the expected format'
				);
			} else {
				setErrorMessage(e.response.data.message);
			}
		}
	};

	const handleRetry = () => {
		setFiles([]);
		setErrorMessage('');
	};

	const handleDownloadTemplate = async () => {
		if (!categories?.length || !subcategory.length) {
			return;
		}
		const subCategoryId = categoryService.findSubcategoryIdByName(
			categories,
			subcategory[0]
		);

		if (!subCategoryId) {
			return;
		}

		try {
			const requestBody = {
				projectId: parseInt(projectId as string),
				subCategoryId,
			};

			const response = await api.rfq.downloadFileSample(requestBody);

			const data = new Blob([response.data], { type: 'text/csv' });

			const href = window.URL.createObjectURL(data);

			const anchorElement = document.createElement('a');

			anchorElement.href = href;
			anchorElement.download = 'bulk-upload-csv-template';

			document.body.appendChild(anchorElement);
			anchorElement.click();

			document.body.removeChild(anchorElement);
			window.URL.revokeObjectURL(href);
		} catch (e) {}
	};

	const refetchSellerProducts = () => {
		dispatch(setStatus('refetch'));
	};

	const hideModal = () => {
		dispatch(setModal(''));
	};

	return (
		<BulkUploadRFQModalLayout
			title={'Bulk Upload'}
			projectId={projectId}
			close={hideModal}
		>
			{errorMessage && (
				<div className={s.error_message}>
					<div className={s.error_message_image}>
						<Image src={warningIcon} alt={'warning_icon'} width={40} height={40} />
					</div>
					<div className={s.error_message_text}>
						<h2>We&apos;re sorry</h2>
						<p>{errorMessage}</p>
					</div>
					<button className={s.error_message_button} onClick={handleRetry}>
						Retry
					</button>
				</div>
			)}

			{!errorMessage && (
				<form className={s.form} onSubmit={handleSubmit(onSubmit)}>
					<div className={s.form_row}>
						<span>Subcategory</span>
						<Select
							title="Choose Subcategory"
							isMulti={false}
							options={subCategories}
							value={subcategory}
							setValue={setSubcategory}
						/>
					</div>

					<div className={s.form_row}>
						<span>Download CSV Template</span>
						<p>Download CSV file and fill it with your data</p>
						<Button
							disabled={subcategory.length === 0}
							variant="outlined"
							className={s.download_btn}
							onClick={handleDownloadTemplate}
						>
							<Image src={downloadIcon} alt="download_icon" width={14} height={18} />
							<span>Download CSV</span>
						</Button>
					</div>

					<div className={s.form_row}>
						<span>Upload CSV</span>
						<p>Upload CSV to quickly import the product info</p>

						<Dropzone
							label="Drag your .csv file"
							maxSize={5000000}
							maxFiles={1}
							multiple={false}
							files={files}
							disabled={!!successMessage}
							setFiles={setFiles}
							accept={{
								'text/csv': ['.csv'],
							}}
						/>
					</div>

					{successMessage && (
						<div className={s.form_row}>
							<span className={s.success_message}>{successMessage}</span>
						</div>
					)}

					<div className={s.form_buttons}>
						<button type="button" className={s.form_cancel} onClick={hideModal}>
							Cancel
						</button>

						<button
							type="submit"
							className={s.form_create}
							disabled={!formState.isValid}
						>
							Upload
						</button>
					</div>
				</form>
			)}
		</BulkUploadRFQModalLayout>
	);
};
