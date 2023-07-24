'use client';
import Image from 'next/image';
import '@/styles/globals.scss';
import s from './Header.module.scss';
import { setModal } from '@/redux/slices/modal';
import { useAppDispatch } from '@/redux/hooks';
//img
import logo from '@/imgs/Header/Logo.svg';

export const Header = () => {
	const dispatch = useAppDispatch();
	return (
		<header className={`header_container ${s.header}`}>
			<div className={s.wrapper}>
				<Image src={logo} alt="Logo" width={117} height={36} />
				<div className={s.auth}>
					<ul className={s.auth_buttons}>
						<li className={s.selltogether}>Sell with us</li>
						<li className={s.split}></li>
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
		</header>
	);
};
