'use client';
import React from 'react';
import Link from 'next/link';
import { classNames } from '@/utils/classNames';
import s from './Sidebar.module.scss';

export default function SettingsSidebar() {
	const [activeLink, setActiveLink] = React.useState(1);
	const buttons: any[] = [
		{
			id: 1,
			label: 'Personal Info',
			href: '/settings/personal-info',
		},
		{
			id: 2,
			label: 'Company Info',
			href: '/settings/company-info',
		},
		{
			id: 3,
			label: 'Banking Info',
			href: '/settings/banking-info',
		},
	];
	return (
		<>
			<div className={s.settings_sidebar_menu}>
				<div className={s.settings_title}>Settings</div>
				<div className={s.menu_items}>
					{buttons.map((button) => (
						<div
							className={classNames(
								s.menu_btn,
								activeLink === button.id && s.menu_btn_active,
							)}
						>
							<Link
								onClick={(e) => {
									e.stopPropagation();
									setActiveLink(button.id);
								}}
								href={button.href}
								className={classNames(
									s.btn_text,
									activeLink === button.id && s.btn_text_active,
								)}
								key={button.id}
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
