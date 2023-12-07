import type { Metadata } from 'next';
import { Lato } from 'next/font/google';

import { MainProvider } from '@/components/Providers';
import { Header } from '@/components/Features/Header';
import { Modal } from '@/components/Modals';

import '@/styles/globals.scss';

export const metadata: Metadata = {
	title: 'Suphub',
	description: 'Suphub',
};

const lato = Lato({
	weight: ['300', '400', '700', '900'],
	style: ['normal', 'italic'],
	subsets: ['latin'],
	display: 'swap',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body className={lato.className}>
				<MainProvider>
					<Header />
					<main className="main">{children}</main>
					<div id="root-modals">
						<Modal />
					</div>
				</MainProvider>
			</body>
		</html>
	);
}
