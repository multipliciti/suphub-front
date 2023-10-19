//file for additional functions for naming text and similar lines

//abbreviates the name with an ellipsis in the middle.
export const truncateFileName = (name: string, maxLength: number) => {
	if (name.length > maxLength) {
		const charsToShow = maxLength / 2 - 2; // Two characters are reserved for the ellipsis
		const start = name.substr(0, charsToShow);
		const end = name.substr(-charsToShow);
		return `${start}...${end}`;
	}
	return name;
};

//shortens the name with an ellipsis at the end
export const truncateFileNameEnd = (name: string, maxLength: number) => {
	if (name.length > maxLength) {
		const charsToShow = maxLength - 3; // Three characters are reserved for the ellipsis
		const truncated = name.substr(0, charsToShow);
		return `${truncated}...`;
	}
	return name;
};
