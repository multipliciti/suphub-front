import { FC, PropsWithChildren } from 'react';
import Image from 'next/image';

import noProjectEmptyMessage from '@/imgs/Buyer&Seller/Projects/no_projects_empty_message.svg';
import s from './ProjectsEmptyTableMessageWrapper.module.scss';

interface Props {
	title: string;
	text: string;
}

export const ProjectsEmptyTableMessageWrapper: FC<PropsWithChildren<Props>> = (
	props
) => {
	const { title, text, children } = props;
	return (
		<div className={s.wrapper}>
			<Image
				src={noProjectEmptyMessage}
				alt="No projects icon"
				height={185}
				width={250}
			/>
			<div className={s.details}>
				<h2 className={s.details_title}>{title}</h2>

				{text && <div className={s.details_text}>{text}</div>}
			</div>
			{children && <div className={s.main}>{children}</div>}
		</div>
	);
};
