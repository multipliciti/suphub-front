'use client';
import Link from 'next/link';

import { useAppSelector } from '@/redux/hooks';

import { StorefrontProductImageUploader } from './ImageUploader';
import { StorefrontProductPerformance } from './Performance';
import { StorefrontEmptyTableMessage } from './EmptyTableMessage';
import { StorefrontProductPagination } from './Pagination';
import { StorefrontProductPriceTier } from './PriceTier';

import s from './Table.module.scss';


export const StorefrontProductsTable = () => {

	const sellerProducts = useAppSelector(state => state.storefrontProductsSlice.result);
	const status = useAppSelector(state => state.storefrontProductsSlice.status);

	if (status === 'idle' || status === 'loading') {
		return <div></div>
	}

	if (status === 'rejected') {
		return <div>Some error</div>
	}

	if (!sellerProducts.length) {
		return (
			<StorefrontEmptyTableMessage/>
		)
	}

	return (
		<div className={s.wrapper}>
			<div className={s.table_wrapper}>
				<table>
					<thead>
						<tr>
							<th style={{minWidth: 50, textAlign: 'center'}}>
								ID
							</th>
							<th style={{minWidth: 90}}>
								Images
							</th>
							<th style={{minWidth: 110, width: '100%'}}>
								Product Name
							</th>
							<th style={{minWidth: 110}}>
								Subcategory
							</th>
							<th style={{minWidth: 360, textAlign: 'center'}}>
								Price tier
							</th>
							<th style={{minWidth: 120, textAlign: 'center'}}>
								Performance
							</th>
							<th style={{minWidth: 100, textAlign: 'center'}}>
								Status
							</th>
							<th style={{minWidth: 90, textAlign: 'center'}}>
								Action
							</th>
						</tr>
					</thead>

					<tbody>
						{sellerProducts.map((item, index) => (
							<tr key={index}>

								<td style={{textAlign: 'center'}}></td>

								<td>
									<StorefrontProductImageUploader
										productId={item.id}
										imageList={item.images}
									/>
								</td>

								<td>
									{item.name}
								</td>

								<td>
									{item.subCategory?.name}
								</td>

								<td style={{padding: 0}}>
									<StorefrontProductPriceTier
										productId={item.id}
										productPrices={item.prices}
										platformCommission={item.subCategory.platformCommission}
									/>
								</td>

								<td>
									<StorefrontProductPerformance
										views={item.views}
										favorites={item.favorites}
										projects={item.projects}
									/>
								</td>

								<td style={{textAlign: 'center'}}>
								<span className={s.status_label}>
									Draft
								</span>
								</td>

								<td style={{textAlign: 'center'}}>
									<Link
										href={`/storefront/product/${item.id}`}
										className={s.action_link}
									>
										Details
									</Link>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>

			<StorefrontProductPagination />

		</div>
	)
}