'use client';

import { ProjectsCartTable } from '@/components/Screens/Projects/ProjectsCart/ProjectsCartTable';
import { useAppSelector } from '@/redux/hooks';

export const ProjectsCartElements = () => {
	const projectCart = useAppSelector((state) => state.projectCartSlice.projectCart);

	if (!projectCart) {
		return;
	}

	return (
		<>
			{projectCart.elements.map((item, index) => (
				<ProjectsCartTable key={`${item.sellerName}-${index}`} item={item} />
			))}
		</>
	);
};
