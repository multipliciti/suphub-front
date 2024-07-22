import React from 'react';
import { TeamMember } from '@/types/services/projectTeam';
import { getColorFromText, getInitials, getName } from '@/utils/avatar';
import { classNames } from '@/utils/classNames';
import s from './UserInitialsAvatar.module.scss';

interface UserInitialsAvatarProps {
	member: TeamMember;
	size?: 's' | 'm' | 'l';
}
function UserInitialsAvatar({ member, size = 'l' }: UserInitialsAvatarProps) {
	const backgroundColor = getColorFromText(getName(member));

	return (
		<div
			className={classNames(s.avatar, s[`avatar_${size}`])}
			style={{ backgroundColor: backgroundColor }}
		>
			<span className={classNames(s.avatar_text, s[`avatar_text_${size}`])}>
				{getInitials(member)}
			</span>
		</div>
	);
}

export default UserInitialsAvatar;
