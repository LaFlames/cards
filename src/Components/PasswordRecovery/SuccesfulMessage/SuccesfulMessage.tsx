import React from "react";
import s from '../PasswordRecovery.module.scss'
import mail from './mail.svg'

type SuccessfulMessagePropsType = {
    email: string
}

export const SuccessfulMessage = (props: SuccessfulMessagePropsType) => {
  return (
    <div className={s.successfulMessageBlock}>
        <img src={mail} alt="mail"/>
        <h2 className={s.title}>Success!<br /></h2>
        <p className={s.descr}>
            We’ve sent an email with instructions to {props.email}
        </p>
      
    </div>
  )
}