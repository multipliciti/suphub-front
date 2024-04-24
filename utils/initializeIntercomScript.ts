import { User } from '@/types/services/auth';

export const initializeIntercomScript = (userResponse: User | null) => {
	try {
		if (!userResponse) {
			// @ts-ignore
			window.intercomSettings = {
				api_base: 'https://api-iam.intercom.io',
				app_id: 'strk46bw',
			};
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
			app_id: 'strk46bw',
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
