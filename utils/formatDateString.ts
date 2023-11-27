export function formatDateString(inputDateString: string) {
	const inputDate = new Date(inputDateString);

	const year = inputDate.getFullYear();
	const month = (inputDate.getMonth() + 1).toString().padStart(2, '0');
	const day = inputDate.getDate().toString().padStart(2, '0');

	return `${year}/${month}/${day}`;
}
