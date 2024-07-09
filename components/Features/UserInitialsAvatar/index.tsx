import React from 'react';
import { TeamMember } from '@/types/services/projectTeam';
import { getColorFromText, getInitials, getName } from '@/utils/avatar';
import s from './UserInitialsAvatar.module.scss';

interface UserInitialsAvatarProps {
	member: TeamMember;
}
function UserInitialsAvatar({ member }: UserInitialsAvatarProps) {
	const backgroundColor = getColorFromText(getName(member));

	return (
		<div className={s.avatar} style={{ backgroundColor: backgroundColor }}>
			<span className={s.avatar_text}>{getInitials(member)}</span>
		</div>
	);
}

export default UserInitialsAvatar;
