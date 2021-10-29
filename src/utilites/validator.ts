export const eMailValidation = (eMailValue: string) => {
    let error = false
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(eMailValue)) error = true
    if (eMailValue === '') error = false
    return error
}

export const passWordValidation = (passWordValue: string) => {
    const maxLength = 15
    const minLength = 8
    let error = false
    if (passWordValue.length < minLength || passWordValue.length > maxLength) error = true
    if (passWordValue === '') error = false
    return error
}

export const confirmPwValidation = (confirmedPassWordValue: string) => {
    const maxLength = 15
    const minLength = 8
    let error = false
    if (confirmedPassWordValue.length < minLength || confirmedPassWordValue.length > maxLength) error = true
    if (confirmedPassWordValue === '') error = false
    return error
}


