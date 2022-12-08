import React, {Component} from "react";
import {createBrowserHistory} from "history";
import {Redirect, Route as NeutralRoute, Router, Switch} from "react-router-dom";
import Login from "./views/login";
import ResetPassword from "./views/reset-password";
import HomeView from "./views/home";
import ResetPasswordConfirm from "./views/reset-password-confirm";
import LocalStorage from "./util/localStorage";
import NotFoundView from "./views/not-found";
import {hideModals} from "./data/actions/ui";
import RegisterView from "./views/register";

const PrivateRoute = ({component: Component, ...rest}) => (
    <NeutralRoute
        {...rest}
        render={props =>
            (!!LocalStorage.get('user')) ? (<Component {...props}/>) : (
                <Redirect to={{
                    pathname: "/login",
                    state: {from: props.location}
                }}/>
            )
        }
    />
);

const PublicRoute = ({component: Component, ...rest}) => (
    <NeutralRoute
        {...rest}
        render={props =>
            (!LocalStorage.get('user')) ? (<Component {...props}/>) : (
                <Redirect to={{
                    pathname: "/home",
                    state: {from: props.location}
                }}/>
            )
        }
    />
);

class RouterListener extends Component {

    constructor(props) {
        super(props);

        this.unlisten = null;
        this.state = { }
    }

    componentDidMount() {
        this.unlisten = this.props.history.listen((location, action) => {

        });
    }

    componentWillUnmount() {
        if (this.unlisten) {
            this.unlisten();
        }
    }

    render() {
        return (
            <React.Fragment>
                {this.props.children}
            </React.Fragment>
        );
    }
}

export default (store, translator) => {
    function getComponent(Component, props) {
        return (
            <Component {...props} translate={(key, args) => translator.translate(key, args)}/>
        );
    }

    const history = createBrowserHistory();
    store.history = history;

    return (
        <Router history={history}>
            <RouterListener history={history} dispatch={store.dispatch} {...store.getState()}
                            translate={(key, args) => translator.translate(key, args)}>
                <Switch>
                    <PublicRoute exact path="/" component={(props) => getComponent(Login, props)}/>
                    <PublicRoute exact path="/login" component={(props) => getComponent(Login, props)}/>

                    <PublicRoute exact path="/register" component={(props) => getComponent(RegisterView, props)}/>
                    <PublicRoute exact path="/reset-password" component={(props) => getComponent(ResetPassword, props)}/>
                    <NeutralRoute exact path="/reset-password-confirm/:email/:token/:is_new"
                                  component={(props) => getComponent(ResetPasswordConfirm, props)}/>

                    <PrivateRoute exact path="/home" component={(props) => getComponent(HomeView, props)}/>

                    <NeutralRoute component={(props) => getComponent(NotFoundView, props)}/>
                </Switch>
            </RouterListener>
        </Router>
    );
}