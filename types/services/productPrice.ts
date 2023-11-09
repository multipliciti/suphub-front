export interface AddProductPriceData {
	productId: number
	minCount: number
	value: number
}

export interface UpdateProductPriceData {
	priceId: number
	minCount: number
	value: number
}