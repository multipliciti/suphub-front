import Image from 'next/image';

import { StorefrontProductAddProductButton } from '../../Filters/AddProductButton';

import s from './EmptyTableMessage.module.scss';

import houseIcon from '@/imgs/Buyer&Seller/house.svg';
import houseCreateIcon from '@/imgs/Buyer&Seller/house_create.svg';

export const StorefrontEmptyTableMessage = () => {
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

			<h2 className={s.title}>You have no active listings yet</h2>

			<div className={s.text}>
				You don't have any projects yet. To create your project specification,
				compare, order products, create your first project.
			</div>

			<div className={s.add_btn}>
				<StorefrontProductAddProductButton />
			</div>
		</div>
	);
};
