'use client';
import React from 'react';
import { getImageFilePath, shortenFilename } from '@/utils/defineFileFormatIcon';
import { useAppDispatch } from '@/redux/hooks';
import { RfqFile } from '@/types/services/rfq';
import { setModal, setPreviewFile } from '@/redux/slices/modal';
import Image from 'next/image';
import s from './FilesWidget.module.scss';
//imgs
import downloadIcon from '@/imgs/SideBar/download-02.svg';
import previewIcon from '@/imgs/Modal/eye.svg';

interface FilePropTypes {
	file: RfqFile;
}

interface FilesWidgetPropTypes {
	files: RfqFile[];
}

export default function FilesWidget({ files }: FilesWidgetPropTypes) {
	return (
		<div className={s.wrapper}>
			<div className={s.title}>Certificates ({files.length})</div>
			<div className={s.file_wrapper}>
				{files.map((file, index) => (
					<File key={index} file={file} />
				))}
			</div>
		</div>
	);
}

export const File = ({ file }: FilePropTypes) => {
	const { name, url } = file;
	const imageSrc = getImageFilePath(name);
	const compactFilename = shortenFilename(name, 38);

	const dispatch = useAppDispatch();

	const handlePreview = async (file: RfqFile) => {
		dispatch(setModal('filePreview'));
		dispatch(setPreviewFile(file));
	};

	const handleDownload = async (imageName: string, imageUrl: string) => {
		try {
			const response = await fetch(imageUrl);
			const blob = await response.blob();

			const url = window.URL.createObjectURL(new Blob([blob]));

			const link = document.createElement('a');
			link.href = url;
			link.download = imageName;
			document.body.appendChild(link);

			link.click();

			document.body.removeChild(link);
		} catch (error) {
			console.error('Error downloading image:', error);
		}
	};

	return (
		<div className={s.file}>
			<div className={s.file_image} title="Preview">
				<Image
					src={imageSrc}
					alt="file"
					width={38}
					height={38}
					onClick={() => handlePreview(file)}
				/>
			</div>
			<div className={s.file_right}>
				<div className={s.file_right_top}>
					<div className={s.file_title}>{compactFilename}</div>
					<div className={s.file_button_group}>
						<Image
							className={s.file_button}
							onClick={() => handleDownload(name, url)}
							title="Download"
							alt="download"
							width={18}
							height={18}
							src={downloadIcon}
						/>
						<Image
							className={s.file_button}
							onClick={() => handlePreview(file)}
							title="Preview"
							alt="preview"
							width={18}
							height={18}
							src={previewIcon}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};
