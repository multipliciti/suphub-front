import { FC, PropsWithChildren, useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { setUser, setStatusGetUser } from '@/redux/slices/auth';
import { Api } from '@/services';

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
	const api = Api();
	const dispatch = useAppDispatch();

	const statusGetUser = useAppSelector((state) => state.authSlice.statusGetUser);

	const fetchUser = async () => {
		try {
			const { data } = await api.auth.getUser();

			dispatch(setStatusGetUser('success'));
			dispatch(setUser(data));
		} catch (errorResponse) {
			dispatch(setStatusGetUser('rejected'));
			dispatch(setUser(null));
			console.error('Error fetching user data:', errorResponse);
		}
	};

	useEffect(() => {
		if (statusGetUser !== 'logouted') fetchUser();
	}, []);

	return <>{children}</>;
};
