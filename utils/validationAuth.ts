//file for additional functions for validation
export const isPassword = (data: string) => {
	const res = data.length < 8 ? false : true;
	return res;
};

export const matchingPassword = (data: string, password: string) => {
	return data === password;
};

export const isEmail = (data: string) => {
	const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
	const res = emailRegex.test(data);
	return res;
};
