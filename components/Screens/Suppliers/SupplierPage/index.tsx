import React from 'react';
import CompanyWidget from './CompanyWidget';
import FilesWidget from './FilesWidget';
import Table from './Table';
import s from './SupplierPage.module.scss';

function SupplierPage() {
	return (
		<div className={s.wrapper}>
			<div className={s.content}>
				<div className={s.content_left}>
					<CompanyWidget />
					<FilesWidget />
				</div>
				<Table />
			</div>
		</div>
	);
}

export default SupplierPage;
