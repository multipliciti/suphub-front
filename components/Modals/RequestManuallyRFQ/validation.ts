interface formDataType {
	subcategory: string;
	productName: string;
	quantity: string;
	unitBudget: string;
	size: string;
	requiredCertifications: string[];
	images: File[];
	files: File[];
}

export function validateFormData(formData: formDataType) {
	const { subcategory, productName, quantity } = formData;

	const isEmpty = (str: string) => str.trim() === '';

	if (isEmpty(subcategory) || isEmpty(productName) || isEmpty(quantity)) {
		return false;
	}

	return true;
}
