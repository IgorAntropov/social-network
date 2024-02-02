import { Button, TextField } from '@mui/material'
import React from 'react'
import {
	Controller,
	SubmitHandler,
	useForm,
	useFormState,
} from 'react-hook-form'
import { PasswordInput } from '../../../components/inputs/password-input'
import {
	emailValidation,
	passwordConfirmValidation,
	passwordValidation,
} from '../validation'
import './reset-password.scss'

interface IResetPasswordLinkForm {
	email: string
}

interface IResetPasswordForm {
	password: string
	confirmPassword: string
}

interface IResetPasswordFormProps {
	handleSwitchForm: (formType: string) => void
}

export const ResetPasswordForm: React.FC<IResetPasswordFormProps> = props => {
	const [showResetContent, setResetContent] = React.useState(false)

	const resetPasswordLinkForm = useForm<IResetPasswordLinkForm>()

	const resetPasswordLinkState = useFormState({
		control: resetPasswordLinkForm.control,
	})

	const onSubmitLink: SubmitHandler<
		IResetPasswordLinkForm
	> = resetPasswordLinkData => {
		console.log(resetPasswordLinkData)
		setResetContent(true)
	}

	const resetPasswordForm = useForm<IResetPasswordForm>()

	const resetPasswordState = useFormState({
		control: resetPasswordForm.control,
	})

	const onSubmit: SubmitHandler<IResetPasswordForm> = resetPasswordData => {
		console.log(resetPasswordData)
		props.handleSwitchForm('auth')
	}

	return (
		<div className='reset-password-form form'>
			{!showResetContent && (
				<form
					className='data-form'
					onSubmit={resetPasswordLinkForm.handleSubmit(onSubmitLink)}
				>
					<Controller
						control={resetPasswordLinkForm.control}
						name='email'
						rules={emailValidation}
						render={({ field }) => (
							<TextField
								label='Email'
								size='small'
								margin='none'
								type='text'
								fullWidth={true}
								helperText={resetPasswordLinkState.errors.email?.message}
								error={!!resetPasswordLinkState.errors.email?.message}
								className='input'
								onChange={event => field.onChange(event)}
							/>
						)}
					/>

					<Button
						type='submit'
						variant='contained'
						fullWidth={true}
						disableElevation={true}
					>
						Отправить на почту
					</Button>
				</form>
			)}

			{showResetContent && (
				<form
					className='data-form'
					onSubmit={resetPasswordForm.handleSubmit(onSubmit)}
				>
					<Controller
						control={resetPasswordForm.control}
						name='password'
						rules={passwordValidation}
						render={({ field }) => (
							<PasswordInput
								errors={resetPasswordState.errors}
								field={field}
								label='Пароль'
							/>
						)}
					/>

					<Controller
						control={resetPasswordForm.control}
						name='confirmPassword'
						rules={passwordConfirmValidation(
							resetPasswordForm.getValues('password')
						)}
						render={({ field }) => (
							<PasswordInput
								errors={resetPasswordState.errors}
								field={field}
								label='Подтвердите пароль'
							/>
						)}
					/>

					<Button
						type='submit'
						variant='contained'
						fullWidth={true}
						disableElevation={true}
					>
						Сменить пароль
					</Button>
				</form>
			)}
		</div>
	)
}
