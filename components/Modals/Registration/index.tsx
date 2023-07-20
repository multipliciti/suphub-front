'use client';
import s from './Registration.module.scss';
import { LayoutModal } from '../layout';
import { setModal } from '@/redux/slices/modal';
import { useAppDispatch } from '@/redux/hooks';
import { classNames } from '@/utils/classNames';
import { SubmitHandler, useForm } from 'react-hook-form';

interface FormType {
	email: string;
	password: string;
	firstName: string;
	lastName: string;
}

export const Registration = () => {
	const dispatch = useAppDispatch();

	const {
		register,
		handleSubmit,
		formState: { errors },
		getValues,
	} = useForm({
		defaultValues: { email: '', password: '', firstName: '', lastName: '' },
		mode: 'onChange',
	});

	const onSubmit: SubmitHandler<FormType> = (data) => {
		console.log('data', data);
	};

	const onError = () => {
		console.log('error');
	};

	return (
		<LayoutModal>
			<div className={s.description}>
				<h1 className={s.title}>Create a personal account</h1>
				<p className={s.subtitle}>
					Already have an account? <span className={s.subtitle_login}>Login</span>
				</p>
			</div>
			<form onSubmit={handleSubmit(onSubmit, onError)}></form>
			<div className={s.names}>
				<div className={s.names_wrapper}>
					<p className={s.title}>First name</p>
					<label className={s.names_label} htmlFor="firstName">
						<input
							{...register('firstName', {
								required: 'required',
							})}
							placeholder="Enter first name"
							className={s.names_input}
							type="text"
							id="firstName"
						/>
					</label>
				</div>

				<div className={s.names_wrapper}>
					<p className={s.title}>Last name</p>
					<label className={s.names_label} htmlFor="lastName">
						<input
							{...register('lastName', {
								required: 'required',
							})}
							placeholder="Enter last name"
							className={s.names_input}
							type="text"
							id="lastName"
						/>
					</label>
				</div>
			</div>
		</LayoutModal>
	);
};
