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
	const pathname:string = usePathname();
	const [role, setRole] = React.useState<string>('');
	const defaultButton:Button =
		{
			label: 'Personal Info',
			href: '/settings/personal-info',
		};

	const sellerButtons:Button[] = [
		{
			label: 'Company Info',
			href: '/settings/company-info',
		},
		{
			label: 'Banking Info',
			href: '/settings/banking-info',
		},
	];

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
					{role === 'seller' && sellerButtons.map((button:Button, index:number) => (
						<div
							key={index}
							className={classNames(
								s.menu_btn,
								pathname === button.href && s.menu_btn_active
							)}
						>
							<Link
								href={button.href}
								className={classNames(
									s.btn_text,
									pathname === button.href && s.btn_text_active
								)}
							>
								{button.label}
							</Link>
						</div>
					))}
				</div>
			</div>
		</>
	);
}
