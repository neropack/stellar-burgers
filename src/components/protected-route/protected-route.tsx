import React from "react";
import {useSelector} from '../../services/store';
import {getIsAuthChecked, getUser} from '../../services/slices/userSlice';
import {Navigate, useLocation} from "react-router-dom";
import { Preloader } from "@ui";

type TProtectedRouteProps = {
    onlyUnAuth?: boolean;
    component: React.JSX.Element;
}

const Protected = ({ onlyUnAuth = false, component}: TProtectedRouteProps): React.JSX.Element => {
    const user = useSelector(getUser);
    const isAuthChecked = useSelector(getIsAuthChecked);
    const location = useLocation();

    // url == "/profile", onlyUnAuth = false, user == null
    // url == "/login", from: "/profile", onlyUnAuth = true, user == null
    // url == "/login", from: "/profile", onlyUnAuth = true, user != null
    // url == "/profile", onlyUnAuth = false, user != null
    // url == "/profile", onlyUnAuth = false, user == null

    if (isAuthChecked) {
        return <Preloader />;
    }

    if (!onlyUnAuth && !user) {
        // for authorized user, but user is unauthorized
        return <Navigate to='/login' state={{ from: location }} />
    }

    if (onlyUnAuth && user) {
        // for unauthorized user, but user is authorized
        const { from } = location.state ?? { from: { pathname: "/" } };
        return <Navigate to={from} />;
    }

    // onlyUnAuth && !user for unauthorized and unauthorized
    // !onlyUnAuth && user for authorized and authorized

    return component;
}

export const OnlyAuth = Protected;
export const OnlyUnAuth = ({component}: {component: React.JSX.Element}): React.JSX.Element => (
    <Protected onlyUnAuth component={component} />
);