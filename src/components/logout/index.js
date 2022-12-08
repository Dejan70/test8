import React, {Component} from "react";
import {Link} from "react-router-dom";
import {logout} from "../../data/actions/user";

export default class Logout extends Component {

    render() {
        return (
            <React.Fragment>
                <Link title={this.props.title} className={this.props.addClass} onClick={() => {
                    this.props.dispatch(logout({}));
                }}>
                    {this.props.translate("app.logout")}
                </Link>
            </React.Fragment>
        )
    }
}