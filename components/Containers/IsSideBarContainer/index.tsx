'use client';
import { classNames } from '@/utils/classNames';
import { useAppSelector } from '@/redux/hooks';
import { Sidebar } from '@/components/Features/Sidebar';
import s from './IsSideBarContainer.module.scss';
import { useEffect, useState } from 'react';
import { Api } from '@/services';
import { CategoryItem } from '@/types/sideBar';


export const IsSideBarContainer = ({ children }: { children: React.ReactNode }) => {
	const api = Api()
	const isSideBar = useAppSelector((state) => state.sideBarSlice.sideBar);
	const [categories, setCategories] = useState<CategoryItem[]>([]);
  console.log('categories', categories)

	const fetchCategories = async () => {
		try {
		const response = await api.sideBar.getCategoryies();
		if (response.success) {
		  setCategories(response.data); // Предполагается, что данные хранятся в поле data
		} else {
			console.error('Failed to fetch categories:', response.error);
		}
	} catch (error) {
		console.error('Error fetching categories:', error);
	}
	};

	useEffect(() => {
		fetchCategories();
	}, []);

	return (
		<div>
			<Sidebar categories={categories} />
			<div
				className={classNames(
					'content_container',
					isSideBar && 'content_container_sidebar'
				)}
			>
				{children}
			</div>
		</div>
	);
};
