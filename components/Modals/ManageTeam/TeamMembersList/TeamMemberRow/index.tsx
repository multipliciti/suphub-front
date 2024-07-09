import React from 'react';
import UserInitialsAvatar from '@/components/Features/UserInitialsAvatar';
import { TeamMember } from '@/types/services/projectTeam';
import { getName } from '@/utils/avatar';
import s from './TeamMemberRow.module.scss';
interface TeamMemberProps {
	member: TeamMember;
	handleRemoveTeamMember: (id: number) => void;
}

const TeamMemberRow = ({ member, handleRemoveTeamMember }: TeamMemberProps) => {
	return (
		<div className={s.team_member}>
			<div className={s.team_member_content}>
				<div className={s.team_member_avatar}>
					<UserInitialsAvatar member={member} />
				</div>
				<div className={s.team_member_info}>{getName(member)}</div>
			</div>
			<div className={s.team_member_button_wrapper}>
				<button
					className={s.team_member_button_remove}
					onClick={() => handleRemoveTeamMember(member.id)}
				>
					<span className={s.team_member_button_remove_text}>Remove</span>
				</button>
				<div className={s.team_member_button_role}>
					<span className={s.team_member_button_role_text}>Member</span>
				</div>
			</div>
		</div>
	);
};

export default TeamMemberRow;
