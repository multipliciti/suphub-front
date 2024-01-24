export function extractCode(input: string): string {
	const spaceIndex = input.indexOf(' ');
	if (spaceIndex !== -1) {
		return input.substring(0, spaceIndex);
	}
	return input;
}
