import { useEffect, useRef } from 'react';

export const useAutosizeTextArea = (value: string) => {
	const textAreaRef = useRef<HTMLTextAreaElement | null>(null);

	useEffect(() => {
		const handleResize = () => {
			if (textAreaRef && textAreaRef.current) {
				textAreaRef.current.style.height = '0px';
				const scrollHeight = textAreaRef.current.scrollHeight;
				textAreaRef.current.style.height = scrollHeight + 'px';
			}
		};

		handleResize();

		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, [value]);

	return textAreaRef;
};
