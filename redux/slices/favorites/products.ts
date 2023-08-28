import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ResultItem } from '@/types/favorites/products';

interface initialStateType {
	products: ResultItem[];
	activePage: number;
	total: number;
	status: 'pending' | 'seccess' | 'rejected';
}

const initialState: initialStateType = {
	products: [
        {
            "id": 6,
            "productId": 4,
            "userId": 19,
            "createdAt": "2023-08-24T15:12:40.365Z",
            "product": {
                "id": 4,
                "name": "Mountain Collection - SF502 Columbia",
                "sku": "SF502",
                "unitPrice": 40.65,
                "moq": 10,
                "warranty": 5,
                "productOverview": "Solid Polymer Core flooring (aka. SPC) with Enhanced Bevels and Pre-attached Pad",
                "hsCode": "",
                "countryOfOrigin": "Chicago, Dallas, Atlanta",
                "minOrder": 1,
                "leadTime": 1,
                "factoryUnitPriceMinQty": 2.39,
                "factoryUnitPriceLargeQty": 2.19,
                "factoryUnitPriceContainerQty": 1.69,
                "containerQty40ft": "",
                "containerQty20ft": "50 pallets",
                "platformCommissionRate": 12,
                "platformUnitPriceMinQty": 2.68,
                "platformUnitPriceLargeQty": 2.45,
                "platformUnitPriceContainerQty": 1.89,
                "platformOnetimeDiscountedPrice": 1.8,
                "sellersUrl": "",
                "packaging": "50 pallets per boxes",
                "packageInclude": "Flooring/T-Molding/Reducer/End-Cup/Stair Nosing",
                "packageDimension": "",
                "packageWeight": "40lbs per box",
                "status": 0,
                "largeQty": "multiple pallets",
                "unitOfMeasurement": "pallet",
                "sellerCompanyId": 2,
                "subCategoryId": 4,
                "updatedAt": "2023-08-21T10:32:13.072Z",
                "createdAt": "2023-08-21T10:32:13.072Z"
            }
        },
        {
            "id": 9,
            "productId": 3,
            "userId": 19,
            "createdAt": "2023-08-24T15:12:51.061Z",
            "product": {
                "id": 3,
                "name": "Mountain Collection - SF501 Hudson",
                "sku": "SF501",
                "unitPrice": 30,
                "moq": 20,
                "warranty": 5,
                "productOverview": "Solid Polymer Core flooring (aka. SPC) with Enhanced Bevels and Pre-attached Pad",
                "hsCode": "",
                "countryOfOrigin": "Chicago, Dallas, Atlanta",
                "minOrder": 1,
                "leadTime": 1,
                "factoryUnitPriceMinQty": 2.39,
                "factoryUnitPriceLargeQty": 2.19,
                "factoryUnitPriceContainerQty": 1.69,
                "containerQty40ft": "",
                "containerQty20ft": "50 pallets",
                "platformCommissionRate": 12,
                "platformUnitPriceMinQty": 2.68,
                "platformUnitPriceLargeQty": 2.45,
                "platformUnitPriceContainerQty": 1.89,
                "platformOnetimeDiscountedPrice": null,
                "sellersUrl": "",
                "packaging": "50 pallets per boxes",
                "packageInclude": "Flooring/T-Molding/Reducer/End-Cup/Stair Nosing",
                "packageDimension": "",
                "packageWeight": "40lbs per box",
                "status": 0,
                "largeQty": "multiple pallets",
                "unitOfMeasurement": "pallet",
                "sellerCompanyId": 2,
                "subCategoryId": 4,
                "updatedAt": "2023-08-21T10:32:13.072Z",
                "createdAt": "2023-08-21T10:32:13.072Z"
            }
        },
        {
            "id": 10,
            "productId": 2,
            "userId": 19,
            "createdAt": "2023-08-24T15:13:12.920Z",
            "product": {
                "id": 2,
                "name": "Aluminum-clad Wood Window for All Climate",
                "sku": "PASSIVE126",
                "unitPrice": 20,
                "moq": 30,
                "warranty": 10,
                "productOverview": "Passive 126 aluminum-clad Wood System Window, adopting the self-developed high-temperature insulation material and wood structure, makes its thermal insulation performance up to 10 grade, is a PHA grade products, won the international certification of the world's first all-weather award.",
                "hsCode": "7610.10.0010",
                "countryOfOrigin": "China",
                "minOrder": 1,
                "leadTime": 7,
                "factoryUnitPriceMinQty": 402.78,
                "factoryUnitPriceLargeQty": 343.28,
                "factoryUnitPriceContainerQty": 343.28,
                "containerQty40ft": "75 units",
                "containerQty20ft": "35 units",
                "platformCommissionRate": 15,
                "platformUnitPriceMinQty": 463.2,
                "platformUnitPriceLargeQty": 394.77,
                "platformUnitPriceContainerQty": 394.77,
                "platformOnetimeDiscountedPrice": 375,
                "sellersUrl": "",
                "packaging": "wooden frame, wooden box,  steel pallet",
                "packageInclude": "windows",
                "packageDimension": "58'' x 20''",
                "packageWeight": "28 lbs",
                "status": 0,
                "largeQty": "75 units",
                "unitOfMeasurement": "unit",
                "sellerCompanyId": 1,
                "subCategoryId": 2,
                "updatedAt": "2023-08-21T10:32:13.072Z",
                "createdAt": "2023-08-21T10:32:13.072Z"
            }
        },
        {
            "id": 19,
            "productId": 1,
            "userId": 19,
            "createdAt": "2023-08-26T17:43:10.647Z",
            "product": {
                "id": 1,
                "name": "Vinyl Sliding Window",
                "sku": "VIY-538",
                "unitPrice": 10,
                "moq": 40,
                "warranty": 5,
                "productOverview": "Our horizontal sliding windows are made of our exclusive vinyl formula, and are performance tested for excellent weathering, durability and color retention. Sliding windows glide open and closed horizontally for easy access to fresh air.",
                "hsCode": "3925.20.0020",
                "countryOfOrigin": "China",
                "minOrder": 10,
                "leadTime": 4,
                "factoryUnitPriceMinQty": 778.69,
                "factoryUnitPriceLargeQty": 728.69,
                "factoryUnitPriceContainerQty": 678.69,
                "containerQty40ft": "85 units",
                "containerQty20ft": "40 units",
                "platformCommissionRate": 15,
                "platformUnitPriceMinQty": 895.49,
                "platformUnitPriceLargeQty": 837.99,
                "platformUnitPriceContainerQty": 780.49,
                "platformOnetimeDiscountedPrice": null,
                "sellersUrl": "https://www.alibaba.com/product-detail/UPVC-sliding-windows-window-vinyl-pvc_1600901749842.html?spm=a2700.shop_plgr.41413.5.221154a6uk22U1",
                "packaging": "wood pallet + carton corner",
                "packageInclude": "windows",
                "packageDimension": "",
                "packageWeight": "",
                "status": 0,
                "largeQty": "40 units",
                "unitOfMeasurement": "unit",
                "sellerCompanyId": 1,
                "subCategoryId": 1,
                "updatedAt": "2023-08-21T10:32:13.072Z",
                "createdAt": "2023-08-21T10:32:13.072Z"
            }
        }
    ],
	activePage: 1,
	total: 0,
	status: 'pending',
};

const favoritesProductSlice = createSlice({
	name: 'favoritesProducts',
	initialState,
	reducers: {
		setActivePage(state, action: PayloadAction<number>) {
			state.activePage = action.payload;
		},
		setProducts(state, action: PayloadAction<ResultItem[]>) {
			state.products = action.payload;
		},
		setTotal(state, action: PayloadAction<number>) {
			state.total = action.payload;
		},
		setStatus(state, action: PayloadAction<'pending' | 'seccess' | 'rejected'>) {
			state.status = action.payload;
		},
	},
});

export const { setActivePage, setProducts, setTotal, setStatus } =
favoritesProductSlice.actions;

export default favoritesProductSlice.reducer;
