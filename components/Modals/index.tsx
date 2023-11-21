'use client';
import s from './Modals.module.scss';
import { useAppSelector } from '@/redux/hooks';
import { Login } from './Login';
import { ForgotPassword } from './ForgotPassword';
import { CheckEmail } from './ CheckEmail';
import { Registration } from './Registration';
import { classNames } from '@/utils/classNames';
import { VerifyEmail } from './VerifyEmail';
import { AddToRFQCart } from '@/components/Modals/AddToRFQCart';
import { EditPassword } from '@/components/Modals/EditPassword';
import { PasswordChanged } from '@/components/Modals/EditPassword/PasswordChanged';
import { SubmitForReview } from '@/components/Modals/SubmitForReview';
import { ShowPhoto } from './ShowPhoto';
import { RequestManuallyRFQ } from './RequestManuallyRFQ';
import { SubmitedRFQ } from './SubmitedRFQ';
import { BulkUploadRFQ } from './BulkUploadRFQ';
import { CreateBusinessAccount } from '@/components/Modals/CreateBusinessAccount';
import { BusinessVerification } from '@/components/Modals/SellerVerification/BusinessVerification';
import { DepositSetUp } from '@/components/Modals/SellerVerification/DepositSetUp';
import { MembershipFee } from '@/components/Modals/SellerVerification/MembershipFee';
import { SellerAddNewProduct } from './StorefrontAddProduct/AddNewProduct';
import { SellerProductBulkUpload } from './StorefrontAddProduct/BulkUpload';
import { SellerProductUploadImage } from './StorefrontAddProduct/UploadImage';
import { DeleteProject } from '@/components/Modals/Projects/DeleteProject';

export const Modal = () => {
	const modal = useAppSelector((state) => state.modalSlice.modal);

	return (
		<>
			<div className={classNames(s.wrapper, modal === 'login' && s.wrapper_active)}>
				{modal === 'login' && <Login />}
			</div>

			<div
				className={classNames(
					s.wrapper,
					modal === 'forgotPassword' && s.wrapper_active
				)}
			>
				{modal === 'forgotPassword' && <ForgotPassword />}
			</div>

			<div
				className={classNames(s.wrapper, modal === 'checkEmail' && s.wrapper_active)}
			>
				{modal === 'checkEmail' && <CheckEmail />}
			</div>

			<div
				className={classNames(
					s.wrapper,
					modal === 'registration' && s.wrapper_active
				)}
			>
				<div className={s.modal}>{modal === 'registration' && <Registration />}</div>
			</div>

			<div
				className={classNames(
					s.wrapper,
					modal === 'verifyEmail' && s.wrapper_active
				)}
			>
				{modal === 'verifyEmail' && <VerifyEmail />}
			</div>

			<div
				className={classNames(
					s.wrapper,
					modal === 'addToRFQCart' && s.wrapper_active
				)}
			>
				<AddToRFQCart />
			</div>
			<div
				className={classNames(
					s.wrapper,
					modal === 'editPassword' && s.wrapper_active
				)}
			>
				<EditPassword />
				{modal === 'addToRFQCart' && <AddToRFQCart />}
			</div>

			<div
				className={classNames(s.wrapper, modal === 'showPhoto' && s.wrapper_active)}
			>
				{modal === 'showPhoto' && <ShowPhoto />}
			</div>

			<div
				className={classNames(
					s.wrapper,
					modal === 'passwordChanged' && s.wrapper_active
				)}
			>
				{modal === 'passwordChanged' && <PasswordChanged />}
			</div>

			<div
				className={classNames(
					s.wrapper,
					modal === 'submitForReview' && s.wrapper_active
				)}
			>
				{modal === 'submitForReview' && <SubmitForReview />}
			</div>

			<div
				className={classNames(
					s.wrapper,
					modal === 'addRequestManually' && s.wrapper_active
				)}
			>
				{modal === 'addRequestManually' && <RequestManuallyRFQ />}
			</div>

			<div
				className={classNames(
					s.wrapper,
					modal === 'submitedRFQ' && s.wrapper_active
				)}
			>
				{modal === 'submitedRFQ' && <SubmitedRFQ />}
			</div>

			<div
				className={classNames(s.wrapper, modal === 'bulkUpload' && s.wrapper_active)}
			>
				{modal === 'bulkUpload' && <BulkUploadRFQ />}
			</div>

			<div
				className={classNames(
					s.wrapper,
					modal === 'createBusinessAccount' && s.wrapper_active
				)}
			>
				{modal === 'createBusinessAccount' && <CreateBusinessAccount />}
			</div>

			<div
				className={classNames(
					s.wrapper,
					modal === 'sellerVerificationBusinessVerification' && s.wrapper_active
				)}
			>
				{modal === 'sellerVerificationBusinessVerification' && (
					<BusinessVerification />
				)}
			</div>
			<div
				className={classNames(
					s.wrapper,
					modal === 'sellerVerificationMembershipFee' && s.wrapper_active
				)}
			>
				{modal === 'sellerVerificationMembershipFee' && <MembershipFee />}
			</div>
			<div
				className={classNames(
					s.wrapper,
					modal === 'sellerVerificationDepositSetUp' && s.wrapper_active
				)}
			>
				{modal === 'sellerVerificationDepositSetUp' && <DepositSetUp />}
			</div>

			<div
				className={classNames(
					s.wrapper,
					modal === 'sellerAddNewProduct' && s.wrapper_active
				)}
			>
				{modal === 'sellerAddNewProduct' && <SellerAddNewProduct />}
			</div>

			<div
				className={classNames(
					s.wrapper,
					modal === 'sellerProductBulkUpload' && s.wrapper_active
				)}
			>
				{modal === 'sellerProductBulkUpload' && <SellerProductBulkUpload />}
			</div>

			<div
				className={classNames(
					s.wrapper,
					modal === 'sellerProductUploadImage' && s.wrapper_active
				)}
			>
				{modal === 'sellerProductUploadImage' && <SellerProductUploadImage />}
			</div>

			<div
				className={classNames(
					s.wrapper,
					modal === 'deleteProject' && s.wrapper_active
				)}
			>
				{modal === 'deleteProject' && <DeleteProject />}
			</div>
		</>
	);
};
