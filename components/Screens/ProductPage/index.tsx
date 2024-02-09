'use client';
import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';

import s from './ProductPage.module.scss';
import { Api } from '@/services';
import { BackButton } from '@/components/UI/BackButton';
import { Order } from './Order';
import { AboutProduct } from './AboutProduct';
import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import { setProduct } from '@/redux/slices/marketplace/product';

type PropsType = {
	id: number;
};

export const ProductPageComponent = (props: PropsType) => {
	const pathname = usePathname();
	const dispatch = useAppDispatch();
	const api = Api();

	const user = useAppSelector((state) => state.authSlice.user);
	const statusGetUser = useAppSelector((state) => state.authSlice.statusGetUser);
	const { id } = props;
	const [status, setStatus] = useState<'loading' | 'notFound' | 'success'>(
		'success'
	);
	const product = useAppSelector((state) => state.productSlice.product);
	const backLink = pathname.includes('marketplace') ? '/marketplace' : '/favorites';

	const fetchProductOne = async (id: number) => {
		try {
			const response = await api.product.getProductOne(id);
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

			{status === 'success' && product !== null && (
				<div className={s.container}>
					<div className={s.header}>
						<div className={s.nav}>
							<BackButton href={backLink} />
						</div>
					</div>

					<div className={s.content}>
						<div className={s.product_wrapper}>
							<AboutProduct product={product} />
						</div>
						<div className={s.summery}>
							<Order product={product} user={user} />
						</div>
					</div>
				</div>
			)}
		</div>
	);
};
