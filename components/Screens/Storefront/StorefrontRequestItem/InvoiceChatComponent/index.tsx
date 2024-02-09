'use client';
import s from './InvoiceChatComponent.module.scss';
import { Invoice } from './Invoice';
import { Requirements } from './Requirements/Requirements';
import { useState } from 'react';
import { classNames } from '@/utils/classNames';
import { Spinner } from '@/components/UI/Spinner';

type TypeProps = {
	project: any;
};

export const InvoiceChatComponent = ({ project }: TypeProps) => {
	const [activeDisplay, setActiveDisplay] = useState<number>(1);
	return (
		<div className={s.wrapper}>
			<div className={s.nav}>
				<span
					onClick={() => setActiveDisplay(1)}
					className={classNames(s.nav_item, activeDisplay === 1 && s.nav_active)}
				>
					Quote
				</span>
				<span
					onClick={() => setActiveDisplay(2)}
					className={classNames(s.nav_item, activeDisplay === 2 && s.nav_active)}
				>
					Requirements
				</span>
			</div>

			{/* {isLoading && <Spinner className={s.spinner} />} */}
			{activeDisplay === 1 && <Invoice project={project} />}
			{activeDisplay === 2 && <Requirements />}
		</div>
	);
};
