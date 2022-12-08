import React, {Component} from "react";
import Layout from "../../components/layout";
import connect from "react-redux/es/connect/connect";
import {Link} from "react-router-dom";
import LoaderSmall from "../../components/loader-small";
import {Field, FieldsManager} from "../../data/services/fields";
import {register} from "../../data/actions/user";
import Button from "../../components/button/index";
import FieldText from "../../components/field-text/index";

class RegisterView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            fields: {
                user_email: new Field('user_email', '', ['empty'])
            }
        };
    }

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
        this.setState({no_match: false, fields: FieldsManager.validateFields(this.state.fields)}, () => {
            if (FieldsManager.checkFieldsForErrors(this.state.fields)) {
                this.props.dispatch(register({
                    params: FieldsManager.getFieldKeyValues(this.state.fields)
                }));
            }
        });
    };

    render() {
        const {translate} = this.props;

        return (
            <Layout {...this.props}>
                <h1>{translate("text.register")}</h1>

                {!this.props.user.isLoading && !this.props.user.register && (
                    <form onKeyPress={this.submitForm}>
                        <div className="block-margin-bottom-10">
                            <FieldText
                                onChange={this.handleInputChange} {...this.state.fields.user_email}
                                placeholder={"email@domain.com"} type={"email"}/>
                        </div>

                        <div className="block-margin-bottom-10">
                            <Button
                                onClick={this.submit}
                                text={translate("btn.register")}/>
                        </div>
                    </form>
                )}

                {this.props.user.isLoading && (
                    <LoaderSmall/>
                )}

                {this.props.user.register && (
                    <React.Fragment>
                        <div>{translate("text.register_success")}</div>
                        <Link to={`/login`}>{translate("btn.back_to_login")}</Link>
                    </React.Fragment>
                )}

                {this.props.user.error && (
                    <span>{translate(this.props.user.errorMessage)}</span>
                )}
            </Layout>
        );
    }
}

export default connect(state => state)(RegisterView);