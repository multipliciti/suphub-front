const BASE_URL = process.env.NEXT_PUBLIC_CLIENT_HOST || '';

export const ROUTES = {
	index: BASE_URL,
	confirmEmail: `${BASE_URL}/auth/confirm-email`,
	adminNewAccountApplicationUrl: `${BASE_URL}/mail-handler/admin/new-account-application`,
};
