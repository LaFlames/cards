import React from "react";
import s from './PasswordRecovery.module.scss'

export const SuccessfulMessage = () => {
  return (
    <div className={s.mainBlock}>
      
        <h2 className={s.successfulMessage}>Success!<br />Click the link in the message in your email</h2>
      
    </div>
  )
}