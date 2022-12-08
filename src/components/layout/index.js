import React, {Component} from "react";
import LocalStorage from "../../util/localStorage";
import {logoutClear} from "../../data/actions/user";

export default class PublicLayout extends Component {

    constructor(props) {
        super(props);
        this.state = {
            logout: false
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.user.logout) {
            return {logout: true};
        } else {
            return null;
        }
    }

    componentDidUpdate() {
        if (this.state.logout) {
            LocalStorage.clearAllExcept([
                'username'
            ]);
            LocalStorage.remove('user');
            this.props.dispatch(logoutClear());
            this.props.history.push("/login");
        }
    }

    render() {
        return (
            <React.Fragment>
                {this.props.children}
            </React.Fragment>
        )
    }
}