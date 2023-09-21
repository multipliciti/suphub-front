import { ProductFilterItem } from "@/types/products/productFilters";

export function CheckfiltersEmpty(filters: ProductFilterItem[]): boolean {
    return filters.some((filter) => {
      return (
        (filter.redioItems && filter.redioItems.length > 0) ||
        (filter.selectedItems && filter.selectedItems.length > 0) ||
        (filter.min !== undefined && filter.min !== ""  && filter.min !== 0) ||
        (filter.max !== undefined && filter.max !== "" && filter.max !== 0 )
      );
    });
  }
  