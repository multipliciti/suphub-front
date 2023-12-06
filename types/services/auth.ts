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

	email: string;
	emailVerified: boolean;
	role: UserRole;

	username?: string;
	firstName?: string;
	lastName?: string;
	phone?: string;
	lastSignedIn?: string;

	sellerCompanyId: number | null;
	buyerCompanyId: number | null;

	createdAt: string;
	updatedAt: string;
}

export type UserRole = 'user' | 'buyer' | 'seller' | 'admin';

export interface NewPassword {
	oldPassword: string;
	newPassword: string;
}

export interface UpdateUser {
	firstName?: string;
	lastName?: string;
	email?: string;
}

export interface PreviousValuesOfCompany {
	wasReturnedToUser?: boolean;
	companyInfo?: {
		companyName?: string;
		street?: string;
		city?: string;
		state?: string;
		country?: string;
		zipcode?: string;
		description?: string;
	};
}

export interface UserDataType {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
}
