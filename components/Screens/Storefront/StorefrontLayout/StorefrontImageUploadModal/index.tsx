import { FC, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { ModalLayout } from '@/components/Features/ModalLayout';
import { ImageType } from '@/types/products/image';
import { Dropzone } from '@/components/UI/Dropzone';
import { Api } from '@/services';

import s from '@/components/Modals/StorefrontAddProduct/Form.module.scss';

interface Props {
	onHide: () => void;
	productId: number;
	setImages: (images: ImageType[]) => void;
}

type FormValues = {
	files: File[];
};

export const StorefrontProductImageUploadModal: FC<Props> = ({
	onHide,
	productId,
	setImages,
}) => {
	const api = Api();

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
			const response = await api.productSeller.uploadImages({
				productId,
				type: 'images',
				files: values.files,
			});
			setImages(response);
			onHide();
		} catch (e) {
			console.log('Error with upload product images', e);
		}
	};

	return (
		<ModalLayout title="Upload Image" onHide={onHide}>
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
					<button type="button" className={s.form_cancel} onClick={onHide}>
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
		</ModalLayout>
	);
};
