export interface InviteTeamMemberBody {
	projectId: number;
	email: string;
	confirmUrl: string;
}

export interface AssignTeamMemberToRFQBody {
	rfqId: number;
}

export interface TeamMember {
	id: number;
	projectId: number;
	managerId: number;
	manager: {
		firstName: string | null;
		lastName: string | null;
		email: string;
		username: string | null;
		avatar: string | null;
	};
}
