interface Attribute {
	attributeId: number;
	attributeDescription: string;
	type: string;
	formType: string;
	label: string;
}

type DynamicAttr = Attribute[][];

export function getUniqueLabels(array: DynamicAttr): string[] {
	const labels: string[] = [];
	for (const subArray of array) {
		for (const obj of subArray) {
			const label: string = obj.label;
			if (!labels.includes(label)) {
				labels.push(label);
			}
		}
	}
	return labels;
}
