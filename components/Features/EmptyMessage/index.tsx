import { FC, PropsWithChildren } from 'react';
import Image from 'next/image';

import s from './EmptyMessage.module.scss';

import houseCreateIcon from '@/imgs/Buyer&Seller/house_create.svg';
import houseIcon from '@/imgs/Buyer&Seller/house.svg';

interface Props {
	title: string;
	text?: string;
}

export const EmptyMessage: FC<PropsWithChildren<Props>> = (props) => {
	const { title, text, children } = props;
	return (
		<div className={s.wrapper}>
			<div className={s.img}>
				<div>
					<Image src={houseIcon} alt="house_icon" width={45} height={45} />
					<Image
						className={s.create_icon}
						src={houseCreateIcon}
						alt="house_create_icon"
						width={18}
						height={18}
					/>
				</div>
			</div>

			<h2 className={s.title}>{title}</h2>

			{text && <div className={s.text}>{text}</div>}

			{children && <div className={s.main}>{children}</div>}
		</div>
	);
};
