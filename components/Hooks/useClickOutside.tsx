import { RefObject, useEffect } from 'react';

export const useClickOutside = (
	ref: RefObject<HTMLElement>,
	callback: () => void
) => {
	const handleClick = (event: any) => {
		if (ref.current && !ref.current.contains(event.target)) {
			callback();
		}
	};

	useEffect(() => {
		document.addEventListener('click', handleClick, true);

		return () => document.removeEventListener('click', handleClick, true);
	}, []);
};
