import React from 'react';
import { BrowserRouter, generatePath, Route, Switch } from "react-router-dom";
import AuthRoute from './Pages/Auth/AuthRoute';
import HomeRoute from './Pages/Home/HomeRoute';
import Home from './Pages/Home/Home';

const AppRoute = () => {
    return (
        <div>
            <BrowserRouter>
                <Switch>
                    {AuthRoute.map((route) => (
                        <Route path={route.path} component={route.component} key={route.path} />
                    ))}
                    {HomeRoute.map((route) => (
                        <Route path={route.path} component={route.component} key={route.path} />
                    ))}
                    <Route component={Home} />
                </Switch>
            </BrowserRouter>
        </div>
    );
}

export default AppRoute;
