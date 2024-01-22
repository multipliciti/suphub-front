'use client';
import { FC, useEffect, useState } from 'react';

import { ImageUploadButton } from '@/components/UI/ImageUploadButton';
import { ProductItemType } from '@/types/products/product';
import { TableWrapper } from '@/components/UI/TableWrapper';
import { FetchStatus } from '@/types/fetch-status';
import { Spinner } from '@/components/UI/Spinner';
import { Api } from '@/services';

import s from './StorefrontProductItemFiles.module.scss';

interface Props {
	id: number;
}

export const StorefrontProductItemFiles: FC<Props> = ({ id }) => {
	const api = Api();

	const [product, setProduct] = useState<ProductItemType>();
	const [status, setStatus] = useState<FetchStatus>('success');

	useEffect(() => {
		// void fetchProduct();
	}, []);

	const fetchProduct = async () => {
		try {
			setStatus('loading');

			const response = await api.productSeller.getSellerProductById(id);

			setProduct(response);

			setStatus('success');
		} catch (e) {
			setStatus('error');
		}
	};

	if (status === 'error') {
		return <div>Something went wrong</div>;
	}

	if (status === 'idle' || status === 'loading') {
		return <Spinner style={{ marginTop: '10%' }} />;
	}

	return (
		<TableWrapper className={s.table}>
			<thead>
				<tr>
					<th colSpan={2}>
						<div>Documents</div>
					</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>
						<div>Cutsheet</div>
					</td>
					<td>
						<div>
							<ImageUploadButton onClick={() => {}} />
						</div>
					</td>
				</tr>

				<tr>
					<td>
						<div>Certifications Documents</div>
					</td>
					<td>
						<div>
							<ImageUploadButton onClick={() => {}} />
						</div>
					</td>
				</tr>

				<tr>
					<td>
						<div>Installation Manual</div>
					</td>
					<td>
						<div>
							<ImageUploadButton onClick={() => {}} />
						</div>
					</td>
				</tr>
			</tbody>
		</TableWrapper>
	);
};
