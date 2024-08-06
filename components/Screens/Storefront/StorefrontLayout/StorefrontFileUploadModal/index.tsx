import { FC, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { SellerProductFile } from '@/types/services/sellerProduct';
import { RfqFile } from '@/types/services/rfq';
import { ModalLayout } from '@/components/Features/ModalLayout';
import { Dropzone } from '@/components/UI/Dropzone';
import { Api } from '@/services';

import s from '@/components/Modals/StorefrontAddProduct/Form.module.scss';

interface Props {
	onHide: () => void;
	productId: number;
	type: SellerProductFile;
	setFiles: (files: RfqFile[]) => void;
}

type FormValues = {
	files: File[];
};

export const StorefrontProductFileUploadModal: FC<Props> = ({
	onHide,
	productId,
	type,
	setFiles,
}) => {
	const api = Api();

	const [uploadFiles, setUploadFiles] = useState<File[]>([]);

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
		setValue('files', uploadFiles, { shouldValidate: true });
	}, [uploadFiles]);

	const onSubmit: SubmitHandler<FormValues> = async (values) => {
		try {
			if (!productId) {
				return;
			}

			const response = await api.productSeller.uploadFiles({
				productId,
				type,
				files: values.files,
			});

			if (type === 'cutsheets') {
				setFiles(response.cutsheets);
			}

			if (type === 'certifications') {
				setFiles(response.certifications);
			}

			if (type === 'manuals') {
				setFiles(response.manuals);
			}

			onHide();
		} catch (e) {
			console.log('Error with upload product images', e);
		}
	};

	const modalTitle =
		type === 'cutsheets'
			? 'Cutsheets'
			: type === 'manuals'
			  ? 'Installation Manuals'
			  : type === 'certifications'
			    ? 'Certification Documents'
			    : '';

	return (
		<ModalLayout title={`Upload ${modalTitle}`} onHide={onHide}>
			<form className={s.form} onSubmit={handleSubmit(onSubmit)}>
				<div className={s.form_row}>
					<Dropzone
						label="Drag your files"
						size="l"
						iconType={2}
						isFileListSeparate={true}
						maxSize={20000000}
						maxFiles={5}
						multiple={true}
						files={uploadFiles}
						setFiles={setUploadFiles}
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
