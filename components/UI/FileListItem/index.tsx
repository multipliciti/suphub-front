import { FC, useState } from 'react';
import Image from 'next/image';

import s from './FileListItem.module.scss';

import deleteIcon from '@/imgs/Buyer&Seller/delete.svg';
import { getImageFilePath, shortenFilename } from '@/utils/defineFileFormatIcon';

interface Props {
	filename: string;
	onDelete: () => void;
}
export const FileListItem: FC<Props> = ({ filename, onDelete }) => {
	const [isHover, setIsHover] = useState(false);
	const compactFilename = shortenFilename(filename);
	const imageSrc = getImageFilePath(filename);
	return (
		<div
			className={s.wrapper}
			onMouseEnter={() => setIsHover(true)}
			onMouseLeave={() => setIsHover(false)}
			title={filename}
		>
			<div className={s.wrapper_image}>
				<Image
					src={imageSrc}
					alt={'image'}
					height={48}
					style={{ borderRadius: 8 }}
				/>
			</div>

			<div className={s.filename}>{compactFilename}</div>

			{isHover && (
				<div className={s.delete_button} onClick={onDelete}>
					<Image src={deleteIcon} alt="delete_image_icon" width={15} height={15} />
				</div>
			)}
		</div>
	);
};
