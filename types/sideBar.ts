export interface itemInner {
	id: number;
	title: string;
}

export interface Item {
	id: number;
	title: string;
	innerItems?: itemInner[];
}
