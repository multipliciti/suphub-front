'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import s from './ProductPage.module.scss';
import Image from 'next/image';
import { Api } from '@/services';
import { spawn } from 'child_process';
import back_btn from '@/imgs/Modal/CheckEmail/back_btn.svg';
import { Order } from './Order';
import { AboutProduct } from './AboutProduct';
import { classNames } from '@/utils/classNames';
import { ProductItemType } from '@/types/marketplace/product';
import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import { setModal } from '@/redux/slices/modal';

type PropsType = {
	id: number;
	backLink: string;
};

export const ProductPageComponent = (props: PropsType) => {
	const api = Api();
	const { push } = useRouter();
	const dispatch = useAppDispatch()
	const user = useAppSelector((state)=> state.authSlice.user)
	const statusGetUser = useAppSelector((state)=> state.authSlice.statusGetUser)
	const { id , backLink} = props;
	const [product, setProduct] = useState<ProductItemType | null>(null);
	const [status, setStatus] = useState<'loading' | 'notFound' | 'seccess'>(
		'seccess'
	);

	const fetchProductOne = async (id: number) => {
		try {
			const response = await api.product.getProductOne(id);
			setProduct(response);
			setStatus('seccess');
		} catch (error: any) {
			if (error.response.data.statusCode == 404) {
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

			{status === 'seccess' && product !== null && (
				<div className={s.container}>
					<div className={s.header}>
						<div className={s.nav}>
							<span onClick={() => push(`${backLink}`)} className={s.back}>
								<Image src={back_btn} alt="back_btn" width={20} height={20} />
								<p className={s.nav_text}>Back</p>
							</span>
						</div>
					</div>

					<div className={s.content}>
						<div className={s.product_wrapper}>
							<AboutProduct product={product} />
						</div>
						<div className={s.summery}>
							<Order user={user} statusGetUser={statusGetUser}/>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};
