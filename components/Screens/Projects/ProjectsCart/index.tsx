'use client';
import { FC, useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { ProjectsCartElements } from '@/components/Screens/Projects/ProjectsCart/ProjectsCartElements';
import { ProjectsCartMenu } from './ProjectsCartMenu';
import { EmptyMessage } from '@/components/Features/EmptyMessage';
import { Api } from '@/services';
import {
	SelectedRows,
	setStatus,
	setProjectCart,
	setSelectedRows,
	reset,
} from '@/redux/slices/projects/projectsCart';

import s from './ProjectCart.module.scss';
import { Spinner } from '@/components/UI/Spinner';

interface Props {
	id: number;
}

export const ProjectsCart: FC<Props> = ({ id }) => {
	const api = Api();
	const dispatch = useAppDispatch();

	const status = useAppSelector((state) => state.projectCartSlice.status);
	const projectCart = useAppSelector((state) => state.projectCartSlice.projectCart);

	useEffect(() => {
		fetchCarts();

		return () => {
			dispatch(reset());
		};
	}, []);

	const fetchCarts = async () => {
		try {
			dispatch(setStatus('loading'));

			const response = await api.cart.findByProjectId(id);

			const selectedRows: SelectedRows[] = response.elements.map((item) => {
				return {
					sellerId: item.sellerId,
					selectedIds: [],
					allProductIds: item.products.map((item) => item.id),
				};
			});

			dispatch(setProjectCart(response));
			dispatch(setSelectedRows(selectedRows));
			dispatch(setStatus('success'));
		} catch (e) {
			dispatch(setStatus('rejected'));
		}
	};

	return (
		<div className={s.wrapper}>
			{(status === 'idle' || status === 'loading') && <Spinner />}

			{status === 'rejected' && <div>Something went wrong</div>}

			{status === 'success' &&
				(projectCart && projectCart.elements.length > 0 ? (
					<>
						<ProjectsCartElements />
						<ProjectsCartMenu />
					</>
				) : (
					<EmptyMessage
						title="The cart is empty"
						text="You don't have any items in the cart"
					/>
				))}
		</div>
	);
};
