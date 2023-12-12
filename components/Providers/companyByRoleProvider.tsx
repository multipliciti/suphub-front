import { FC, PropsWithChildren, useEffect } from 'react';

import { setSellerCompany, setBuyerCompany } from '@/redux/slices/auth';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { Api } from '@/services';

export const CompanyByRoleProvider: FC<PropsWithChildren> = ({ children }) => {
	const api = Api();
	const dispatch = useAppDispatch();
	const user = useAppSelector((state) => state.authSlice.user);

	useEffect(() => {
		if (!user) {
			return;
		}

		if (user.role === 'seller' && user.sellerCompanyId) {
			fetchSellerCompany(user.sellerCompanyId);
		} else if (user.role === 'buyer' && user.buyerCompanyId) {
			fetchBuyerCompany(user.buyerCompanyId);
		}
	}, [user]);

	const fetchSellerCompany = async (sellerCompanyId: number) => {
		try {
			const response = await api.sellerCompany.getById(sellerCompanyId);
			dispatch(setSellerCompany(response.data));
		} catch (e) {
			dispatch(setSellerCompany(null));
		}
	};

	const fetchBuyerCompany = async (buyerCompanyId: number) => {
		try {
			const response = await api.buyerCompany.getById(buyerCompanyId);
			dispatch(setBuyerCompany(response.data));
		} catch (e) {
			dispatch(setBuyerCompany(null));
		}
	};

	return <>{children}</>;
};
