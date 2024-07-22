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
	email: string;
	buyerCompanyId: number;
	isMember: boolean;
	isOwner: boolean;
	memberId: null | number;
	firstName: null | string;
	lastName: null | string;
	username: null | string;
	avatar: null | string;
}

export interface TeamMemberActive extends TeamMember {
	memberId: number;
}
