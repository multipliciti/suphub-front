import { FC, InputHTMLAttributes, useState } from 'react';

import { Input } from '@/components/UI/Input';

import s from '../ProjectsOverviewTable.module.scss';

interface Props extends InputHTMLAttributes<HTMLInputElement> {}

export const ProjectTableInput: FC<Props> = (props) => {
	const [isFocused, setIsFocused] = useState(false);

	return (
		<td className={isFocused ? s.td_active : ''}>
			<Input
				withBorder={false}
				withFocusBorder={false}
				onFocus={() => setIsFocused(true)}
				onBlur={() => setIsFocused(false)}
				style={{ backgroundColor: 'transparent' }}
				{...props}
			/>
		</td>
	);
};
