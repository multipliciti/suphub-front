'use client';
import { useState } from 'react';
import s from './ProductInfo.module.scss';
import Image from 'next/image';
import testImage from '@/imgs/Product/test2.png';
import { classNames } from '@/utils/classNames';

interface ProductInfo {
	[key: string]: { key: string; value: string }[];
}

export const ProductInfo = () => {
	const [activeTable, setActiveTable] = useState<string>('Specification');
	const productInfoTest: ProductInfo = {
		Specification: [
			{ key: 'Frame types', value: 'Aluminum' },
			{ key: 'Opening styles', value: 'Double-hung' },
			{ key: 'Glass type', value: 'Laminated glass, Safety glass' },
			{ key: 'Glazing type', value: 'Double-pane, Triple-pane' },
			{ key: 'Center-of-glass U-factor', value: 'Range' },
			{ key: 'Whole assembly U-value', value: 'Range' },
			{ key: 'R-Value', value: 'Range' },
			{ key: 'SHGC', value: 'Range between 0 - 1' },
			{ key: 'Visible Transmittance', value: 'Range between 0 - 1' },
			{ key: 'Air Leakage', value: 'Range between 0.1 - 0.3' },
			{ key: 'Condensation Resistance', value: 'Range between 1 - 100' },
			{ key: 'Sound Transmission Class', value: 'Range between 18 - 38' },
		],
		'Shipment & Packaging': [
			{ key: 'Packaging Frame typesndnd  ', value: 'PackagingAluminum' },
			{ key: ' Packaging Opening styles  ', value: 'PackagingDouble-hung' },
			{
				key: 'Packaging Glass type',
				value: 'PackagingLaminated glass, Safety glass',
			},
			{ key: 'Packaging Glazing type', value: 'PackagingDouble-pane, Triple-pane' },
			{ key: 'Packaging Center-of-glass U-factor', value: 'PackagingRange' },
			{ key: 'Packaging Whole assembly U-value', value: 'PackagingRange' },
			{ key: 'Packaging R-Value', value: 'PackagingRange' },
			{ key: 'Packaging SHGC', value: 'PackagingRange between 0 - 1' },
			{
				key: 'Packaging Visible Transmittance',
				value: 'PackagingRange between 0 - 1',
			},
			{ key: 'Packaging Air Leakage', value: 'PackagingRange between 0.1 - 0.3' },
			{
				key: 'Packaging Condensation Resistance',
				value: 'PackagingRange between 1 - 100',
			},
			{
				key: 'Packaging Sound Transmission Class',
				value: 'PackagingRange between 18 - 38',
			},
		],
		Datasheet: [
			{ key: 'Datasheet Frame types', value: 'Datasheet Aluminum' },
			{ key: 'Datasheet Opening styles', value: 'Datasheet Double-hung' },
			{
				key: 'Datasheet Glass type',
				value: 'Datasheet Laminated glass, Safety glass',
			},
			{ key: 'Datasheet Glazing type', value: 'Datasheet Double-pane, Triple-pane' },
			{ key: 'Datasheet Center-of-glass U-factor', value: 'Datasheet Range' },
			{ key: 'Datasheet Whole assembly U-value', value: 'Datasheet Range' },
			{ key: 'Datasheet R-Value', value: 'Datasheet Range' },
			{ key: 'Datasheet SHGC', value: 'Datasheet Range between 0 - 1' },
			{
				key: 'Datasheet Visible Transmittance',
				value: 'Datasheet Range between 0 - 1',
			},
			{ key: 'Datasheet Air Leakage', value: 'Datasheet Range between 0.1 - 0.3' },
			{
				key: 'Datasheet Condensation Resistance',
				value: 'Datasheet Range between 1 - 100',
			},
			{
				key: 'Datasheet Sound Transmission Class',
				value: 'Datasheet Range between 18 - 38',
			},
		],
	};

	const productInfoTestKeys = Object.keys(productInfoTest);
	console.log('productInfoTestKeys', productInfoTestKeys);
	return (
		<div className={s.wrapper}>
			{/* product */}
			<div className={s.product_info}>
				<Image className={s.img} src={testImage} alt="testImage" />
				<div className={s.info}>
					<p className={s.production}>Weika Windows</p>
					<div className={s.description}>
						<p className={s.title}>Vinyl Double Pane Fixed Window </p>
						<div className={s.description_item}>
							<p className={s.description_subtitle}>Lead time (weeks)</p>
							<p className={s.description_title}>4</p>
						</div>
						<div className={s.description_item}>
							<p className={s.description_subtitle}>Min. Order Quantity</p>
							<p className={s.description_title}>10 unit</p>
						</div>
						<div className={s.description_item}>
							<p className={s.description_subtitle}>Warranty (years)</p>
							<p className={s.description_title}>25</p>
						</div>
						<div className={s.description_item}>
							<p className={s.description_subtitle}>Certifications</p>
							<p className={s.description_title}>NFRC</p>
						</div>
					</div>
				</div>
			</div>
			{/* product table  */}
			<div className={s.info_toggle}>
				{productInfoTestKeys.map((el, ind) => {
					return (
						<div
							key={ind}
							onClick={() => setActiveTable(el)}
							className={classNames(
								s.info_toggle_item,
								activeTable === el && s.info_toggle_active
							)}
						>
							{el}
						</div>
					);
				})}
			</div>
			{/* product rows */}
			<div className={s.rows}>
				<div className={s.rows_head}>{activeTable}</div>
				<div className={s.rows_info}>
					{productInfoTest[activeTable].map((el: any, ind) => {
						return (
							<div key={ind} className={s.rows_row}>
								<div className={s.rows_key}>{el.key}</div>
								<div className={s.rows_value}>{el.value}</div>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
};
