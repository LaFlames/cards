import React from 'react';
import { NavLink } from 'react-router-dom'
import { PATH } from '../Routes';
import './header.scss'

export const Header = () => {
    return (
        <div className="header">
            <nav>
                <ul className={"header_linkList"}>
                    <li>
                        <NavLink to={PATH.LOGIN} className={"header_linkList-item"} activeClassName={"header_linkList-activeItem"}>Login</NavLink>
                    </li>
                    <li>
                        <NavLink to={PATH.REGISTRATION} className={"header_linkList-item"} activeClassName={"header_linkList-activeItem"}>Registration</NavLink>
                    </li>
                    <li>
                        <NavLink to={PATH.PROFILE} className={"header_linkList-item"} activeClassName={"header_linkList-activeItem"}>Profile</NavLink>
                    </li>
                    <li>
                        <NavLink to={PATH.PASSWORD_RECOVERY} className={"header_linkList-item"} activeClassName={"header_linkList-activeItem"}>Password recovery</NavLink>
                    </li>
                    <li>
                        <NavLink to={PATH.ENTER_NEW_PASSWORD} className={"header_linkList-item"} activeClassName={"header_linkList-activeItem"}>Enter new password</NavLink>
                    </li>
                </ul>
            </nav>
        </div>
    )
}


