export function formatDateString(inputDateString: string) {
	if (inputDateString === '') {
		return '';
	} else if (inputDateString === 'Not Available') {
		return inputDateString;
	}

	const inputDate = new Date(inputDateString);

	const year = inputDate.getFullYear();
	const month = (inputDate.getMonth() + 1).toString().padStart(2, '0');
	const day = inputDate.getDate().toString().padStart(2, '0');

	return `${month}/${day}/${year}`;
}
