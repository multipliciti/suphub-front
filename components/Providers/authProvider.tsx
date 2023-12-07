import { FC, PropsWithChildren, useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { Api } from '@/services';
import {
	setUser,
	setStatusGetUser,
	setSellerCompany,
	setBuyerCompany,
} from '@/redux/slices/auth';

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
	const api = Api();
	const dispatch = useAppDispatch();
	const statusGetUser = useAppSelector((state) => state.authSlice.statusGetUser);

	const fetchUser = async () => {
		try {
			const { data } = await api.auth.getUser();

			if (data.role === 'seller' && data.sellerCompanyId) {
				await fetchSellerCompany(data.sellerCompanyId);
			} else if (data.role === 'buyer' && data.buyerCompanyId) {
				await fetchBuyerCompany(data.buyerCompanyId);
			}

			dispatch(setStatusGetUser('seccess'));
			dispatch(setUser(data));
		} catch (errorResponse) {
			dispatch(setStatusGetUser('rejected'));
			dispatch(setUser(null));
			console.error('Error fetching user data:', errorResponse);
		}
	};

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

	useEffect(() => {
		if (statusGetUser !== 'logouted') fetchUser();
	}, []);

	return <>{children}</>;
};
