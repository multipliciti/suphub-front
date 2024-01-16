'use client';
import { FC, useEffect, useState } from 'react';

import {
	DynamicAttribute,
	ProductItemType,
	UpdateDynamicAttribute,
} from '@/types/products/product';
import { StorefrontProductImageUploadModal } from '../../StorefrontLayout/StorefrontImageUploadModal';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { SpecificationDynamicTable } from '@/components/Screens/Storefront/StorefrontProductItem/General/SpecificationDynamicTable';
import { StorefrontProductPriceTier } from '@/components/Screens/Storefront/StorefrontProducts/Table/PriceTier';
import { ImageUploadButton } from '@/components/UI/ImageUploadButton';
import { categoryService } from '@/services/categoryApi';
import { setCategories } from '@/redux/slices/storefront/storefront';
import { ImageListItem } from '@/components/UI/ImageListItem';
import { ModalPortal } from '@/components/Features/ModalPortal';
import { FetchStatus } from '@/types/fetch-status';
import { ImageType } from '@/types/products/image';
import { Spinner } from '@/components/UI/Spinner';
import { Button } from '@/components/UI/Button';
import { Input } from '@/components/UI/Input';
import { Api } from '@/services';

import s from './StorefrontProductItemGeneral.module.scss';

type ChangedProductFields = Partial<Omit<ProductItemType, 'dynamic_attr'>>;
export type ChangeFieldFunction = <K extends keyof ProductItemType>(
	key: K,
	value: ProductItemType[K]
) => void;
export type ChangeDynamicSelectFieldFunction = (args: {
	attrId: number;
	type: DynamicAttribute['type'];
	value: string[] | number[];
}) => void;
export type ChangeDynamicInputFieldFunction = (args: {
	attrId: number;
	value: string;
}) => void;

interface Props {
	id: number;
}

