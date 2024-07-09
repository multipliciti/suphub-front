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

	const handleRemoveTeamMember = async (id: number) => {
		await api.projectTeamMember.delete(id);
		await fetchTeamMembers();
	};

	const fetchTeamMembers = async () => {
		const response = await api.projectTeamMember.getAll(projectId);
		setTeamMembers(response);
	};

	useEffect(() => {
		fetchTeamMembers();
	}, []);

	return (
		<div className={s.content}>
			<div className={s.content_title}>Team Members List:</div>
			<div className={s.team_member_wrapper}>
				{teamMembers.length > 0 ? (
					teamMembers.map((member, index) => (
						<TeamMemberRow
							handleRemoveTeamMember={handleRemoveTeamMember}
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
