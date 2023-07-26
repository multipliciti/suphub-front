import { StaticImageData } from 'next/image';

interface ItemInner {
	img?: StaticImageData;
	text: string;
	id: number;
}

export interface ItemFilter {
	title: string;
	items: ItemInner[];
	id: number;
}

export interface StoreItem {
	[key: string]: number[];
}
