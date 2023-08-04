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

type PropsType = {
	id: number;
};

export const ProductPageComponent = (props: any) => {
	const { push } = useRouter();
	const { id } = props;
	const [product, setProduct] = useState<any>({
		id: 2,
		name: 'Aluminum-clad Wood Window for All Climate',
		sku: 'PASSIVE126',
		certification: 'AAMA, NFRC',
		warranty: '10-year Warranty',
		sustainability: 'PHI',
		productOverview:
			"Passive 126 aluminum-clad Wood System Window, adopting the self-developed high-temperature insulation material and wood structure, makes its thermal insulation performance up to 10 grade, is a PHA grade products, won the international certification of the world's first all-weather award.",
		hsCode: '7610.10.0010',
		countryOfOrigin: 'China',
		minOrder: 1,
		leadTime: '45 days',
		factoryUnitPriceMinQty: 402.78,
		factoryUnitPriceLargeQty: 343.28,
		factoryUnitPriceContainerQty: 343.28,
		containerQty40ft: '75 units',
		containerQty20ft: '35 units',
		platformCommissionRate: 15,
		platformUnitPriceMinQty: 463.2,
		platformUnitPriceLargeQty: 394.77,
		platformUnitPriceContainerQty: 394.77,
		platformOnetimeDiscountedPrice: 375,
		sellersUrl: '',
		packaging: 'wooden frame, wooden box,  steel pallet',
		packageInclude: 'windows',
		packageDimension: "58'' x 20''",
		packageWeight: '28 lbs',
		status: 0,
		largeQty: '75 units',
		unitOfMeasurement: 'unit',
		sellerCompanyId: 1,
		subCategoryId: 2,
		updatedAt: '2023-08-01T09:01:52.159Z',
		createdAt: '2023-08-01T09:01:52.159Z',
		attr: [
			{
				attributeId: 7,
				attributeDescription: '',
				label: 'Opening Style',
				value: 'fixed',
			},
			{
				attributeId: 8,
				attributeDescription: '',
				label: 'Opening Size',
				value: "48'' x 12''",
			},
			{
				attributeId: 9,
				attributeDescription: '',
				label: 'Frame Material',
				value: 'Aluminum',
			},
			{
				attributeId: 10,
				attributeDescription: 'W/m∙K',
				label: 'U-Factor',
				value: 96,
			},
			{
				attributeId: 11,
				attributeDescription: '',
				label: 'SHGC',
				value: 0.39,
			},
			{
				attributeId: 12,
				attributeDescription: '',
				label: 'Glazing Type',
				value: 'triple-pane',
			},
			{
				attributeId: 13,
				attributeDescription: '',
				label: 'Climate Zone',
				value: 'all-climate',
			},
		],
	});
	const [status, setStatus] = useState<'loading' | 'notFound' | 'seccess'>(
		'seccess'
	);
	const api = Api();

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

			{status === 'seccess' && (
				<div className={s.container}>
					<div className={s.header}>
						<div className={s.nav}>
							<span onClick={() => push('/marketplace')} className={s.back}>
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
							<Order />
						</div>
					</div>
				</div>
			)}
		</div>
	);
};
