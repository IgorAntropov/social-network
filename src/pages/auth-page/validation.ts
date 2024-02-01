const REQUIRED_FIELD = 'Обязательно для заполнения'

const EMAIL_REGEXP =
	/^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu

export const emailValidation = {
	required: REQUIRED_FIELD,
	validate: (value: string) => {
		if (value.match(/[а-яА-я]/)) {
			return 'Логин не может содержать русские буквы'
		}

		if (!EMAIL_REGEXP.test(value)) {
			return 'Логин должен быть в формате example@site.com'
		}

		return true
	},
}

export const passwordValidation = {
	required: REQUIRED_FIELD,
	validate: (value: string) => {
		if (value.length < 6) {
			return 'Пароль должен состоять минимум из 6-ти символов'
		}

		if (value.match(/[а-яА-я]/)) {
			return 'Пароль не может содержать русские буквы'
		}

		return true
	},
}

export const passwordConfirmValidation = (password: string) => ({
	required: REQUIRED_FIELD,
	validate: (value: string) => {
		if (value == password) {
			return true
		}

		return 'Введенные пароли не совпадают'
	},
})

export const emptyValidation = {
	required: REQUIRED_FIELD,
}
