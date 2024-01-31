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
import './auth-form.scss'
import { loginValidation, passwordValidation } from './validation'

interface IAuthForm {
	login: string
	password: string
	rememberMe: boolean
}

export const AuthForm: React.FC = () => {
	const { handleSubmit, control } = useForm<IAuthForm>()

	const { errors } = useFormState({ control })

	const onSubmit: SubmitHandler<IAuthForm> = authData => console.log(authData)

	return (
		<div className='auth-form'>
			<img alt='Logo' src='./sn.svg' className='logo' />

			<div className='title-container'>
				<Typography
					variant='h3'
					component='span'
					mb={0}
					gutterBottom={true}
					className='title'
				>
					CommunityCore
				</Typography>

				<Typography
					variant='subtitle1'
					component='span'
					mb={0}
					gutterBottom={true}
					className='subtitle'
				>
					Будь в центре своего мира!
				</Typography>
			</div>

			<form className='form' onSubmit={handleSubmit(onSubmit)}>
				<Controller
					control={control}
					name='login'
					rules={loginValidation}
					render={({ field }) => (
						<TextField
							label='Логин'
							size='small'
							margin='none'
							type='text'
							fullWidth={true}
							helperText={errors.login?.message}
							error={!!errors.login?.message}
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
						<PasswordInput errors={errors} field={field} />
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
					onClick={() => console.log('Redirect on registration page')}
				>
					Зарегистрируйтесь!
				</Typography>
			</div>
		</div>
	)
}
