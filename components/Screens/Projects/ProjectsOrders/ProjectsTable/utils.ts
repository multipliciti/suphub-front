export function formatDate(isoDateString: string): string {
	if (isoDateString === 'Not Available') {
		return isoDateString;
	}
	const date = new Date(isoDateString);
	const day = date.getDate();
	const month = date.getMonth() + 1;
	const year = date.getFullYear();

	const formattedDay = day < 10 ? `0${day}` : `${day}`;
	const formattedMonth = month < 10 ? `0${month}` : `${month}`;

	return `${formattedDay}/${formattedMonth}/${year}`;
}
