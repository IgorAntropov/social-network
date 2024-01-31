import { Visibility, VisibilityOff } from '@mui/icons-material'
import { IconButton, InputAdornment, TextField } from '@mui/material'
import React from 'react'

interface IPasswordInput {
	errors?: {
		password?: {
			message?: string
		}
	}
	field: {
		onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
	}
}

interface IEndAdornment {
	showPassword: boolean
	setShowPassword: (show: boolean) => void
}

export const PasswordInput: React.FC<IPasswordInput> = ({ errors, field }) => {
	const [showPassword, setShowPassword] = React.useState(true)

	const EndAdornment: React.FC<IEndAdornment> = ({
		showPassword,
		setShowPassword,
	}) => {
		return (
			<InputAdornment position='end'>
				<IconButton onClick={() => setShowPassword(!showPassword)}>
					{showPassword ? (
						<VisibilityOff className='icon' />
					) : (
						<Visibility className='icon' />
					)}
				</IconButton>
			</InputAdornment>
		)
	}

	return (
		<TextField
			label='Пароль'
			size='small'
			margin='none'
			type={showPassword ? 'password' : 'text'}
			fullWidth={true}
			helperText={errors?.password?.message}
			error={!!errors?.password?.message}
			className='input'
			onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
				field.onChange(event)
			}
			InputProps={{
				endAdornment: (
					<EndAdornment
						showPassword={showPassword}
						setShowPassword={setShowPassword}
					/>
				),
			}}
		/>
	)
}
