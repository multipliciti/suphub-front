'use client';
import React, { useEffect } from 'react';
import Link from 'next/link';
import { classNames } from '@/utils/classNames';
import s from './Sidebar.module.scss';
import { usePathname } from 'next/navigation';
import { Api } from '@/services';

interface Button {
	label: string;
	href: string;
}
export default function SettingsSidebar() {
	const api = Api();
	const pathname: string = usePathname();
	const [role, setRole] = React.useState<string>('');
	const defaultButton: Button = {
		label: 'Personal Info',
		href: '/settings/personal-info',
	};

	const buyerAndSellerButton: Button = {
		label: 'Company Info',
		href: '/settings/company-info',
	};

	const sellerButton: Button = {
		label: 'Banking Info',
		href: '/settings/banking-info',
	};

	useEffect(() => {
		const fetch = async () => {
			const response = await api.auth.getUser();
			const { role } = response.data;
			setRole(role);
		};
		fetch();
	}, []);

	return (
		<>
			<div className={s.settings_sidebar_menu}>
				<div className={s.settings_title}>Settings</div>
				<div className={s.menu_items}>
					<div
						className={classNames(
							s.menu_btn,
							pathname === defaultButton.href && s.menu_btn_active
						)}
					>
						<Link
							href={defaultButton.href}
							className={classNames(
								s.btn_text,
								pathname === defaultButton.href && s.btn_text_active
							)}
						>
							{defaultButton.label}
						</Link>
					</div>
					{(role === 'buyer' || role === 'seller') && (
						<div
							className={classNames(
								s.menu_btn,
								pathname === buyerAndSellerButton.href && s.menu_btn_active
							)}
						>
							<Link
								href={buyerAndSellerButton.href}
								className={classNames(
									s.btn_text,
									pathname === buyerAndSellerButton.href && s.btn_text_active
								)}
							>
								{buyerAndSellerButton.label}
							</Link>
						</div>
					)}
					{role === 'seller' && (
						<div
							className={classNames(
								s.menu_btn,
								pathname === sellerButton.href && s.menu_btn_active
							)}
						>
							<Link
								href={sellerButton.href}
								className={classNames(
									s.btn_text,
									pathname === sellerButton.href && s.btn_text_active
								)}
							>
								{sellerButton.label}
							</Link>
						</div>
					)}
				</div>
			</div>
		</>
	);
}
