import { ReactNode } from 'react';

import { StorefrontSidebarLayout } from '@/components/Screens/Storefront/StorefrontLayout/StorefrontSidebarLayout';
import { StorefrontTabSwitcher } from '@/components/Screens/Storefront/StorefrontLayout/StorefrontTabSwitcher';

export default function StorefrontLayout({ children }: { children: ReactNode }) {
	return (
		<StorefrontSidebarLayout>
			<div>
				<StorefrontTabSwitcher />

				<div style={{ padding: '24px 0 24px' }}>{children}</div>
			</div>
		</StorefrontSidebarLayout>
	);
}
