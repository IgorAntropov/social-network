import {
	Button,
	Checkbox,
	FormControlLabel,
	TextField,
	Typography,
} from '@mui/material'
import React from 'react'
import {
	Controller,
	SubmitHandler,
	useForm,
	useFormState,
} from 'react-hook-form'
import { PasswordInput } from '../../../components/inputs/password-input'
import '../auth-page.scss'
import { emailValidation, passwordValidation } from '../validation.ts'
import './auth-form.scss'

interface IAuthForm {
	email: string
	password: string
	rememberMe: boolean
}

interface IAuthFormProps {
	handleSwitchForm: (formType: string) => void
}

export const AuthForm: React.FC<IAuthFormProps> = props => {
	const { handleSubmit, control } = useForm<IAuthForm>()

	const { errors } = useFormState({ control })

	const onSubmit: SubmitHandler<IAuthForm> = authData => console.log(authData)

	return (
		<div className='auth-form form'>
			<form className='data-form' onSubmit={handleSubmit(onSubmit)}>
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

				<div className='forgot-password-container'>
					<Controller
						control={control}
						name='rememberMe'
						defaultValue={false}
						render={({ field }) => (
							<FormControlLabel
								label='Запомнить меня'
								className='remember-checkbox'
								control={<Checkbox onChange={event => field.onChange(event)} />}
							/>
						)}
					/>

					<Typography
						variant='body2'
						component='span'
						mb={0}
						gutterBottom={true}
						className='forgot-password-btn'
						onClick={() => console.log('Redirect on forgot password page')}
					>
						Забыли пароль?
					</Typography>
				</div>

				<Button
					type='submit'
					variant='contained'
					fullWidth={true}
					disableElevation={true}
				>
					Войти
				</Button>
			</form>

			<div className='registration-container'>
				<Typography variant='body2' component='span' mb={0} gutterBottom={true}>
					Нет профиля?
				</Typography>

				<Typography
					variant='body2'
					component='span'
					mb={0}
					gutterBottom={true}
					className='registration-btn'
					onClick={() => props.handleSwitchForm('registration')}
				>
					Зарегистрируйтесь!
				</Typography>
			</div>
		</div>
	)
}
