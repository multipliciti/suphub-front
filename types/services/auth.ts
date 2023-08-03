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
