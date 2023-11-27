import { FC, useState } from 'react';
import Image from 'next/image';

import s from './ImageListItem.module.scss';

import deleteIcon from '@/imgs/Buyer&Seller/delete.svg';

interface Props {
	url: string;
	onDelete: () => void;
}
export const ImageListItem: FC<Props> = ({ url, onDelete }) => {
	const [isHover, setIsHover] = useState(false);

	return (
		<div
			className={s.wrapper}
			onMouseEnter={() => setIsHover(true)}
			onMouseLeave={() => setIsHover(false)}
		>
			<Image
				src={url}
				alt="image"
				width={48}
				height={48}
				style={{ borderRadius: 8 }}
			/>

			{isHover && (
				<div className={s.delete_button} onClick={onDelete}>
					<Image src={deleteIcon} alt="delete_image_icon" width={15} height={15} />
				</div>
			)}
		</div>
	);
};
