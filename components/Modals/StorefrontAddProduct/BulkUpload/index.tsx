import Image from 'next/image';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { StorefrontAddProductModalLayout } from '@/components/Modals/StorefrontAddProduct/layout';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { setStatus } from '@/redux/slices/storefront/storefrontProducts';
import { categoryService } from '@/services/categoryApi';
import { Dropzone } from '@/components/UI/Dropzone';
import { setModal } from '@/redux/slices/modal';
import { Button } from '@/components/UI/Button';
import { Select } from '@/components/UI/Select';
import { Api } from '@/services';

import s from '../Form.module.scss';

import downloadIcon from '@/imgs/Buyer&Seller/download.svg';
import warningIcon from '@/imgs/Buyer&Seller/warning.svg';

type FormValues = {
	subcategory: string;
	file: File;
};

export const SellerProductBulkUpload = () => {
	const api = Api();
	const dispatch = useAppDispatch();

	const categories = useAppSelector((state) => state.storefrontSlice.categories);

	const [subcategory, setSubcategory] = useState<string[]>([]);
	const [files, setFiles] = useState<File[]>([]);

	const [successMessage, setSuccessMessage] = useState('');
	const [isError, setIsError] = useState(false);

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
		setValue('subcategory', subcategory[0], { shouldValidate: true });
	}, [subcategory]);

	useEffect(() => {
		setValue('file', files[0], { shouldValidate: true });
	}, [files]);

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

			const response = await api.productSeller.bulkUploadCsv(values.file);

			if (!response.error) {
				setSuccessMessage(response.message);
			}
		} catch (e) {
			setIsError(true);
		}
	};

	const handleRetry = () => {
		setFiles([]);
		setIsError(false);
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
			const response =
				await api.productSeller.downloadBulkUploadSampleFile(subCategoryId);

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
		<StorefrontAddProductModalLayout title="Bulk upload" close={hideModal}>
			{isError && (
				<div className={s.error_message}>
					<div className={s.error_message_image}>
						<Image src={warningIcon} alt={'warning_icon'} width={40} height={40} />
					</div>
					<div className={s.error_message_text}>
						<h2>We&apos;re sorry</h2>
						<p>Please upload the correct format of the file</p>
					</div>
					<button className={s.error_message_button} onClick={handleRetry}>
						Retry
					</button>
				</div>
			)}

			{!isError && (
				<form className={s.form} onSubmit={handleSubmit(onSubmit)}>
					<div className={s.form_row}>
						<span>Subcategory</span>

						<Select
							title="Choose Subcategory"
							isMulti={false}
							options={
								categories ? categoryService.getSubcategories(categories) : []
							}
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
		</StorefrontAddProductModalLayout>
	);
};
