export interface ImageType {
	id: number;

	name: string | null;
	url: string | null;
	mime: string;

	key: string;
	bucket: string;

	updatedAt: string;
	createdAt: string;
}
