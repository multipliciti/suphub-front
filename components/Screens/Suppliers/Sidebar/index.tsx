import React, { useState } from 'react';
import { useAppSelector } from '@/redux/hooks';
import MessageSection from '@/components/Screens/Suppliers/Sidebar/Messages';
import SuppliersSidebarHeader from '@/components/Screens/Suppliers/Sidebar/Header';
import SuppliersSidebarInput from '@/components/Screens/Suppliers/Sidebar/Input';
import { classNames } from '@/utils/classNames';
import { getCompanyName } from '@/components/Screens/Suppliers/Table/SuppliersTable/helper';
import { Message } from './type';
import s from './SuppliersSidebar.module.scss';

function SuppliersSidebar() {
	const { sidebar, selectedSupplier } = useAppSelector(
		(state) => state.suppliersSidebar
	);
	const title = getCompanyName(selectedSupplier);

	const [messages, setMessages] = useState<Message[]>([]);
	//TODO implement real logic when backend is ready
	const sendMessage = (message: Message) => {
		setMessages((prev) => [...prev, message]);
	};

	return (
		<>
			<div className={classNames(s.wrapper, sidebar && s.wrapper_active)}>
				<SuppliersSidebarHeader title={title} />
				<div className={s.content}>
					<MessageSection messages={messages} />
					<SuppliersSidebarInput sendMessage={sendMessage} />
				</div>
			</div>
			<div className={classNames(sidebar && s.background)} />
		</>
	);
}

export default SuppliersSidebar;
