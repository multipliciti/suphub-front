'use client';
import {
	CSSProperties,
	FC,
	PropsWithChildren,
	useEffect,
	useRef,
	useState,
} from 'react';
import { createPortal } from 'react-dom';

import { classNames } from '@/utils/classNames';

import s from './ModalPortal.module.scss';

interface Props {
	style?: CSSProperties;
	isOpen: boolean;
	onHide: () => void;
}

export const ModalPortal: FC<PropsWithChildren<Props>> = ({
	children,
	style,
	isOpen,
	onHide,
}) => {
	const ref = useRef<Element | null>(null);
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		ref.current = document.querySelector<HTMLElement>('#root-modals');
		setMounted(true);
	}, []);

	return mounted && ref.current
		? createPortal(
				<div
					className={classNames(s.modal, isOpen && s.modal_active)}
					style={style}
					onClick={(e) => {
						if (e.target === e.currentTarget) {
							onHide();
						}
					}}
				>
					{isOpen && children}
				</div>,
				ref.current
		  )
		: null;
};
