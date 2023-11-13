'use client';
import Image from 'next/image';
import '@/styles/globals.scss';
import s from './Header.module.scss';
import { setModal } from '@/redux/slices/modal';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import modal_logo from '@/imgs/Modal/Modal_logo.svg';
import Link from 'next/link';
import { useState } from 'react';
import { setStatusGetUser, setUser } from '@/redux/slices/auth';
import { classNames } from '@/utils/classNames';
import { useEffect } from 'react';
import { Api } from '@/services';
import { useRouter } from 'next/navigation';
//imgs
import Arrow from '@/imgs/Header/menu/Arrow.svg';
import Calendar from '@/imgs/Header/menu/Calendar.svg';
import Comment from '@/imgs/Header/menu/Comment.svg';
import User from '@/imgs/Header/menu/User.svg';
import logo from '@/imgs/Header/Logo.svg';
import LogOut from '@/imgs/Header/LogOut.svg';
import star_img from '@/imgs/Header/Star.svg';
import notifacation_img from '@/imgs/Header/Notification.svg';
import avatartest from '@/imgs/Header/AvatarsTest.svg';

interface Button {
	id: number;
	label: string;
	href: string;
}

export const Header = () => {
	const api = Api();
	const dispatch = useAppDispatch();
	const user = useAppSelector((state) => state.authSlice.user);
	const statusGetUser = useAppSelector((state) => state.authSlice.statusGetUser);
	const [activeLink, setActiveLink] = useState<number>(1);
	const [menu, setMenu] = useState<boolean>(false);
	const router = useRouter();
	const menuItems = [
		{
			id: 1,
			img: User,
			title: 'My profile',
			href: '/settings/personal-info',
		},
		{
			id: 2,
			img: Arrow,
			title: 'Convert to business',
			href: '/404',
		},
		{
			id: 3,
			img: Comment,
			title: 'Send Feedback',
			href: '/404',
		},
		{
			id: 4,
			img: Calendar,
			title: 'Book a call',
			href: '/404',
		},
	];
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
		{
			id: 3,
			label: 'My Storefront',
			href: '/storefront/products',
		},
	];

	const fetchUser = async () => {
		try {
			const responce = await api.auth.getUser();

			if (responce.data) {
				const user = responce.data;
				dispatch(setStatusGetUser('seccess'));
				dispatch(setUser(user));
			}
		} catch (error) {
			dispatch(setStatusGetUser('rejected'));
			dispatch(setUser(null));
			console.error('Error fetching user data:', error);
		}
	};

	useEffect(() => {
		if (statusGetUser !== 'logouted') fetchUser();
	}, []);

	const fetchLogOut = async () => {
		try {
			const response = await api.auth.logout();
			if (response) {
				dispatch(setUser(null));
				dispatch(setStatusGetUser('logouted'));
				router.push('/');
			}
		} catch (error: any) {}
	};

	return (
		<header className={`header_container ${s.header}`}>
			{user && (
				<div className={s.wrapper}>
					<div className={s.menu}>
						<Image src={modal_logo} alt="modal_logo" width={32} height={35} />

						<div className={s.buttons}>
							{buttons.map((button, index) => (
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
										onClick={(e) => {
											e.stopPropagation();
											setActiveLink(3);
										}}
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
									onClick={(e) => {
										e.stopPropagation();
										setMenu(!menu);
									}}
									className={s.avatar}
									src={avatartest}
									alt="avatar"
									width={24}
									height={24}
								/>
								{menu && (
									<div className={s.menu}>
										<div className={s.header}>
											<Image src={avatartest} alt="avatar" width={36} height={36} />
											<div className={s.header_info}>
												<span className={s.header_info_name}>{user.firstName} </span>
												<span className={s.header_info_person}>Personal</span>
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
											<span className={s.text}> Log out</span>
										</button>
									</div>
								)}
							</li>

							<li></li>
							<li></li>
						</ul>
					</nav>
				</div>
			)}

			{!user && (
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
