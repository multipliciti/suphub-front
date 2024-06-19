import React, { useEffect, useRef, useState } from 'react';
import { classNames } from '@/utils/classNames';
import Image from 'next/image';
import deleteInviteIcon from '@/imgs/Suppliers/Modal/delete.svg';
import sendIcon from '@/imgs/Suppliers/Modal/send.svg';
import s from './InviteSuppliersSection.module.scss';

const regexEmail = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;

const defaultInputForm = {
	email: '',
	error: '',
	submitFailureEncountered: false,
};

export function InviteSuppliersSection() {
	const [inputForm, setInputForm] = useState(defaultInputForm);
	const [emails, setEmails] = useState<string[]>([]);

	const handleChangeCurrentEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInputForm((prev) => ({ ...prev, email: e.target.value }));
	};

	const verifyEmail = () => {
		return inputForm.email && inputForm.email.match(regexEmail);
	};

	const isEmailValid = () => {
		if (!inputForm.submitFailureEncountered) return true;
		else return verifyEmail();
	};

	const handleShowError = (text: string) => {
		setInputForm((prev) => ({
			...prev,
			submitFailureEncountered: true,
			error: text,
		}));
		setTimeout(() => setInputForm((prev) => ({ ...prev, error: '' })), 1500);
	};

	const handleAddEmail = () => {
		if (verifyEmail()) {
			if (emails.includes(inputForm.email)) {
				handleShowError('Already added!');
			} else {
				setEmails([...emails, inputForm.email]);
				setInputForm(defaultInputForm);
			}
		} else {
			handleShowError('Invalid email!');
		}
	};

	const handleEnterKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			e.preventDefault();
			handleAddEmail();
		}
	};

	const handleDeleteEmail = (index: number) => {
		const newEmails = emails.filter((_, i) => i !== index);
		setEmails(newEmails);
	};

	const handleSendInvites = () => {
		setInputForm(defaultInputForm);
		setEmails([]);
		return null;
	};

	const inputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		inputRef.current?.focus();
	}, []);

	return (
		<div className={s.content}>
			<div className={s.content_input_group}>
				<div className={s.content_input_wrapper}>
					<input
						ref={inputRef}
						type="email"
						className={classNames(
							s.content_input,
							!isEmailValid() && s.content_input_invalid
						)}
						placeholder="Invite by email"
						value={inputForm.email}
						onChange={handleChangeCurrentEmail}
						onKeyDown={handleEnterKeyDown}
					/>
					<button className={s.content_input_button} onClick={handleAddEmail}>
						Add
					</button>
				</div>
				<span className={s.content_input_error}>{inputForm.error}</span>
			</div>
			<div className={s.invite_group}>
				<div className={s.invite_section}>
					{emails.length > 0 ? (
						emails.map((email, index) => (
							<div key={index} className={s.invite}>
								<span className={s.invite_text}>{email}</span>
								<Image
									className={s.invite_image}
									onClick={() => handleDeleteEmail(index)}
									src={deleteInviteIcon}
									alt="delete email"
								/>
							</div>
						))
					) : (
						<div className={s.invite_text}></div>
					)}
				</div>
				<button
					className={s.invite_button}
					disabled={!emails.length}
					onClick={handleSendInvites}
				>
					<span className={s.invite_button_text}>Send Invites</span>
					<Image
						className={s.invite_button_image}
						src={sendIcon}
						alt="send invite"
					/>
				</button>
			</div>
		</div>
	);
}
