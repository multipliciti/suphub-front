'use client';
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useAppSelector } from '@/redux/hooks';
import { ProductItemType } from '@/types/products/product';
import { SellerPublicInfo } from '@/types/services/company';
import { RfqFile } from '@/types/services/rfq';
import { Supplier } from '@/services/suppliers';
import CompanyWidget from './CompanyWidget';
import FilesWidget from './FilesWidget';
import { Api } from '@/services';
import Table from './Table';
import s from './SupplierPage.module.scss';

function SupplierPage() {
	const user = useAppSelector((state) => state.authSlice.user);
	const { id } = useParams();
	const sellerId = Number(id);
	const api = Api();

	const [sellerCompany, setSellerCompany] = useState<SellerPublicInfo>();
	const [thisSupplier, setThisSupplier] = useState<Supplier | undefined>();
	const [isInMySupplier, setIsInMySupplier] = useState<Supplier | false>(false);
	const [files, setFiles] = useState<RfqFile[]>([]);
	const [products, setProducts] = useState<ProductItemType[]>([]);

	const handleSaveToMySuppliers = async () => {
		//TODO do not work, fix after backend error fixed

		const supplierEmail =
			thisSupplier?.supplierEmail || sellerCompany?.users?.[0]?.email;

		if (!supplierEmail) return;
		const addSupplierResponse = await api.buyerSupplier.invite({
			supplierEmail: supplierEmail,
			acceptUrl: '',
			aboutUrl: '',
		});

		setIsInMySupplier(addSupplierResponse);

		return;
	};

	const handleRemoveSupplierFromMySuppliers = async () => {
		if (!isInMySupplier) return;

		await api.buyerSupplier.delete(isInMySupplier.id);

		setIsInMySupplier(false);

		return;
	};

	useEffect(() => {
		const fetch = async () => {
			const sellerPublicInfo =
				await api.sellerCompany.getSellerCompaniesPublicInfoById(sellerId);
			const products = await api.product.getProduct({
				page: 1,
				limit: 1000,
				sortParams: {},
				searchParams: JSON.stringify({
					seller: {
						id: sellerPublicInfo.data.id,
					},
				}),
			});

			setFiles([
				...sellerPublicInfo.data.businessCertifications,
				...sellerPublicInfo.data.factoryCertifications,
			]);
			setSellerCompany(sellerPublicInfo.data);
			setProducts(products.result);

			if (user?.role !== 'seller') {
				const mySuppliers = await api.buyerSupplier.getAll();
				const mySupplier = mySuppliers.find(
					(supplier: Supplier) => supplier.sellerCompanyId === sellerId
				);
				setIsInMySupplier(mySupplier ? mySupplier : false);
			}

			if (sellerPublicInfo.data.supplierId) {
				const thisSupplierResponse = await api.buyerSupplier.getById(
					sellerPublicInfo.data.supplierId
				);
				setThisSupplier(thisSupplierResponse);
			}
		};
		fetch();
	}, []);

	return (
		<div className={s.wrapper}>
			<div className={s.content}>
				<div className={s.content_left}>
					<CompanyWidget
						sellerCompany={sellerCompany}
						thisSupplier={thisSupplier}
						isInMySuppliers={isInMySupplier}
						handleSaveToMySuppliers={handleSaveToMySuppliers}
						handleRemoveSupplierFromMySuppliers={handleRemoveSupplierFromMySuppliers}
					/>
					<FilesWidget files={files} />
				</div>
				<Table products={products} />
			</div>
		</div>
	);
}

export default SupplierPage;
