import { RfqItem } from '@/types/services/rfq';

export function validateFormData(formData: RfqItem) {
	const { subCategoryId, productName, quantity } = formData;

	const isEmpty = (str: string) => str.trim() === '';

	if (!subCategoryId || isEmpty(productName) || quantity <= 0) {
		return false;
	}

	return true;
}
