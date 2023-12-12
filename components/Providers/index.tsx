'use client';
import { FC, PropsWithChildren } from 'react';
import { Provider } from 'react-redux';

import { store } from '@/redux/store';
import { CompanyByRoleProvider } from '@/components/Providers/companyByRoleProvider';
import { AuthProvider } from '@/components/Providers/authProvider';

export const MainProvider: FC<PropsWithChildren> = ({ children }) => {
	return (
		<Provider store={store}>
			<AuthProvider>
				<CompanyByRoleProvider>{children}</CompanyByRoleProvider>
			</AuthProvider>
		</Provider>
	);
};
