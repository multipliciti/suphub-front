'use client';
import { FC, useEffect, useState } from 'react';
import Image from 'next/image';

import { DynamicAttribute, ProductItemType, UpdateDynamicAttribute } from '@/types/products/product';
import { setCategories, setProductIdForUploadImages } from '@/redux/slices/storefront/storefront';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { categoryService } from '@/services/categoryApi';
import { setModal } from '@/redux/slices/modal';
import { Input } from '@/components/UI/Input';
import { Api } from '@/services';
import {
	SpecificationDynamicTable
} from '@/components/Screens/Storefront/StorefrontProductItem/General/SpecificationDynamicTable';
import { StorefrontProductPriceTier } from '@/components/Screens/Storefront/StorefrontProducts/Table/PriceTier';

import s from './StorefrontProductItemGeneral.module.scss';

import addIcon from '@/imgs/Buyer&Seller/SideBar/addProject.svg';



type ChangedProductFields = Partial<Omit<ProductItemType, 'dynamic_attr'>>
export type ChangeFieldFunction = <K extends keyof ProductItemType> (key: K, value: ProductItemType[K]) => void;
export type ChangeDynamicSelectFieldFunction = (args: { attrId: number, type: DynamicAttribute['type'], value: string[] | number[] }) => void;
export type ChangeDynamicInputFieldFunction = (args: { attrId: number, value: string }) => void;

interface Props {
	id: number
}

