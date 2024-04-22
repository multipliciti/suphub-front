import { User } from '@/types/services/auth';

export const initializeIntercomScript = (userResponse: User) => {
	try {
		const INTERCOM_APP_ID = process.env.NEXT_PUBLIC_INTERCOM_APP_ID;
		if (!INTERCOM_APP_ID) {
			console.error(
				'IntercomScript initialization error: INTERCOM_APP_ID is not defined'
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
		window.intercomSettings = {
			api_base: 'https://api-iam.intercom.io',
			app_id: INTERCOM_APP_ID,
			id: id,
			email: email,
			role: role,
			...(firstName && { firstName: firstName }),
			...(lastName && { lastName: lastName }),
			...(phone?.trim() && { phone: phone }),
			...(sellerCompanyId && { sellerCompanyId: sellerCompanyId }),
			...(buyerCompanyId && { buyerCompanyId: buyerCompanyId }),
			...(createdAt && { createdAt: createdAt }),
		};
	} catch (e) {
		console.error('Intercom initialization error', e);
	}
};
