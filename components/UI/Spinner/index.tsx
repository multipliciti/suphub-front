import s from './Spinner.module.scss';
import { classNames } from '@/utils/classNames';

export const Spinner = () => {
	return (
		<div className={classNames(s.loader_wrapper)}>
			<span className={classNames(s.loader)}></span>
		</div>
	);
};