export const StorefrontProductItemGeneral: FC<Props> = ({ id }) => {
	const api = Api();
	const dispatch = useAppDispatch();

	const categories = useAppSelector(state => state.storefrontSlice.categories);

	const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

	const [product, setProduct] = useState<ProductItemType>();
	const [dynamicAttributes, setDynamicAttributes] = useState<UpdateDynamicAttribute[]>([])
	const [changedProductFields, setChangedProductFields] = useState<ChangedProductFields>()

	useEffect(() => {
		if (!categories || !categories.length) {
			fetchSubcategories();
		}
		fetchData();
	}, []);

	const fetchData = async () => {
		setStatus('loading')
		try {
			const response = await api.productSeller.getSellerProductById(id);

			setProduct(response);

			setDynamicAttributes(response.dynamic_attr.map(item => {
				const newItem: UpdateDynamicAttribute = {...item, attrValueIds: []};

				if (item.formType === 'select') {
					const values = item.value.split(',').map(item => item.trim());
					item.options.forEach(el => {
						if (item.type === 'char') {
							if (el.charValue && values.includes(el.charValue)) {
								newItem.attrValueIds.push(el.id)
							}
						}
						if (item.type === 'numeric') {
							if (el.numericValue && values.includes(String(el.numericValue))) {
								newItem.attrValueIds.push(el.id)
							}
						}
					})
				}
				return newItem;
			}));

			setStatus('success');
		} catch (e) {
			setStatus('error');
			console.log('Error with get product', e);
		}
	}

	const fetchSubcategories = async () => {
		try {
			const response = await api.category.getCategories();
			dispatch(setCategories(response));
		} catch (e) {
			dispatch(setCategories([]));
		}
	};

	const updateProduct = async () => {
		if (!product) {
			return;
		}
		try {
			const data = {
				...changedProductFields,
				dynamic_attr: dynamicAttributes
					.filter(item => item.value || item.attrValueIds.length > 0)
					.map(item => {
						if (item.formType === 'input') {
							return {
								attributeId: item.attributeId,
								value: item.type === 'numeric' ? Number(item.value) : String(item.value)
							}
						}
						if (item.formType === 'select') {
							return {
								attributeId: item.attributeId,
								attrValueIds: item.attrValueIds
							}
						}
					})
			};

			await api.productSeller.updateSellerProductById(product.id, data);
			await fetchData();

		} catch (e) {
			console.log('Error with update product', e);
		}
	}

	const onChangeField: ChangeFieldFunction = (key, value) => {
		if (!product) {
			return;
		}
		setProduct({
			...product,
			[key]: value
		})
		setChangedProductFields({
			...changedProductFields,
			[key]: value
		})
	}

	const onChangeDynamicInputField: ChangeDynamicInputFieldFunction = (args) => {
		const { attrId, value } = args;

		setDynamicAttributes(prevState => {
			const newDynamicAttr = [...prevState];

			const findDynamicAttrFieldIndex = prevState.findIndex(item => item.attributeId === attrId);

			newDynamicAttr[findDynamicAttrFieldIndex].value = value

			return newDynamicAttr;
		})
	}

	const onChangeDynamicSelectField: ChangeDynamicSelectFieldFunction = (args) => {
		const { attrId, type, value } = args;

		setDynamicAttributes(prevState => {
			const newDynamicAttr = [...prevState];

			const findDynamicAttrFieldIndex = prevState.findIndex(item => item.attributeId === attrId);

			const findAttrValueIds: number[] = [];

			value.forEach(item => {
				newDynamicAttr[findDynamicAttrFieldIndex].options.forEach(el => {
					if (type === 'char' && el.charValue === item) {
						findAttrValueIds.push(el.id);
					}
					if (type === 'numeric' && el.numericValue === item) {
						findAttrValueIds.push(el.id);
					}
				})
			});
			newDynamicAttr[findDynamicAttrFieldIndex].attrValueIds = findAttrValueIds;
			return newDynamicAttr;
		});
	};

	const showModalForUploadImages = () => {
		dispatch(setProductIdForUploadImages(id));
		dispatch(setModal('sellerProductUploadImage'));
	}

	if (status === 'error') {
		return <div>Something went wrong</div>
	}

	if (status === 'idle' || status === 'loading' || !product) {
		return (
			<div></div>
		)
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
								<span style={{padding: '4px 8px'}}>
									{categoryService.findSubcategoryNameById(categories, product.subCategoryId)}
								</span>
							)}
						</td>
					</tr>

					<tr>
						<td>Minimum Order Quantity</td>
						<td>
							<Input
								type="number"
								placeholder="Enter quantity"
								value={product.moq}
								onChange={(e) => onChangeField('moq', Number(e.currentTarget.value))}
							/>
						</td>

						<td>Warranty (years)</td>
						<td>
							<Input
								type="number"
								placeholder="Enter warranty"
								value={product.warranty}
								onChange={(e) => onChangeField('warranty', Number(e.currentTarget.value))}
							/>
						</td>
					</tr>

					<tr>
						<td>Product images</td>
						<td>
							{product.images.length > 0 && (
								<div className={s.images}>
									{product.images.map((item, index) => (
										<Image
											key={item.id + index}
											src={item.url || ''}
											alt="image"
											width={48}
											height={48}
											style={{ borderRadius: 8 }}
										/>
									))}

									<div
										className={s.image_upload}
										onClick={showModalForUploadImages}
									>
										<Image
											src={addIcon}
											alt='add_image_icon'
											width={24}
											height={24}
										/>
									</div>
								</div>
							)}
						</td>
						<td>Certification</td>
						<td>
							<Input
								placeholder="Enter certification"
								disabled
							/>
						</td>
					</tr>
				</tbody>
			</table>

			<StorefrontProductPriceTier
				productId={product.id}
				productPrices={product.prices}
				platformCommission={product.subCategory.platformCommission}
				titleColumn="Price"
			/>

			<SpecificationDynamicTable
				dynamicAttr={dynamicAttributes}
				onChangeInputField={onChangeDynamicInputField}
				onChangeSelectField={onChangeDynamicSelectField}
			/>

			<div className={s.button}>
				<button
					type="submit"
					className={s.button_create}
					onClick={() => updateProduct()}
				>
					Save
				</button>
			</div>

		</div>
	)
}
