export interface Option {
	value: string;
	attrValueId: number;
}

export interface Char {
	attributeId: number;
	attrValueIds: number[];
}

export interface ItemFilter {
	attributeId: number;
	attributeName: string;
	options: Option[];
}

export interface StoreItem {
	[key: string]: number[];
}
