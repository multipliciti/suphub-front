import s from './Marketplace.module.scss';
import { Header } from './Header';
import { Filters } from './Filters';

export const Marketplace = () => {
	return (
		<div className={s.wrapper}>
			<div className={'content_container'}>
				<div className={s.header}>
					<Header />
					<Filters />
				</div>
			</div>
		</div>
	);
};
