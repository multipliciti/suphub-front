'use client';
import s from './Files.module.scss';
import { Api } from '@/services';
import { RfqFile } from '@/types/services/rfq';
import { getImageFilePath, shortenFilename } from '@/utils/defineFileFormatIcon';
import { useAppDispatch } from '@/redux/hooks';
import { setModal, setPreviewFile } from '@/redux/slices/modal';

import Image from 'next/image';
import search_img from '@/imgs/Marketplace/search.svg';
import downloadIcon from '@/imgs/SideBar/download-02.svg';
import previewIcon from '@/imgs/Modal/eye.svg';
import deleteIcon from '@/imgs/SideBar/trash.svg';

interface DefaultPropTypes {
	rfqId: number;
	setIsLoading: (n: boolean) => void;
	setData: React.Dispatch<React.SetStateAction<any>>;
}

interface MenuPropTypes extends DefaultPropTypes {
	searchTerm: string;
	setSearchTerm: (n: string) => void;
}

interface FilePropTypes extends DefaultPropTypes {
	file: RfqFile;
}

export const Menu = ({
	rfqId,
	setIsLoading,
	setData,
	searchTerm,
	setSearchTerm,
}: MenuPropTypes) => {
	const api = Api();

	const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value);
	};

	const handleAddFile = async (
		rfqId: number,
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		try {
			const files = event.target.files;

			let type = 'documents';

			Array.from(files ?? []).forEach((file) => {
				const fileType = file.type;

				if (fileType.startsWith('image/')) {
					type = 'images';
				}
			});

			const selectedFile = event.target.files && event.target.files[0];
			if (selectedFile) {
				setIsLoading(true);
				const response = await api.rfq.updateFiles(rfqId, type, selectedFile);
				setData(response.data);
				setIsLoading(false);
			}
		} catch (error) {
			console.error('error add document handleDeleteFile function:', error);
		}
	};

	return (
		<div className={s.header}>
			<label className={s.search_label} htmlFor="search">
				<Image src={search_img} alt="search_img" width={20} height={20} />
				<input
					className={s.search_input}
					placeholder="Search file"
					id="search"
					type="text"
					value={searchTerm}
					onChange={handleSearchChange}
				/>
			</label>
			<label htmlFor="fileInput" className={s.btn_upload}>
				Add files
				<input
					id="fileInput"
					className={s.btn_upload_input}
					type="file"
					accept=".pdf, .txt, .csv, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-powerpoint, application/vnd.openxmlformats-officedocument.presentationml.presentation, application/zip, application/json, application/xml, text/xml, image/*"
					multiple
					onChange={(e) => {
						handleAddFile(rfqId, e);
					}}
				/>
			</label>
		</div>
	);
};

export const File = ({ file, rfqId, setIsLoading, setData }: FilePropTypes) => {
	const { name, url, key } = file;
	const imageSrc = getImageFilePath(key);
	const compactFilename = shortenFilename(name, 38);

	const dispatch = useAppDispatch();

	const api = Api();

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

	const handleDeleteFile = async (rfqId: number, key: string) => {
		try {
			setIsLoading(true);
			const response = await api.rfq.deleteFile(rfqId, key);
			setData(response.data);
			setIsLoading(false);
		} catch (error) {
			console.error('error handleDeleteFile function:', error);
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
						<Image
							className={s.file_button}
							onClick={() => handleDeleteFile(rfqId, key)}
							title="Delete"
							alt="delete"
							width={18}
							height={18}
							src={deleteIcon}
						/>
					</div>
				</div>
				<div className={s.file_description} onClick={() => handlePreview(file)}>
					Click to Preview
				</div>
			</div>
		</div>
	);
};
