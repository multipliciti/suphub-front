'use client';
import Image from 'next/image';
import '@/styles/globals.scss';
import s from './Header.module.scss';
import { setModal } from '@/redux/slices/modal';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import modal_logo from '@/imgs/Modal/Modal_logo.svg';
import Link from 'next/link';
import { useState } from 'react';
import { classNames } from '@/utils/classNames';
import { useEffect } from 'react';
import { setLoginIn } from '@/redux/slices/auth';
import { parseCookies } from 'nookies';
//img
import logo from '@/imgs/Header/Logo.svg';
import star_img from '@/imgs/Header/Star.svg';
import notifacation_img from '@/imgs/Header/Notification.svg';
import { getCookie } from '@/utils/cookies';

export const Header = () => {
	const dispatch = useAppDispatch();
	const isLoggedIn = useAppSelector((state) => state.authSlice.isLoggedIn);
	const [activeLink, setActiveLink] = useState<number>(1);

	interface Button {
		id: number;
		label: string;
		href: string;
	}

	const buttons: Button[] = [
		{
			id: 1,
			label: 'Marketplace',
			href: '/marketplace',
		},
		{
			id: 2,
			label: 'Projects',
			href: '/marketplace',
		},
	];

	useEffect(() => {
		const cookies = parseCookies();
		const token = cookies.accessToken;
		token ? dispatch(setLoginIn(true)) : dispatch(setLoginIn(false));
	}, []);

	return (
		<header className={`header_container ${s.header}`}>
			{isLoggedIn && (
				<div className={s.wrapper}>
					<div className={s.menu}>
						<Image src={modal_logo} alt="modal_logo" width={32} height={35} />

						<div className={s.buttons}>
							{buttons.map((button) => (
								<div
									className={classNames(
										s.menu_btn,
										activeLink === button.id && s.menu_btn_active
									)}
								>
									<Link
										onClick={() => setActiveLink(button.id)}
										href={button.href}
										className={classNames(
											s.menu_btn,
											activeLink === button.id && s.menu_btn_active
										)}
										key={button.id}
									>
										{button.label}
									</Link>
								</div>
							))}
						</div>
					</div>
					<nav className={s.nav}>
						<ul className={s.nav_ul}>
							<li>
								<div
									className={classNames(
										s.menu_btn,
										activeLink === 3 && s.menu_btn_active
									)}
								>
									<Link
										onClick={() => setActiveLink(3)}
										className={classNames(
											s.menu_btn,
											activeLink === 3 && s.menu_btn_active
										)}
										href={'/'}
									>
										Convert to bussiness
									</Link>
								</div>
							</li>
							<li className={s.split}></li>
							<li className={s.item_img}>
								<Image src={star_img} alt="star_img" width={24} height={24} />
							</li>
							<li className={s.item_img}>
								<Image
									src={notifacation_img}
									alt="notifacation_img"
									width={24}
									height={24}
								/>
							</li>
							<li className={s.item_avatar}>
								<Image src={logo} alt="logo" width={24} height={24} />
							</li>
							<li></li>
							<li></li>
						</ul>
					</nav>
				</div>
			)}

			{!isLoggedIn && (
				<div className={s.wrapper}>
					<Image src={logo} alt="Logo" width={117} height={36} />
					<div className={s.auth}>
						<ul className={s.auth_buttons}>
							<li className={s.selltogether}>Sell with us</li>
							<li className={s.split_hed}></li>
							<li
								className={s.login}
								onClick={() => {
									dispatch(setModal('login'));
								}}
							>
								Log in
							</li>
							<li
								onClick={() => {
									dispatch(setModal('registration'));
								}}
								className={s.signup}
							>
								Sign up
							</li>
						</ul>
					</div>
				</div>
			)}
		</header>
	);
};
