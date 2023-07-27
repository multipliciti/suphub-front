import s from './Marketplace.module.scss';
import { Header } from './Header';
import { Filters } from './Filters';
import { ProductsFilter } from './ProductsFilter';
import { Products } from './Products';

export const Marketplace = () => {
	return (
		<div className={s.wrapper}>
			<div className={'content_container'}>
				<div className={s.header}>
					<Header />
					<Filters />
					<ProductsFilter />
					<Products />
				</div>
			</div>
		</div>
	);
};
