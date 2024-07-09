'use client';
import Image from 'next/image';
import { useAppDispatch } from '@/redux/hooks';
import { setModal } from '@/redux/slices/modal';
import s from './TeamMembersInvited.module.scss';
//imgs
import invitedIcon from '@/imgs/Buyer&Seller/submitedRFQ.svg';
import close_img from '@/imgs/close.svg';

export const TeamMembersInvited = () => {
	const dispatch = useAppDispatch();
	return (
		<div className={s.wrapper}>
			<div className={s.header}>
				<Image
					onClick={() => dispatch(setModal(''))}
					className={s.header_close}
					src={close_img}
					alt="close_img"
					width={20}
					height={20}
				/>
			</div>
			<div className={s.wrapper_inner}>
				<Image src={invitedIcon} alt="teamInvited" width={128} height={128} />

				<div className={s.description}>
					<h3 className={s.title}>Team members invited</h3>
					<p className={s.subtitle}>
						Invitations have been sent to the selected team members
					</p>
				</div>

				<button
					onClick={() => dispatch(setModal('manageTeam'))}
					className={s.submit}
				>
					Invite more team members
				</button>
			</div>
		</div>
	);
};
