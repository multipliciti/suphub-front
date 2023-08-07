import s from './NoResults.module.scss';

export const NoResults = () => {
	return (
		<div className={s.wrapper}>
			<h3 className={s.title}>No results</h3>
			<p className={s.subtitle}>Please change your search or clear your filters.</p>
			<button className={s.btn}>Сlear filters</button>
		</div>
	);
};
