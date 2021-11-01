import React from 'react';
import s from './Error404.module.css';

export const Error404 = () => {
    return (
        <div className={s.main}>
		    <div className={s.notfound}>
			    <div className={s.notfound_404}></div>
			    <h1>404</h1>
			    <h2>Oops! Page Not Be Found</h2>
			    <p>Sorry but the page you are looking for does not exist, have been removed, name changed or is temporarily unavailable.</p>
			    <a href="#">Back to homepage</a>
		    </div>
	    </div>
    )
}


