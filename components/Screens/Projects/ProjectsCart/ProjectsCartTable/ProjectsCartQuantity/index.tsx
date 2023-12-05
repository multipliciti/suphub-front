'use client';
import { FC, useEffect, useState } from 'react';
import debounce from 'lodash.debounce';

import { findAndChangeProductQuantity } from '@/redux/slices/projects/projectsCart';
import { useIsFirstRender } from '@/components/Hooks/useIsFirstRender';
import { useAppDispatch } from '@/redux/hooks';
import { InputQuantity } from '@/components/UI/InputQuantity';
import { Api } from '@/services';

interface Props {
	sellerId: number;
	productId: number;
	initQuantity: number;
}

export const ProjectsCartQuantity: FC<Props> = (props) => {
	const { sellerId, productId, initQuantity } = props;

	const api = Api();
	const dispatch = useAppDispatch();

	const isFirstRender = useIsFirstRender();

	const [quantity, setQuantity] = useState(initQuantity);

	const debouncedUpdate = debounce(() => update(), 300);

	useEffect(() => {
		if (isFirstRender) {
			return;
		}
		debouncedUpdate();
	}, [quantity]);

	useEffect(() => {
		return () => {
			debouncedUpdate.cancel();
		};
	}, [debouncedUpdate]);

	const update = async () => {
		try {
			await api.cart.update(productId, { quantity });
		} catch (e) {
			console.log(e);
		}
	};

	const handleChange = (value: number) => {
		setQuantity(value);
		dispatch(
			findAndChangeProductQuantity({
				sellerId,
				productId,
				value,
			})
		);
	};

	return <InputQuantity value={quantity} onChange={handleChange} />;
};
