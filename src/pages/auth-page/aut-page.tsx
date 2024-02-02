import { Typography } from '@mui/material'
import React from 'react'
import { AuthForm } from './auth-form'
import './auth-page.scss'
import { RegistrationForm } from './registration-form'
import { ResetPasswordForm } from './reset-password-form'

export const AuthPage: React.FC = () => {
	const [selectedForm, setSelectedForm] = React.useState('auth')

	const handleSwitchForm = (formType: string) => {
		setSelectedForm(formType)
	}

	const subTitle = (() => {
		switch (selectedForm) {
			case 'auth':
				return 'Будь в центре своего мира!'
			case 'registration':
				return 'Создание профиля'
			case 'resetPassword':
				return 'Восстановление пароля'
			default:
				return 'Будь в центре своего мира!'
		}
	})()

	return (
		<div className='auth-page'>
			<img
				alt='Logo'
				src='./sn.svg'
				className='logo'
				onClick={() => handleSwitchForm('auth')}
			/>

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
					{subTitle}
				</Typography>
			</div>

			{selectedForm === 'auth' && (
				<AuthForm handleSwitchForm={handleSwitchForm} />
			)}

			{selectedForm === 'registration' && <RegistrationForm />}

			{selectedForm === 'resetPassword' && (
				<ResetPasswordForm handleSwitchForm={handleSwitchForm} />
			)}
		</div>
	)
}
