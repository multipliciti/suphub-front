import React from 'react';
import { SuppliersTablePage } from '@/components/Screens/Suppliers/Table';
import SuppliersHeader from '@/components/Screens/Suppliers/Header';

function Suppliers() {
	return (
		<>
			<SuppliersHeader />
			<SuppliersTablePage />
		</>
	);
}

export default Suppliers;
