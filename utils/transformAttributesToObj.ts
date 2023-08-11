interface Attribute {
	attributeId: number;
	attributeDescription: string;
	label: string;
	value: string | number;
}

interface TransformedObject {
	[label: string]: string | number;
}

export function transformAttributesToObj(attr: Attribute[]): TransformedObject {
	const resultObj: TransformedObject = {};
	for (let i = 0; i < 5 && i < attr.length; i++) {
		if (attr[i] && attr[i].label && attr[i].value) {
			const { label, value } = attr[i];
			resultObj[label] = value !== null && value !== '' ? value : '-';
		}
	}

	return resultObj;
}
