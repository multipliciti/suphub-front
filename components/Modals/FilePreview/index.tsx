'use client';
import Image from 'next/image';
import s from './FilePreview.module.scss';

import { useAppDispatch } from '@/redux/hooks';
import { setModal, setPreviewFile } from '@/redux/slices/modal';
import { useAppSelector } from '@/redux/hooks';
import DocViewer, { DocViewerRenderers } from '@cyntler/react-doc-viewer';

import modal_close from '@/imgs/close.svg';

export const FilePreview = () => {
	const dispatch = useAppDispatch();
	const previewFile = useAppSelector((state) => state.modalSlice.previewFile);
	const closeModal = () => {
		dispatch(setModal(''));
		dispatch(setPreviewFile(null));
	};
	return (
		<div className={s.wrapper}>
			<div className={s.header}>
				<div className={s.title}>{previewFile?.name}</div>
				<Image
					className={s.header_close}
					onClick={() => closeModal()}
					src={modal_close}
					alt="modal_close"
					width={20}
					height={20}
				/>
			</div>
			{previewFile && (
				<DocViewer
					documents={[
						{
							uri: previewFile?.url,
							fileType: previewFile.mime,
							fileName: previewFile.name,
						},
					]}
					pluginRenderers={DocViewerRenderers}
					config={{
						header: {
							disableHeader: true,
						},
					}}
				/>
			)}
		</div>
	);
};
