'use client';
import s from './AddProjectBtn.module.scss';
import addProject_img from '@/imgs/Buyer&Seller/SideBar/addProject.svg';
import Image from 'next/image';

export const AddProjectBtn = () => {
	return (
		<button className={s.add}>
			<Image src={addProject_img} alt="addProject" width={20} height={20} />
			<p className={s.add_title}>Add new project</p>
		</button>
	);
};
