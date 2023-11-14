import { FC, useState } from 'react';
import Image from 'next/image';

import { Api } from '@/services';

import s from './StorefrontProductImage.module.scss';

import deleteIcon from '@/imgs/Buyer&Seller/delete.svg';

interface Props {
	id: number;
	url: string | null;
	onDeleteImageByIndex: () => void;
}
export const StorefrontProductImage: FC<Props> = ({
	id,
	url,
	onDeleteImageByIndex,
}) => {
	const api = Api();

	const [isHover, setIsHover] = useState(false);

	const handleDeleteImage = async () => {
		try {
			await api.productSeller.deleteImages([id]);
			onDeleteImageByIndex();
		} catch (e) {
			console.log('Error with delete image ', e);
		}
	};

	return (
		<div
			className={s.wrapper}
			onMouseEnter={() => setIsHover(true)}
			onMouseLeave={() => setIsHover(false)}
		>
			<Image
				src={url || ''}
				alt="image"
				width={48}
				height={48}
				style={{ borderRadius: 8 }}
			/>

			{isHover && (
				<div className={s.delete_button} onClick={handleDeleteImage}>
					<Image src={deleteIcon} alt="delete_image_icon" width={15} height={15} />
				</div>
			)}
		</div>
	);
};
