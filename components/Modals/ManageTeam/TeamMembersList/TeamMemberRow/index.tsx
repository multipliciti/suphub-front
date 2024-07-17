import React from 'react';
import UserInitialsAvatar from '@/components/Features/UserInitialsAvatar';
import { TeamMember } from '@/types/services/projectTeam';
import { getName } from '@/utils/avatar';
import s from './TeamMemberRow.module.scss';
interface TeamMemberProps {
	member: TeamMember;
	handleRemoveTeamMember: (memberId: number) => void;
	handleAddToProject: (email: string) => void;
}

const TeamMemberRow = ({
	member,
	handleRemoveTeamMember,
	handleAddToProject,
}: TeamMemberProps) => {
	return (
		<div className={s.team_member}>
			<div className={s.team_member_content}>
				<div className={s.team_member_avatar}>
					<UserInitialsAvatar member={member} />
				</div>
				<div className={s.team_member_info}>{getName(member)}</div>
			</div>
			<div className={s.team_member_button_wrapper}>
				{member.isMember && member.memberId && (
					<button
						className={s.team_member_button_remove}
						onClick={() => handleRemoveTeamMember(Number(member.memberId))}
					>
						<span className={s.team_member_button_remove_text}>Remove</span>
					</button>
				)}
				{member.isMember || member.isOwner ? (
					<div className={s.team_member_button_role}>
						<span className={s.team_member_button_role_text}>
							{member.isOwner ? 'Owner' : 'Member'}
						</span>
					</div>
				) : (
					<button
						className={s.team_member_button_add}
						onClick={() => handleAddToProject(member.email)}
					>
						<span className={s.team_member_button_add_text}>Add to project</span>
					</button>
				)}
			</div>
		</div>
	);
};

export default TeamMemberRow;
