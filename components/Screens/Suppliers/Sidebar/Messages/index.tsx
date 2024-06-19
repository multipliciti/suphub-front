import React from 'react';
import chatIcon from '@/imgs/Suppliers/chatIcon.svg';
import s from './MessagesSection.module.scss';
import Image from 'next/image';

interface Message {
	author: string;
	date: string;
	content: string;
	replies?: Object[];
}

type MessageProps = { message: Message };

const MESSAGES: Message[] = [
	{
		author: 'Mike',
		date: 'May 24, 2024',
		content: 'I have an update about this product @John Doe.',
	},
	{
		author: 'Hao',
		date: 'May 24, 2024',
		content: 'I have an update about this product.',
		replies: [{}, {}],
	},
];

function MessageSection() {
	return (
		<div className={s.message_wrapper}>
			{MESSAGES.map((message, index) => (
				<Message message={message} key={index} />
			))}
		</div>
	);
}

const Message = ({ message }: MessageProps) => {
	const { author, date, content } = message;

	return (
		<div className={s.message}>
			<div className={s.message_header}>
				<div className={s.message_header_content}>
					<span className={s.message_header_content_name}>{author}</span>
					<span className={s.message_header_content_date}>{date}</span>
				</div>
				<div className={s.message_header_info}>
					<Image className={s.message_header_info_icon} src={chatIcon} alt="chat" />
				</div>
			</div>
			<div className={s.message_content}>{content}</div>
		</div>
	);
};

export default MessageSection;
