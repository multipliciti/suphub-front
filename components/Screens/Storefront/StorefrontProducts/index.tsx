import { StorefrontProductsFilters } from './Filters';
import { StorefrontProductsTable } from './Table';

export const StorefrontProducts = () => {
	return (
		<>
			<StorefrontProductsFilters />
			<StorefrontProductsTable />
		</>
	);
};
