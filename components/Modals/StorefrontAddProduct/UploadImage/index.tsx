'use client';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { StorefrontAddProductModalLayout } from '@/components/Modals/StorefrontAddProduct/layout';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { Dropzone } from '@/components/UI/Dropzone';
import { setModal } from '@/redux/slices/modal';
import { Api } from '@/services';

import s from '../Form.module.scss';

type FormValues = {
	files: File[];
};

export const SellerProductUploadImage = () => {
	const api = Api();
	const dispatch = useAppDispatch();

	const productId = useAppSelector(
		(state) => state.storefrontSlice.productIdForUploadImages
	);

	const [files, setFiles] = useState<File[]>([]);

	const { register, handleSubmit, formState, setValue } = useForm<FormValues>({
		defaultValues: {
			files: undefined,
		},
		mode: 'onChange',
	});

	useEffect(() => {
		register('files', { required: true });
	}, [register]);

	useEffect(() => {
		setValue('files', files, { shouldValidate: true });
	}, [files]);

	const onSubmit: SubmitHandler<FormValues> = async (values) => {
		try {
			if (!productId) {
				return;
			}
			await api.productSeller.uploadImages(productId, values.files);

			hideModal();

			setTimeout(() => {
				window.location.reload();
			}, 150);
		} catch (e) {
			console.log('Error with upload product images', e);
		}
	};

	const hideModal = () => {
		dispatch(setModal(''));
	};

	return (
		<StorefrontAddProductModalLayout title="Upload Image" close={hideModal}>
			<form className={s.form} onSubmit={handleSubmit(onSubmit)}>
				<div className={s.form_row}>
					<Dropzone
						label="Drag your photo"
						size="l"
						iconType={2}
						isFileListSeparate={true}
						maxSize={5000000}
						maxFiles={5}
						multiple={true}
						files={files}
						setFiles={setFiles}
						accept={{
							'image/jpeg': [],
							'image/png': [],
						}}
					/>
				</div>

				<div className={s.form_buttons}>
					<button type="button" className={s.form_cancel} onClick={hideModal}>
						Cancel
					</button>

					<button
						type="submit"
						disabled={!formState.isValid}
						className={s.form_create}
					>
						Upload
					</button>
				</div>
			</form>
		</StorefrontAddProductModalLayout>
	);
};
