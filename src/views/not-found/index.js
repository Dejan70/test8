import React, {Component} from "react";
import PublicLayout from "../../components/layout";
import {Link} from "react-router-dom";
import connect from "react-redux/es/connect/connect";

class NotFoundView extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const {translate} = this.props;

        return (
            <PublicLayout {...this.props}>
                <div>
                    <h3>{translate("page.404.heading_main")}</h3>
                    <p>{translate("page.404.body")}</p>
                    <Link to={`/home`}>{translate("btn.back_to_home")}</Link>
                </div>
            </PublicLayout>
        );
    }
}


export default connect(state => state)(NotFoundView);