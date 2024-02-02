import { Button, Checkbox, FormControlLabel, TextField } from '@mui/material'
import React from 'react'
import {
	Controller,
	SubmitHandler,
	useForm,
	useFormState,
} from 'react-hook-form'
import { PasswordInput } from '../../../components/inputs/password-input'
import '../auth-page.scss'
import {
	emailValidation,
	emptyValidation,
	passwordConfirmValidation,
	passwordValidation,
} from '../validation'
import './registration-form.scss'

interface IRegistrationForm {
	userName: string
	email: string
	password: string
	confirmPassword: string
	acceptConditions: boolean
}

export const RegistrationForm: React.FC = () => {
	const { handleSubmit, control, getValues } = useForm<IRegistrationForm>()

	const { errors } = useFormState({ control })

	const onSubmit: SubmitHandler<IRegistrationForm> = registrationData =>
		console.log(registrationData)

	return (
		<div className='registration-form form'>
			<form className='data-form' onSubmit={handleSubmit(onSubmit)}>
				<Controller
					control={control}
					name='userName'
					rules={emptyValidation}
					render={({ field }) => (
						<TextField
							label='Имя пользователя'
							size='small'
							margin='none'
							type='text'
							fullWidth={true}
							helperText={errors.userName?.message}
							error={!!errors.userName?.message}
							className='input'
							onChange={event => field.onChange(event)}
						/>
					)}
				/>

				<Controller
					control={control}
					name='email'
					rules={emailValidation}
					render={({ field }) => (
						<TextField
							label='Email'
							size='small'
							margin='none'
							type='text'
							fullWidth={true}
							helperText={errors.email?.message}
							error={!!errors.email?.message}
							className='input'
							onChange={event => field.onChange(event)}
						/>
					)}
				/>

				<Controller
					control={control}
					name='password'
					rules={passwordValidation}
					render={({ field }) => (
						<PasswordInput errors={errors} field={field} label='Пароль' />
					)}
				/>

				<Controller
					control={control}
					name='confirmPassword'
					rules={passwordConfirmValidation(getValues('password'))}
					render={({ field }) => (
						<PasswordInput
							errors={errors}
							field={field}
							label='Подтвердите пароль'
						/>
					)}
				/>

				<Controller
					control={control}
					name='acceptConditions'
					defaultValue={true}
					render={({ field }) => (
						<FormControlLabel
							label='Согласие на обработку персональных данных'
							className='checkbox'
							control={
								<Checkbox
									defaultChecked={true}
									onChange={event => field.onChange(event)}
								/>
							}
						/>
					)}
				/>

				<Button
					type='submit'
					variant='contained'
					fullWidth={true}
					disableElevation={true}
				>
					Создать профиль
				</Button>
			</form>
		</div>
	)
}
