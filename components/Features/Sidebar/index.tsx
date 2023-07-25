import s from './Sidebar.module.scss';
import { Search } from './Search';
import { MapList } from './MapList';
export const Sidebar = () => {
	return (
		<div className={s.wrapper}>
			<h5 className={s.title}>All categories</h5>
			<Search />
			<MapList />
		</div>
	);
};
