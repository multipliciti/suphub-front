import { FC, useState } from 'react';
import Image from 'next/image';

import s from './FileListItem.module.scss';

import deleteIcon from '@/imgs/Buyer&Seller/delete.svg';
import uploadIcon from '@/imgs/Buyer&Seller/upload_icon.svg';

interface Props {
	filename: string;
	onDelete: () => void;
}
export const FileListItem: FC<Props> = ({ filename, onDelete }) => {
	const [isHover, setIsHover] = useState(false);

	return (
		<div
			className={s.wrapper}
			onMouseEnter={() => setIsHover(true)}
			onMouseLeave={() => setIsHover(false)}
		>
			<Image
				src={uploadIcon}
				alt="image"
				width={24}
				height={24}
				style={{ borderRadius: 8 }}
			/>

			<div className={s.filename}>{filename}</div>

			{isHover && (
				<div className={s.delete_button} onClick={onDelete}>
					<Image src={deleteIcon} alt="delete_image_icon" width={15} height={15} />
				</div>
			)}
		</div>
	);
};
