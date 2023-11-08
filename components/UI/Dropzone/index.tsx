import Image from 'next/image';
import { FC, Dispatch, SetStateAction, useState, useEffect } from 'react';
import { DropzoneOptions, useDropzone } from 'react-dropzone';

import { formatUnitMeasurement } from '@/utils/numbers';
import { classNames } from '@/utils/classNames';

import s from './Dropzone.module.scss';

import uploadIcon from '@/imgs/Buyer&Seller/upload_icon.svg';
import imageIcon from '@/imgs/Buyer&Seller/image.svg';
import fileIcon from '@/imgs/Buyer&Seller/file.svg';
import trashIcon from '@/imgs/Buyer&Seller/trash.svg'


interface Props extends DropzoneOptions {
	files: File[]
	setFiles:  Dispatch<SetStateAction<File[]>>

	label?: string
	size?: 'm' | 'l'
	iconType?: keyof typeof listIcons
	isFileListSeparate?: boolean
	showMaxFilesLabel?: boolean
}

const listIcons = {
	1: uploadIcon,
	2: imageIcon
}

export const Dropzone: FC<Props> = (props) => {
	const {
		label = 'Drag your files',
		size = 'm',
		iconType = 1,
		isFileListSeparate = false,
		showMaxFilesLabel = false,
		maxSize,
		maxFiles,
		files,
		setFiles
	} = props;

	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		...props,
		disabled: !!maxFiles && files.length > maxFiles,
		onDrop: (acceptedFiles, fileRejections) => {

			if (acceptedFiles.length) {
				handleSetLimitedFiles(acceptedFiles);
			}

			if (fileRejections.length) {
				const filteredRejectionFiles = fileRejections
					.filter(item => {
						return item.errors.some(error => error.code === 'too-many-files');
					})
					.map(item => item.file);

				handleSetLimitedFiles(filteredRejectionFiles);
			}
		}
	});

	const handleSetLimitedFiles = (newFiles: File[]) => {

		const duplicateFilteredFiles = newFiles.filter(file => {
			return !files.some(item => item.name === file.name && item.size === file.size);
		})

		if (maxFiles) {
			setFiles(prevState => [
				...prevState,
				...duplicateFilteredFiles.slice(0, maxFiles - files.length)
			]);
		} else {
			setFiles(prevState => [...prevState, ...duplicateFilteredFiles]);
		}
	}

	const handleDeleteFile = (index: number) => {
		setFiles(prevState => prevState.filter((_, i) => i !== index));
	};

	if (files.length > 0 && !isFileListSeparate) {
		return (
			<FileList
				fileList={files}
				onDeleteFile={handleDeleteFile}
			/>
		)
	}

	return (
		<>
			<div
				{...getRootProps({ className: classNames(
					s.wrapper,
					size === 'm' && s.wrapper_m,
					size === 'l' && s.wrapper_l
				)})}
			>
				<input {...getInputProps()} />

				<div className={s.info}>
					<Image
						src={listIcons[iconType]}
						alt='upload_file_icon'
						width={40}
						height={40}
					/>
					{isDragActive
						?	<p>Drop the files here ...</p>
						: <p>{label} or <span>browse</span> to upload.</p>
					}
					{maxSize && <p>Max size {formatUnitMeasurement(maxSize)}.</p>}
					{(showMaxFilesLabel && maxFiles) && <p>Max files {maxFiles}.</p>}
				</div>
			</div>

			{(files.length > 0 && isFileListSeparate) && (
				<FileList
					fileList={files}
					onDeleteFile={handleDeleteFile}
				/>
			)}
		</>
	)
}

interface FileListProps {
	fileList: File[]
	onDeleteFile: (index: number) => void
}

const FileList: FC<FileListProps> = ({ fileList, onDeleteFile }) => {


	return (
		<div className={s.file_list}>
			{fileList.map((file, index) => (
				<FileItem
					key={file.name + file.size + index}
					file={file}
					onDeleteFile={() => onDeleteFile(index)}
				/>
			))}
		</div>
	)
}

const FileItem: FC<{file: File, 	onDeleteFile: () => void}> = ({ file, onDeleteFile }) => {
	const [base64, setBase64] = useState<string | ArrayBuffer | null>(null);

	const isImage = (type: File['type']) => {
		return type.startsWith("image/");
	}

	useEffect(() => {
		if (isImage(file.type)) {
			const reader = new FileReader();

			reader.onload = () => {
				setBase64(reader.result);
			}

			reader.readAsDataURL(file);
		}
	}, []);

	return (
		<div
			className={s.file_item}
		>
			<Image
				src={base64
					? base64
					: fileIcon
				}
				alt="file_icon"
				width={30}
				height={40}
			/>
			<div className={s.file_item_text}>
				<span>{file.name}</span>
				<p>{formatUnitMeasurement(file.size)}</p>
			</div>
			<div
				className={s.file_item_delete}
				onClick={onDeleteFile}
			>
				<Image
					src={trashIcon}
					alt={'trash_icon'}
					width={20}
					height={20}
				/>
			</div>
		</div>
	)
}