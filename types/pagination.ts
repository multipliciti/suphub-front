export interface PaginationResponse<T> {
	total: number;
	totalPages: number;
	currentPage: number;
	additional: object;
	pagination: string;
	result: T;
}
