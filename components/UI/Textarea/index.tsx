import { forwardRef, TextareaHTMLAttributes } from 'react';

import s from './Textarea.module.scss';

interface Props extends TextareaHTMLAttributes<HTMLTextAreaElement> {}

export const Textarea = forwardRef<HTMLTextAreaElement, Props>((props, ref) => {
	return <textarea ref={ref} className={s.textarea} {...props} />;
});

Textarea.displayName = 'Textarea';
