import React, {Component} from "react";
import {connect} from "react-redux";
import Layout from "../../components/layout";
import {Field, FieldsManager} from "../../data/services/fields";
import FieldText from "../../components/field-text";
import FieldPassword from "../../components/field-password";
import Button from "../../components/button";
import {login, resetUserMessage} from "../../data/actions/user";
import {Link} from "react-router-dom";
import LoaderSmall from "../../components/loader-small";

class LoginView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            fields: {
                username: new Field('username', '', ['empty']),
                password: new Field('password', '', ['empty'])
            }
        };
    }

    componentDidMount() {
        this.props.dispatch(resetUserMessage());
    }

    componentDidUpdate = (prevProps, prevState) => {
        if ((prevProps.user.data === null) && (!!this.props.user.data)) {
            this.props.history.push("/");
        }
    };

    handleInputChange = (name, value) => {
        this.setState({fields: FieldsManager.updateField(this.state.fields, name, value)});
    };

    submitForm = (event) => {
        if (event.key === 'Enter') {
            this.submit(event);
        }
    };

    submit = (event) => {
        event && event.preventDefault();

        this.setState({fields: FieldsManager.validateFields(this.state.fields)}, () => {
            if (!this.state.fields.password.errorMessage && !this.state.fields.username.errorMessage) {
                this.props.dispatch(login({
                    username: this.state.fields.username.value,
                    password: this.state.fields.password.value
                }));
            }
        });
    };

    render() {
        const {translate} = this.props;

        return (
            <Layout {...this.props}>
                <form onKeyPress={this.submitForm}>
                    <h1>{translate("text.sign_in")}</h1>

                    <p>
                        {translate("text.please_login")}<Link to="/register">{translate("text.or_create_account")}</Link>
                    </p>

                    <form>
                        <div className="block-margin-bottom-10">
                            <FieldText
                                onChange={this.handleInputChange} {...this.state.fields.username}
                                placeholder={"email@domain.com"} type={"email"}
                                addClass={"form-control"}/>
                        </div>

                        <div className="block-margin-bottom-10">
                            <FieldPassword
                                onChange={this.handleInputChange} {...this.state.fields.password}
                                placeholder={"Enter your password"} addClass={"form-control"}/>
                        </div>

                        {!this.props.user.isLoading && (
                            <div className="block-margin-bottom-10">
                                <Button className="btn btn-primary btn-block"
                                        onClick={this.submit} text={translate("text.sign_in")}/>
                            </div>
                        )}

                        {this.props.user.isLoading && (
                            <LoaderSmall/>
                        )}
                    </form>

                    {this.props.user.error && (
                        <span>{translate(this.props.user.errorMessage)}</span>
                    )}
                </form>
            </Layout>
        );
    }
}

export default connect(state => state)(LoginView);