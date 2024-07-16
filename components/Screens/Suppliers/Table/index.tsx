'use client';
import { Filters } from './Filters';
import { useEffect, useState } from 'react';
import { useAppSelector } from '@/redux/hooks';
import { SuppliersTableEmptyMessage } from './SuppliersTableEmptyMessage/SuppliersTableEmptyMessage';
import { SuppliersTable } from './SuppliersTable';
import { PaginationWrapper } from './PaginationWrapper';
import { Spinner } from '@/components/UI/Spinner';
import { Supplier } from '@/services/suppliers';
import { Api } from '@/services';

export const SuppliersTablePage = () => {
	const modal = useAppSelector((state) => state.modalSlice.modal);
	const api = Api();
	//store filters-inputs value
	const [stateInputs, setStateInputs] = useState({
		search: '',
		categories: [],
	});

	const [totalItems, setTotalItems] = useState<number>(0);
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [totalPages, setTotalPages] = useState<number>(0);
	const limitItems = 8;

	const [suppliers, setSuppliers] = useState<Supplier[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(true);

	//TODO categories filter for table

	const filterSuppliers = (suppliers: Supplier[]) => {
		const searchTerm: string = stateInputs.search;
		return suppliers.filter((supplier) => {
			const searchLower = searchTerm.toLowerCase();

			const checkValue = (value: string | object | null) => {
				if (typeof value === 'string') {
					return value.toLowerCase().includes(searchLower);
				} else if (typeof value === 'object' && value !== null) {
					return Object.values(value).some(checkValue);
				}
				return false;
			};

			return Object.values(supplier).some(checkValue);
		});
	};
	const getCurrentPageSuppliers = () => {
		const filteredSuppliers = filterSuppliers(suppliers);
		const startIndex = (currentPage - 1) * limitItems;
		const endIndex = startIndex + limitItems;
		return filteredSuppliers.slice(startIndex, endIndex);
	};

	const getSuppliers = async () => {
		try {
			const suppliers = await api.buyerSupplier.getAll();
			setSuppliers(suppliers);
			setTotalItems(suppliers.length);
			setTotalPages(Math.ceil(suppliers.length / limitItems));

			setIsLoading(false);
		} catch (error) {
			setIsLoading(false);
			console.error('getSuppliers seller error', error);
		}
	};

	useEffect(() => {
		const filteredSuppliers = filterSuppliers(suppliers);
		setTotalItems(filteredSuppliers.length);
		setTotalPages(Math.ceil(filteredSuppliers.length / limitItems));
	}, [stateInputs.search, suppliers]);

	useEffect(() => {
		if (modal === '') getSuppliers();
	}, [stateInputs, currentPage, modal]);

	return (
		<div>
			<Filters stateInputs={stateInputs} setStateInputs={setStateInputs} />
			{isLoading ? (
				<Spinner style={{ marginTop: '9vh' }} />
			) : suppliers.length > 0 ? (
				<>
					<SuppliersTable data={getCurrentPageSuppliers()} />
					<PaginationWrapper
						limitItems={limitItems}
						totalItems={totalItems}
						currentPage={currentPage}
						setActivePage={setCurrentPage}
						totalPages={totalPages}
					/>
				</>
			) : (
				<SuppliersTableEmptyMessage />
			)}
		</div>
	);
};
