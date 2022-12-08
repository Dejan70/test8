import React, {Component} from "react";
import {connect} from "react-redux";
import PublicLayout from "../../components/layout";
import LoaderSmall from "../../components/loader-small";
import LocalStorage from "../../util/localStorage";
import {getProp} from "../../util/util";
import Logout from "../../components/logout/index";

class HomeView extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
    }

    render() {
        const {translate, history, dispatch} = this.props;

        return (
            <PublicLayout {...this.props}>
                <h1>{translate("text.dashboard")}</h1>

                <div className="link-wrapper">
                    <Logout history={history} translate={translate} dispatch={dispatch}/>
                </div>
            </PublicLayout>
        );
    }
}

export default connect(state => state)(HomeView);