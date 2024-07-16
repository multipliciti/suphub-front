import React from 'react';
import {
	MessageProps,
	MessagesProps,
} from '@/components/Screens/Suppliers/Sidebar/type';
import Image from 'next/image';
import s from './MessagesSection.module.scss';
//imgs
import chatIcon from '@/imgs/Suppliers/chatIcon.svg';

function MessageSection({ messages }: MessagesProps) {
	return (
		<div className={s.message_wrapper}>
			{messages.length > 0 ? (
				messages.map((message, index) => <Message message={message} key={index} />)
			) : (
				<div className={s.message}>
					<span className={s.message_content}>
						This chat is empty. Be the first to say hello!
					</span>
				</div>
			)}
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
