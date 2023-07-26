import type { Metadata } from 'next';
import { Sidebar } from '@/components/Features/Sidebar';

export const metadata: Metadata = {
	title: 'marketplace',
	description: 'marketplace',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className="wrp">
			<Sidebar />
			{children}
		</div>
	);
}
