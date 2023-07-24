export const isEmail = (data: string) => {
	const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
	return emailRegex.test(data);
};

export const isPassword = (data: string) => {
	return data.length < 8 ? false : true;
};
