import { FC } from 'react';
import Image from 'next/image';

import { deleteProductFromCart } from '@/redux/slices/projects/projectsCart';
import { useAppDispatch } from '@/redux/hooks';
import { Api } from '@/services';

import s from './ProjectsCartDelete.module.scss';

import trash3Icon from '@/imgs/Buyer&Seller/trash_3.svg';

interface Props {
	sellerId: number;
	productId: number;
}

export const ProjectsCartDelete: FC<Props> = ({ sellerId, productId }) => {
	const api = Api();
	const dispatch = useAppDispatch();

	const handleDeleteProduct = async () => {
		try {
			await api.cart.delete(productId);
			dispatch(
				deleteProductFromCart({
					sellerId,
					productId,
				})
			);
		} catch (e) {
			console.log(e);
		}
	};

	return (
		<button className={s.button} onClick={handleDeleteProduct}>
			<Image src={trash3Icon} alt="delete_icon" width={20} height={20} />
		</button>
	);
};
