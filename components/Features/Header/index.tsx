'use client';
import { useState, useRef, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { setStatusGetUser, setUser } from '@/redux/slices/auth';
import { useClickOutside } from '@/components/Hooks/useClickOutside';
import { classNames } from '@/utils/classNames';
import { resetState } from '@/redux/reducers';
import { setModal } from '@/redux/slices/modal';
import { Api } from '@/services';
import { buttonsSeller, buttonsBuyer, regularUser, logOutUser } from './Buttons';

import s from './Header.module.scss';
import '@/styles/globals.scss';

//imgs
import Calendar from '@/imgs/Header/menu/Calendar.svg';
import User from '@/imgs/Header/menu/User.svg';
import logo from '@/imgs/Header/Logo.svg';
import LogOut from '@/imgs/Header/LogOut.svg';
import star_img from '@/imgs/Header/Star.svg';
import notifacation_img from '@/imgs/Header/Notification.svg';
import avatartest from '@/imgs/Header/AvatarsTest.svg';

export const Header = () => {
	const api = Api();
	const dispatch = useAppDispatch();
	const user = useAppSelector((state) => state.authSlice.user) || null;
	const sellerCompany = useAppSelector((state) => state.authSlice.sellerCompany);
	const buyerCompany = useAppSelector((state) => state.authSlice.buyerCompany);
	const menuRef = useRef<HTMLDivElement | null>(null);
	const [activeLink, setActiveLink] = useState<number>(1);
	const [logoSrc, setLogoSrc] = useState(avatartest);
	const [menu, setMenu] = useState<boolean>(false);
	const router = useRouter();
	const pathname = usePathname();

	useClickOutside(menuRef, () => {
		setMenu(false);
	});

	const menuItems = [
		{
			id: 1,
			img: User,
			title: 'My profile',
			href: '/settings/personal-info',
		},
		{
			id: 2,
			img: Calendar,
			title: 'Book a call',
			href: '/404',
		},
	];

	const displayRole = () => {
		switch (user?.role) {
			case 'buyer':
				return 'Buyer';
			case 'seller':
				return 'Seller';
			default:
				return 'Personal';
		}
	};

	const handleLogo = () => {
		let company;
		const role = user?.role;
		if (role === 'seller') company = sellerCompany;
		else if (role === 'buyer') company = buyerCompany;
		else return;
		if (company?.logo?.url) setLogoSrc(company?.logo.url);
	};

	const setDefaultActiveLink = () => {
		let buttons = regularUser;
		if (user?.role === 'seller') buttons = buttonsSeller;
		else if (user?.role === 'buyer') buttons = buttonsBuyer;

		const activeButton = buttons.find((button) => pathname.includes(button.href));

		if (activeButton) setActiveLink(activeButton.id);
	};

	const fetchLogOut = async () => {
		try {
			await api.auth.logout();

			setLogoSrc(avatartest);

			dispatch(setUser(null));
			dispatch(resetState());
			dispatch(setStatusGetUser('logouted'));

			router.push('/');
		} catch (error) {}
	};

	useEffect(() => {
		setDefaultActiveLink();
		handleLogo();
	}, [user, sellerCompany, buyerCompany]);

	return (
		<header className={`header_container ${s.header}`}>
			{user && (
				<div className={s.wrapper}>
					<div className={s.menu}>
						<span className={s.logo}>
							<Image src={logo} alt="Logo" width={117} height={36} />
							{user.role === 'seller' && (
								<span className={s.seller}>Seller Center</span>
							)}
						</span>
						{/* seller nav  */}
						{user.role === 'seller' && (
							<div className={s.buttons}>
								{buttonsSeller.map((button, index) => (
									<div
										key={index}
										className={classNames(
											s.menu_btn,
											activeLink === button.id && s.menu_btn_active
										)}
									>
										<Link
											onClick={(e) => {
												e.stopPropagation();
												setActiveLink(button.id);
											}}
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
						)}
						{/* buyer nav  */}
						{user && user.role === 'buyer' && (
							<div className={s.buttons}>
								{buttonsBuyer.map((button, index) => (
									<div
										key={index}
										className={classNames(
											s.menu_btn,
											activeLink === button.id && s.menu_btn_active
										)}
									>
										<Link
											onClick={(e) => {
												e.stopPropagation();
												setActiveLink(button.id);
											}}
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
						)}

						{/* regular user nav  */}
						{user && user.role !== 'buyer' && user.role !== 'seller' && (
							<div className={s.buttons}>
								{regularUser.map((button, index) => (
									<div
										key={index}
										className={classNames(
											s.menu_btn,
											activeLink === button.id && s.menu_btn_active
										)}
									>
										<Link
											onClick={(e) => {
												e.stopPropagation();
												setActiveLink(button.id);
											}}
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
						)}
					</div>

					{/* // nav  */}
					<nav className={s.nav}>
						<ul className={s.nav_ul}>
							<li className={s.split}></li>
							<li className={s.item_img}>
								<Link href={'/favorites'}>
									<Image src={star_img} alt="star_img" width={24} height={24} />
								</Link>
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
								<Image
									onClick={() => {
										setMenu(!menu);
									}}
									className={s.avatar}
									src={logoSrc}
									alt="avatar"
									width={24}
									height={24}
								/>
								{menu && user && (
									<div ref={menuRef} className={s.menu}>
										<div className={s.header}>
											<Image
												src={logoSrc}
												alt="avatar"
												className={s.avatar_menu}
												width={36}
												height={36}
											/>
											<div className={s.header_info}>
												<span className={s.header_info_name}>{user.firstName}</span>
												<span className={s.header_info_person}>{displayRole()}</span>
											</div>
										</div>

										<div className={s.menu_items}>
											{menuItems.map((el: any, ind) => {
												return (
													<Link href={el.href} key={ind} className={s.item}>
														<Image src={el.img} alt="el" width={20} height={20} />
														<span className={s.title}>{el.title}</span>
													</Link>
												);
											})}
										</div>

										<button
											onClick={(e) => {
												e.stopPropagation();
												fetchLogOut();
											}}
											className={s.logout}
										>
											<Image src={LogOut} alt="el" width={20} height={20} />
											<span className={s.text}>Log out</span>
										</button>
									</div>
								)}
							</li>
						</ul>
					</nav>
				</div>
			)}

			{!user && (
				<div className={s.wrapper}>
					<div className={s.menu}>
						<Image
							className={s.img_logo}
							src={logo}
							alt="Logo"
							width={117}
							height={36}
						/>
						<div className={s.buttons}>
							{logOutUser.map((button, index) => (
								<div
									key={index}
									className={classNames(
										s.menu_btn,
										activeLink === button.id && s.menu_btn_active
									)}
								>
									<Link
										onClick={(e) => {
											e.stopPropagation();
											setActiveLink(button.id);
										}}
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

					<div className={s.auth}>
						<ul className={s.auth_buttons}>
							<li
								className={s.selltogether}
								onClick={() => {
									dispatch(setModal('createBusinessAccount'));
								}}
							>
								Sell with us
							</li>
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
									dispatch(setModal('createBusinessAccount'));
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
