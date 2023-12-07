'use client';
import { FC, PropsWithChildren } from 'react';
import { Provider } from 'react-redux';

import { AuthProvider } from '@/components/Providers/authProvider';
import { store } from '@/redux/store';

export const MainProvider: FC<PropsWithChildren> = ({ children }) => {
	return (
		<Provider store={store}>
			<AuthProvider>{children}</AuthProvider>
		</Provider>
	);
};
