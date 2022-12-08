import React, {Component} from "react";
import PublicLayout from "../../components/layout";
import connect from "react-redux/es/connect/connect";
import {Link} from "react-router-dom";
import {Field, FieldsManager} from "../../data/services/fields";
import {resetPassword, resetUserMessage} from "../../data/actions/user";

class ResetPasswordView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            fields: {
                username: new Field('username', '', ['email', 'empty'])
            }
        };
    }

    componentDidMount() {
        this.props.dispatch(resetUserMessage());
    }

    handleInputChange = (name, value) => {
        this.setState({fields: FieldsManager.updateField(this.state.fields, name, value)});
    };

    submit = (event) => {
        event && event.preventDefault();

        this.setState({fields: FieldsManager.validateFields(this.state.fields)}, () => {
            if (!this.state.fields.username.errorMessage) {
                this.props.dispatch(resetPassword({
                    username: this.state.fields.username.value
                }))
            }
        })
    };

    render() {

        return (
            <PublicLayout {...this.props}>
                <div>
                    <div>
                        <div>
                            <h3>Forgot password</h3>
                            <p>
                                Enter your email to continue.
                                <br/>
                                Email needs to be valid and used before.
                            </p>

                            <div>
                                <label>Email address</label>
                                <input type="email" className="form-control" placeholder="email@domain.com"/>
                            </div>

                            <a href="">Reset password</a>
                            <div>
                                Sign in with another account? <Link to="/login" className="tx-semibold">Login</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </PublicLayout>
        );
    }
}

export default connect(state => state)(ResetPasswordView);