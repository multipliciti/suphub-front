import { User } from '@/types/services/auth';

export const initializePendoScript = (userResponse: User) => {
	try {
		const PENDO_API_KEY = process.env.NEXT_PUBLIC_PENDO_API_KEY;
		if (!PENDO_API_KEY) {
			console.error(
				'PendoScript initialization error: PENDO_API_KEY is not defined'
			);
			return;
		}

		const {
			id,
			email,
			firstName,
			lastName,
			role,
			phone,
			sellerCompanyId,
			buyerCompanyId,
			createdAt,
		} = userResponse;
		// @ts-ignore
		window.pendo.initialize({
			visitor: {
				id: id,
				email: email,
				role: role,
				...(firstName && { firstName: firstName }),
				...(lastName && { lastName: lastName }),
				...(phone?.trim() && { phone: phone }),
				...(sellerCompanyId && { sellerCompanyId: sellerCompanyId }),
				...(buyerCompanyId && { buyerCompanyId: buyerCompanyId }),
				...(createdAt && { createdAt: createdAt }),
			},
			account: {
				id: id,
				accountName: email,
			},
		});
	} catch (e) {
		console.error('PendoScript initialization error', e);
	}
};
