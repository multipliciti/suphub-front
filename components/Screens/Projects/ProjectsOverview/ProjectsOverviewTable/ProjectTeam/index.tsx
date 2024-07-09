'use client';
import React, { useEffect, useState } from 'react';
import UserInitialsAvatar from '@/components/Features/UserInitialsAvatar';
import { setModal } from '@/redux/slices/modal';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { useParams } from 'next/navigation';
import { Api } from '@/services';
import { TeamMember } from '@/types/services/projectTeam';
import Image from 'next/image';
import s from './ProjectTeam.module.scss';
//imgs
import manageTeamIcon from '@/imgs/Buyer&Seller/Projects/white_invite_suppliers.svg';

function ProjectTeam() {
	const modal = useAppSelector((state) => state.modalSlice.modal);
	const dispatch = useAppDispatch();
	const { id: projectId } = useParams();
	const api = Api();

	const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);

	const handleManageTeam = () => {
		dispatch(setModal('manageTeam'));
	};

	const fetchTeamMembers = async () => {
		const response = await api.projectTeamMember.getAll(Number(projectId));
		setTeamMembers(response);
	};

	useEffect(() => {
		if (modal === '') fetchTeamMembers();
	}, [modal]);

	return (
		<div className={s.wrapper}>
			{teamMembers.length > 0 ? (
				<div className={s.avatar_wrapper}>
					{teamMembers.slice(0, 4).map((member, index) => (
						<UserInitialsAvatar member={member} key={index} />
					))}
					{teamMembers.length > 4 && (
						<div className={s.avatar_empty}>
							<span className={s.avatar_empty_text}>+{teamMembers.length - 4}</span>
						</div>
					)}
				</div>
			) : (
				<span>No team members yet</span>
			)}
			<button className={s.button} onClick={handleManageTeam}>
				<Image className={s.button_image} src={manageTeamIcon} alt="send invite" />
				<span className={s.button_text}>Manage team</span>
			</button>
		</div>
	);
}

export default ProjectTeam;
