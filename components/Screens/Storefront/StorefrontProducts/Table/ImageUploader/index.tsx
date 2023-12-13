import { FC, useState } from 'react';
import Image from 'next/image';

import { StorefrontProductImageUploadModal } from '@/components/Screens/Storefront/StorefrontLayout/StorefrontImageUploadModal';
import { setImagesForProductItem } from '@/redux/slices/storefront/storefrontProducts';
import { ProductItemType } from '@/types/products/product';
import { useAppDispatch } from '@/redux/hooks';
import { ModalPortal } from '@/components/Features/ModalPortal';
import { ImageType } from '@/types/products/image';

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

	const [isShowModal, setIsShowModal] = useState(false);

	const handleSetImages = async (images: ImageType[]) => {
		dispatch(setImagesForProductItem({ productId, images }));
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
				<div className={s.add_image} onClick={() => setIsShowModal(true)}>
					<Image src={plusImage} alt={'Upload image'} />
				</div>
			)}

			<ModalPortal isOpen={isShowModal} onHide={() => setIsShowModal(false)}>
				<StorefrontProductImageUploadModal
					onHide={() => setIsShowModal(false)}
					productId={productId}
					setImages={handleSetImages}
				/>
			</ModalPortal>
		</div>
	);
};
