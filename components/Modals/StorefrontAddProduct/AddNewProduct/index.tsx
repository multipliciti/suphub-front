'use client';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { StorefrontAddProductModalLayout } from '../layout';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { CreateSellerProduct } from '@/types/services/sellerProduct';
import { categoryService } from '@/services/categoryApi';

import { setStatus } from '@/redux/slices/storefront/storefrontProducts';
import { setModal } from '@/redux/slices/modal';
import { Select } from '@/components/UI/Select';
import { Api } from '@/services';

import s from '../Form.module.scss';


type FormValues = {
	productName: string
	subcategory: string
}

export const SellerAddNewProduct = () => {
	const api = Api();
	const dispatch = useAppDispatch();

	const categories = useAppSelector(state => state.storefrontSlice.categories);

	const [subcategory, setSubcategory] = useState<string[]>([]);

	const {
		register,
		handleSubmit,
		formState,
		setValue
	} = useForm<FormValues>({
		defaultValues: {
			productName: '',
			subcategory: ''
		},
		mode: 'onChange',
	});

	useEffect(() => {
		register('subcategory', { required: true });
	}, [register]);

	useEffect(() => {
		setValue('subcategory', subcategory[0], { shouldValidate: true });
	}, [subcategory]);


	const onSubmit: SubmitHandler<FormValues> = async (values) => {
		try {
			const subCategoryId = categories?.length
				? categoryService.findSubcategoryIdByName(categories, values.subcategory)
				: 0

			const data: CreateSellerProduct = {
				name: values.productName,
				subCategoryId,
				countryOfOrigin: '',
				hsCode: '',
				unitPrice: 0,
				moq: 0,
				minOrder: 0,
				leadTime: 0,
				warranty: 0,
				dynamic_attr: []
			}
			await api.productSeller.addSellerProduct(data);

			hideModal();
			refetchSellerProducts();

		} catch (e) {
			console.log('Error with add new seller product', e);
		}
	}

	const hideModal = () => {
		dispatch(setModal(''));
	}

	const refetchSellerProducts = () => {
		dispatch(setStatus('refetch'));
	}

	return (
		<StorefrontAddProductModalLayout
			title="Add new product"
			description="Fill the form to add new product"
			close={hideModal}
		>
			<form
				className={s.form}
				onSubmit={handleSubmit(onSubmit)}
			>
				<div className={s.form_row}>
					<span>
						Product Name:
					</span>
					<input
						type="text"
						placeholder="Enter Product Name"
						{...register('productName', { required: true })}
					/>
				</div>

				<div className={s.form_row}>
					<span>
						Subcategory:
					</span>

					<Select
						title='Choose Subcategory'
						isMulti={false}
						options={categories ? categoryService.getSubcategories(categories) : []}
						value={subcategory}
						setValue={setSubcategory}
					/>
				</div>

				<div className={s.form_buttons}>
					<button
						type="button"
						className={s.form_cancel}
						onClick={hideModal}
					>
						Cancel
					</button>

					<button
						type="submit"
						className={s.form_create}
						disabled={!formState.isValid}
					>
						Create Draft
					</button>
				</div>
			</form>
		</StorefrontAddProductModalLayout>
	)
}