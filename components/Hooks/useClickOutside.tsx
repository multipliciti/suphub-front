import { useEffect, RefObject } from 'react';

export const useClickOutside = <T extends HTMLElement>(
	ref: RefObject<T>,
	onClickOutside: () => void
): void => {
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (ref.current && !ref.current.contains(event.target as Node)) {
				onClickOutside();
			}
		};

		document.addEventListener('click', handleClickOutside);

		return () => {
			document.removeEventListener('click', handleClickOutside);
		};
	}, [ref, onClickOutside]);
};
