export interface LoginDto {
	email: string;
	password: string;
}

export type RegisterUserType = {
	firstName: string;
	lastName: string;
	confirmUrl?: string;
} & LoginDto;

export interface NewPasswordType {
	newPassword: string;
	token: string;
}

export interface RecoveryType {
	email: string;
	recoveryUrl?: string;
}

export interface confirmEmailType {
	id: number | null;
	token: string | null;
}

export interface User {
	id: number;
	username: string | null;
	email: string;
	token: string;
	firstName: string;
	lastName: string;
	phone: string | null;
	emailVerified: boolean;
	verificationCode: string | null;
	passwordResetCode: string | null;
	role: string | null;
	lastSignedIn: string | null;
	sellerCompanyId: number | null;
	buyerCompanyId: number | null;
	createdAt: string;
	updatedAt: string;
}

export interface NewPassword {
	oldPassword: string;
	newPassword: string;
}

export interface UpdateUser {
	firstName?: string;
	lastName?: string;
	email?: string;
}
