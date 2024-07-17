'use client';
import React, { useEffect, useState } from 'react';
import { TeamMember } from '@/types/services/projectTeam';
import TeamMemberRow from './TeamMemberRow';
import { Api } from '@/services';
import s from './TeamMembersList.module.scss';

interface TeamMembersListProps {
	projectId: number;
}

export function TeamMembersList({ projectId }: TeamMembersListProps) {
	const api = Api();

	const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);

	const handleAddToProject = async (email: string) => {
		await api.projectTeamMember.invite({
			projectId,
			email,
			confirmUrl: 'https://notrequired.believeme',
		});
		await fetchTeamMembers();
	};

	const handleRemoveTeamMember = async (memberId: number) => {
		await api.projectTeamMember.delete(memberId);
		await fetchTeamMembers();
	};

	const fetchTeamMembers = async () => {
		const response = await api.projectTeamMember.getAll(projectId);
		setTeamMembers(response);
	};

	const sortTeamMembers = (members: TeamMember[]) => {
		return members.sort((a, b) => {
			if (a.isOwner && !b.isOwner) return -1;
			if (!a.isOwner && b.isOwner) return 1;
			if (a.isMember && !b.isMember) return -1;
			if (!a.isMember && b.isMember) return 1;
			return 0;
		});
	};

	useEffect(() => {
		fetchTeamMembers();
	}, []);

	return (
		<div className={s.content}>
			<div className={s.content_title}>Team Members List:</div>
			<div className={s.team_member_wrapper}>
				{teamMembers.length > 0 ? (
					sortTeamMembers(teamMembers).map((member, index) => (
						<TeamMemberRow
							handleRemoveTeamMember={handleRemoveTeamMember}
							handleAddToProject={handleAddToProject}
							member={member}
							key={index}
						/>
					))
				) : (
					<span className={s.content_empty}>No team members yet</span>
				)}
			</div>
		</div>
	);
}
