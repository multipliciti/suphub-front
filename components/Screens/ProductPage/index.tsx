'use client';
import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';

import s from './ProductPage.module.scss';
import { Api } from '@/services';
import { BackButton } from '@/components/UI/BackButton';
import { Order } from './Order';
import { AboutProduct } from './AboutProduct';
import { ProductItemType } from '@/types/products/product';
import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import { setProduct } from '@/redux/slices/marketplace/product';

type PropsType = {
	id: number;
};

export const ProductPageComponent = (props: PropsType) => {
	const pathname = usePathname();
	const dispatch = useAppDispatch();
	const api = Api();
	const { push } = useRouter();

	const user = useAppSelector((state) => state.authSlice.user);
	const statusGetUser = useAppSelector((state) => state.authSlice.statusGetUser);
	const { id } = props;
	const [localProduct, setLocalProduct] = useState<ProductItemType | null>(null);
	const [status, setStatus] = useState<'loading' | 'notFound' | 'success'>(
		'success'
	);
	const backLink = pathname.includes('marketplace') ? '/marketplace' : '/favorites';

	const fetchProductOne = async (id: number) => {
		try {
			const response = await api.product.getProductOne(id);
			setLocalProduct(response);
			dispatch(setProduct(response));
			setStatus('success');
		} catch (error: any) {
			if (error?.response?.data?.statusCode == 404) {
				setStatus('notFound');
			}
		}
	};

	useEffect(() => {
		fetchProductOne(id);
	}, []);

	return (
		<div>
			{status === 'loading' && <span> loading... </span>}

			{status === 'notFound' && <span>Product not found</span>}

			{status === 'success' && localProduct !== null && (
				<div className={s.container}>
					<div className={s.header}>
						<div className={s.nav}>
							<BackButton href={backLink} />
						</div>
					</div>

					<div className={s.content}>
						<div className={s.product_wrapper}>
							<AboutProduct product={localProduct} />
						</div>
						<div className={s.summery}>
							<Order user={user} statusGetUser={statusGetUser} />
						</div>
					</div>
				</div>
			)}
		</div>
	);
};
