export interface Message {
	author: string;
	date: string;
	content: string;
	replies?: Object[];
}

export type MessagesProps = { messages: Message[] };

export type MessageProps = { message: Message };

export type SuppliersSidebarInputProps = {
	sendMessage: (message: Message) => void;
};