export const StorefrontProductItemGeneral: FC<Props> = ({ id }) => {
	const api = Api();
	const dispatch = useAppDispatch();

	const categories = useAppSelector((state) => state.storefrontSlice.categories);

	const [status, setStatus] = useState<FetchStatus>('idle');
	const [updateStatus, setUpdateStatus] = useState<FetchStatus>('idle');

	const [product, setProduct] = useState<ProductItemType>();
	const [dynamicAttributes, setDynamicAttributes] = useState<
		UpdateDynamicAttribute[]
	>([]);
	const [changedProductFields, setChangedProductFields] =
		useState<ChangedProductFields>();

	const [isShowImageUploadModal, setIsShowImageUploadModal] = useState(false);

	useEffect(() => {
		if (!categories || !categories.length) {
			fetchSubcategories();
		}
		fetchData();
	}, []);

	const fetchData = async () => {
		try {
			setStatus('loading');

			const response = await api.productSeller.getSellerProductById(id);

			setProduct(response);

			setDynamicAttributes(
				response.dynamic_attr.map((item) => {
					const newItem: UpdateDynamicAttribute = { ...item, attrValueIds: [] };

					if (item.formType === 'select') {
						const values = item.value.split(',').map((item) => item.trim());
						item.options.forEach((el) => {
							if (item.type === 'char') {
								if (el.charValue && values.includes(el.charValue)) {
									newItem.attrValueIds.push(el.id);
								}
							}
							if (item.type === 'numeric') {
								if (el.numericValue && values.includes(String(el.numericValue))) {
									newItem.attrValueIds.push(el.id);
								}
							}
						});
					}
					return newItem;
				})
			);

			setStatus('success');
		} catch (e) {
			setStatus('error');
		}
	};

	const fetchSubcategories = async () => {
		try {
			const response = await api.category.getCategories();
			dispatch(setCategories(response));
		} catch (e) {
			dispatch(setCategories([]));
		}
	};

	const updateProduct = async (
		directlyChangedProductFields?: ChangedProductFields
	) => {
		if (!product) {
			return;
		}
		try {
			setUpdateStatus('loading');

			const data = {
				...changedProductFields,
				...directlyChangedProductFields,
				dynamic_attr: dynamicAttributes
					.filter((item) => item.value || item.attrValueIds.length > 0)
					.map((item) => {
						if (item.formType === 'input') {
							return {
								attributeId: item.attributeId,
								value:
									item.type === 'numeric' ? Number(item.value) : String(item.value),
							};
						}
						if (item.formType === 'select') {
							return {
								attributeId: item.attributeId,
								attrValueIds: item.attrValueIds,
							};
						}
					}),
			};

			await api.productSeller.updateSellerProductById(product.id, data);
			setUpdateStatus('idle');
		} catch (e) {
			setUpdateStatus('error');
		}
	};

	const onChangeField: ChangeFieldFunction = (key, value) => {
		if (!product) {
			return;
		}
		setProduct({
			...product,
			[key]: value,
		});
		setChangedProductFields({
			...changedProductFields,
			[key]: value,
		});
	};

	const onChangeDynamicInputField: ChangeDynamicInputFieldFunction = (args) => {
		const { attrId, value } = args;

		setDynamicAttributes((prevState) => {
			const newDynamicAttr = [...prevState];

			const findDynamicAttrFieldIndex = prevState.findIndex(
				(item) => item.attributeId === attrId
			);

			newDynamicAttr[findDynamicAttrFieldIndex].value = value;

			return newDynamicAttr;
		});
	};

	const onChangeDynamicSelectField: ChangeDynamicSelectFieldFunction = (args) => {
		const { attrId, type, value } = args;

		setDynamicAttributes((prevState) => {
			const newDynamicAttr = [...prevState];

			const findDynamicAttrFieldIndex = prevState.findIndex(
				(item) => item.attributeId === attrId
			);

			const findAttrValueIds: number[] = [];

			value.forEach((item) => {
				newDynamicAttr[findDynamicAttrFieldIndex].options.forEach((el) => {
					if (type === 'char' && el.charValue === item) {
						findAttrValueIds.push(el.id);
					}
					if (type === 'numeric' && el.numericValue === Number(item)) {
						findAttrValueIds.push(el.id);
					}
				});
			});
			newDynamicAttr[findDynamicAttrFieldIndex].attrValueIds = findAttrValueIds;
			return newDynamicAttr;
		});
	};

	const handleSetImages = async (images: ImageType[]) => {
		setProduct((prevState) => {
			if (!prevState) {
				return;
			}
			return {
				...prevState,
				images,
			};
		});
	};

	const handleDeleteImages = async (imageId: number) => {
		try {
			await api.productSeller.deleteImages([imageId]);

			setProduct((prevState) => {
				if (!prevState) {
					return;
				}
				return {
					...prevState,
					images: prevState.images.filter((item) => item.id !== imageId),
				};
			});
		} catch (e) {
			console.log(e);
		}
	};

	if (status === 'error') {
		return <div>Something went wrong</div>;
	}

	if (status === 'idle' || status === 'loading' || !product) {
		return <Spinner style={{ marginTop: '10%' }} />;
	}

	return (
		<div className={s.wrapper}>
			<table>
				<thead>
					<tr>
						<th colSpan={4}>General Information</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>Product name</td>
						<td>
							<Input
								placeholder="Enter product name"
								value={product.name}
								onChange={(e) => onChangeField('name', e.currentTarget.value)}
							/>
						</td>

						<td>Subcategory</td>
						<td>
							{categories && categories.length > 0 && (
								<span style={{ padding: '4px 8px' }}>
									{categoryService.findSubcategoryNameById(
										categories,
										product.subCategoryId
									)}
								</span>
							)}
						</td>
					</tr>

					<tr>
						<td>Product images</td>
						<td>
							<div className={s.images}>
								{product.images.length > 0 &&
									product.images.map((item, index) => (
										<ImageListItem
											key={`${item.id}-${index}`}
											url={item.url || ''}
											onDelete={() => handleDeleteImages(item.id)}
										/>
									))}

								<ImageUploadButton
									onClick={() => setIsShowImageUploadModal(!isShowImageUploadModal)}
								/>

								<ModalPortal
									isOpen={isShowImageUploadModal}
									onHide={() => setIsShowImageUploadModal(false)}
								>
									<StorefrontProductImageUploadModal
										onHide={() => setIsShowImageUploadModal(false)}
										productId={id}
										setImages={handleSetImages}
									/>
								</ModalPortal>
							</div>
						</td>

						<td>Warranty (years)</td>
						<td>
							<Input
								type="number"
								placeholder="Enter warranty"
								value={product?.warranty || 0}
								onChange={(e) =>
									onChangeField('warranty', Number(e.currentTarget.value))
								}
							/>
						</td>
					</tr>
				</tbody>
			</table>

			<StorefrontProductPriceTier
				productId={product.id}
				productPrices={product.prices}
				platformCommission={product.subCategory.platformCommission}
				viewType="separate"
				titleColumn="Price"
			/>

			<SpecificationDynamicTable
				dynamicAttr={dynamicAttributes}
				onChangeInputField={onChangeDynamicInputField}
				onChangeSelectField={onChangeDynamicSelectField}
			/>

			<div className={s.controllers}>
				<Button variant="text" className={s.btn_cancel} onClick={fetchData}>
					Cancel
				</Button>
				<Button
					variant="contained"
					type="submit"
					disabled={updateStatus === 'loading'}
					onClick={() => updateProduct()}
				>
					Save
				</Button>

				{product.status === 'draft' && (
					<Button
						variant="contained"
						className={s.btn_publish}
						disabled={updateStatus === 'loading'}
						onClick={async () => {
							onChangeField('status', 'published');
							await updateProduct({ status: 'published' });
						}}
					>
						Publish
					</Button>
				)}

				{product.status === 'published' && (
					<Button
						variant="contained"
						className={s.btn_publish}
						disabled={updateStatus === 'loading'}
						onClick={async () => {
							onChangeField('status', 'draft');
							await updateProduct({ status: 'draft' });
						}}
					>
						Unpublish
					</Button>
				)}
			</div>
		</div>
	);
};
