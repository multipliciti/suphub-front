import { FC, PropsWithChildren } from 'react';

import s from './TableWrapper.module.scss';

interface Props {}

export const TableWrapper: FC<PropsWithChildren<Props>> = ({ children }) => {
	return <table className={s.table}>{children}</table>;
};
