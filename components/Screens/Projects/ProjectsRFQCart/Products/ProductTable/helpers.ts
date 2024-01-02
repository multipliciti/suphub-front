export function extractDigits(inputString: string): string {
	for (let i = inputString.length - 1; i >= 0; i--) {
		if (/\d/.test(inputString[i])) {
			return inputString.slice(0, i + 1);
		}
	}

	return '';
}
