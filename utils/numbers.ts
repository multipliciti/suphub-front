export const formatUnitMeasurement = (
	numeric: number,
	decimals = 2,
	type: 'bytes' | 'bits' = 'bytes'
) => {
	if (numeric === 0) {
		if (type === 'bytes') {
			return '0 Bytes';
		}
		if (type === 'bits') {
			return '0 b/s';
		}
	}

	const k = 1000;
	const dm = decimals < 0 ? 0 : decimals;

	const sizesBytes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB'];
	const sizesBits = ['b/s', 'Kb/s', 'Mb/s', 'Gb/s', 'Tb/s', 'Pb/s'];

	const i = Math.floor(Math.log(numeric) / Math.log(k));

	const sizeName = type === 'bytes' ? sizesBytes[i] : sizesBits[i];

	return parseFloat((numeric / Math.pow(k, i)).toFixed(dm)) + ' ' + sizeName;
};

export const formatNumberAsCurrency = (num: number) => {
	return new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',
	}).format(num);
};
