import * as React from 'react';
import {NavLink} from "react-router-dom";
import "./customNavLink.scss"

type CustomNavLinkPropsType = {
    to: string
    title: string
}

export const CustomNavLink: React.FC<CustomNavLinkPropsType> = ({to, title}) => {
    return (
        <NavLink to={to} className={"customNavLink"} activeClassName={"activeCustomNavLink"}>{title}</NavLink>
    );
};