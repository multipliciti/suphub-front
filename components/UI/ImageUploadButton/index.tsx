import { ButtonHTMLAttributes, FC } from 'react';
import Image from 'next/image';

import s from './ImageUploadButton.module.scss';

import addIcon from '@/imgs/Buyer&Seller/SideBar/addProject.svg';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {}

export const ImageUploadButton: FC<Props> = (props) => {
	return (
		<button className={s.image_upload} {...props}>
			<Image src={addIcon} alt="add_image_icon" width={24} height={24} />
		</button>
	);
};
