import { FC } from 'react';
import Image from 'next/image';

import { setProductIdForUploadImages } from '@/redux/slices/storefront/storefront';
import { ProductItemType } from '@/types/products/product';
import { useAppDispatch } from '@/redux/hooks';
import { setModal } from '@/redux/slices/modal';

import s from './ImageUploader.module.scss';

import plusImage from '@/imgs/plus.svg';

interface Props {
	productId: number;
	imageList: ProductItemType['images'];
}

export const StorefrontProductImageUploader: FC<Props> = ({
	productId,
	imageList,
}) => {
	const dispatch = useAppDispatch();

	const showModalForUploadImages = () => {
		dispatch(setProductIdForUploadImages(productId));
		dispatch(setModal('sellerProductUploadImage'));
	};

	return (
		<div className={s.wrapper}>
			{imageList.length > 0 ? (
				<Image
					src={imageList[0].url || ''}
					alt="product_image"
					width={64}
					height={64}
					style={{ borderRadius: 8 }}
				/>
			) : (
				<div className={s.add_image} onClick={showModalForUploadImages}>
					<Image src={plusImage} alt={'Upload image'} />
				</div>
			)}
		</div>
	);
};
