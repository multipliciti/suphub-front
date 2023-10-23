'use client';
import React from 'react';
import BuyerCompanyInfo from '@/components/Screens/ProfileSettings/CompanyInfo/Buyer';
import SellerCompanyInfo from '@/components/Screens/ProfileSettings/CompanyInfo/Seller';
import { useAppSelector } from '@/redux/hooks';

function Page() {
	const role = useAppSelector((state) => state.authSlice?.user?.role);

	return (
		<>
			{role === 'buyer' && <BuyerCompanyInfo />}
			{role === 'seller' && <SellerCompanyInfo />}
		</>
	);
}

export default Page;
