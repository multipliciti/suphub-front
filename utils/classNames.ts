export const classNames = (
	...classes: (string | false | null | undefined)[]
): string => {
	return classes.filter(Boolean).join(' ');
};
