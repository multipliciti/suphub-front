'use client';
import { FC, useEffect, useState } from 'react';
import { StorefrontProductFileUploadModal } from '@/components/Screens/Storefront/StorefrontLayout/StorefrontFileUploadModal';
import { ImageUploadButton } from '@/components/UI/ImageUploadButton';
import { TableWrapper } from '@/components/UI/TableWrapper';
import { FileListItem } from '@/components/UI/FileListItem';
import { ModalPortal } from '@/components/Features/ModalPortal';
import { Spinner } from '@/components/UI/Spinner';
import { Api } from '@/services';
import { SellerProductFile } from '@/types/services/sellerProduct';
import { ProductItemType } from '@/types/products/product';
import { FetchStatus } from '@/types/fetch-status';
import { RfqFile } from '@/types/services/rfq';
import s from './StorefrontProductItemFiles.module.scss';

interface Props {
	id: number;
}

export const StorefrontProductItemFiles: FC<Props> = ({ id }) => {
	const api = Api();

	const [product, setProduct] = useState<ProductItemType>();
	const [status, setStatus] = useState<FetchStatus>('idle');

	const [uploadType, setUploadType] = useState<SellerProductFile>('cutsheets');
	const [showUploadFilesModal, setShowUploadFilesModal] = useState(false);

	useEffect(() => {
		void fetchProduct();
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

	const handleSetFiles = (files: RfqFile[]) => {
		setProduct((prevState) => {
			if (!prevState) {
				return;
			}
			if (uploadType === 'cutsheets') {
				return { ...prevState, cutsheets: files };
			}
			if (uploadType === 'certifications') {
				return { ...prevState, certifications: files };
			}
			if (uploadType === 'manuals') {
				return { ...prevState, manuals: files };
			}
		});
	};

	const handleDeleteFile = async (type: SellerProductFile, fileKey: string) => {
		try {
			if (!product) {
				return;
			}

			await api.productSeller.deleteFiles({
				productId: product.id,
				type,
				keys: [fileKey],
			});

			setProduct((prevState) => {
				if (!prevState) {
					return;
				}

				return {
					...prevState,
					[type]: prevState[type].filter((item) => item.key !== fileKey),
				};
			});
		} catch (e) {}
	};

	if (status === 'error') {
		return <div>Something went wrong</div>;
	}

	if (status === 'idle' || status === 'loading') {
		return <Spinner style={{ marginTop: '10%' }} />;
	}

	return (
		<TableWrapper className={s.table}>
			<ModalPortal
				isOpen={showUploadFilesModal}
				onHide={() => setShowUploadFilesModal(false)}
			>
				<StorefrontProductFileUploadModal
					onHide={() => setShowUploadFilesModal(false)}
					productId={id}
					type={uploadType}
					setFiles={handleSetFiles}
				/>
			</ModalPortal>

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
						<div className={s.filelist}>
							<ImageUploadButton
								onClick={() => {
									setUploadType('cutsheets');
									setShowUploadFilesModal(true);
								}}
							/>

							{product &&
								product.cutsheets.length > 0 &&
								product.cutsheets.map((item, index) => (
									<FileListItem
										key={`${item.key}-${index}`}
										filename={item.name}
										onDelete={() => {
											void handleDeleteFile('cutsheets', item.key);
										}}
									/>
								))}
						</div>
					</td>
				</tr>

				<tr>
					<td>
						<div>Certification Documents</div>
					</td>
					<td>
						<div className={s.filelist}>
							<ImageUploadButton
								onClick={() => {
									setUploadType('certifications');
									setShowUploadFilesModal(true);
								}}
							/>

							{product &&
								product.certifications.length > 0 &&
								product.certifications.map((item, index) => (
									<FileListItem
										key={`${item.key}-${index}`}
										filename={item.name}
										onDelete={() => {
											void handleDeleteFile('certifications', item.key);
										}}
									/>
								))}
						</div>
					</td>
				</tr>

				<tr>
					<td>
						<div>Installation Manual</div>
					</td>
					<td>
						<div className={s.filelist}>
							<ImageUploadButton
								onClick={() => {
									setUploadType('manuals');
									setShowUploadFilesModal(true);
								}}
							/>

							{product &&
								product.manuals.length > 0 &&
								product.manuals.map((item, index) => (
									<FileListItem
										key={`${item.key}-${index}`}
										filename={item.name}
										onDelete={() => {
											void handleDeleteFile('manuals', item.key);
										}}
									/>
								))}
						</div>
					</td>
				</tr>
			</tbody>
		</TableWrapper>
	);
};
