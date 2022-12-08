import React, {Component} from "react";
import Layout from "../../components/layout";
import connect from "react-redux/es/connect/connect";
import {Link} from "react-router-dom";
import LoaderSmall from "../../components/loader-small";
import {Field, FieldsManager} from "../../data/services/fields";
import {resetPasswordConfirm} from "../../data/actions/user";
import FieldPassword from "../../components/field-password/index";
import Button from "../../components/button/index";

class ResetPasswordView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            no_match: false,
            fields: {
                password: new Field('password', '', ['empty']),
                password_confirm: new Field('password_confirm', '', ['empty']),
            },
            is_new: this.props.match.params && !!this.props.match.params.is_new
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

        const email = this.props.match.params && this.props.match.params.email;
        const token = this.props.match.params && this.props.match.params.token;
        this.setState({no_match: false, fields: FieldsManager.validateFields(this.state.fields)}, () => {
            if (FieldsManager.checkFieldsForErrors(this.state.fields)) {
                if (this.state.fields.password.value === this.state.fields.password_confirm.value) {
                    this.props.dispatch(resetPasswordConfirm({
                        username: email,
                        token: token,
                        password: this.state.fields.password.value
                    }))
                } else {
                    this.setState({
                        no_match: true
                    })
                }
            }
        })
    };

    render() {
        const {translate} = this.props;

        return (
            <Layout {...this.props}>

                <div>
                    <div>
                        {this.state.no_match && (
                            <div>{translate("reset_password.no_match")}</div>
                        )}

                        {!this.props.user.resetConfirm && (
                            <React.Fragment>
                                <section>
                                    <div>
                                        <div>
                                            <div className="col-lg-6 bg-light">
                                                <div className="ht-100v d-flex align-items-center justify-content-center">

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                            </React.Fragment>
                        )}

                        {this.props.user.resetConfirm && (
                            <section>
                                <form onKeyPress={this.submitForm}>
                                    <div>
                                        <div>
                                            <h3>{translate("text.choose_password")}</h3>
                                            <form>
                                                <FieldPassword
                                                    onChange={this.handleInputChange} {...this.state.fields.password}
                                                    addClass="form-control"
                                                    placeholder={translate("field.placeholder.new_password")}/>

                                                <FieldPassword
                                                    onChange={this.handleInputChange} {...this.state.fields.password_confirm}
                                                    addClass="form-control"
                                                    placeholder={translate("field.placeholder.password_confirm")}/>


                                                {!this.props.user.isLoading && (
                                                    <React.Fragment>
                                                        <Button className={"btn btn-primary btn-block"} onClick={this.submit}
                                                                text={this.state.is_new ? translate("btn.create_password") : translate("btn.reset_password")}/>
                                                        <br/>
                                                        <Link className="form-btn-submit link-like-element" to={`/login`}>{translate("btn.back_to_login")}</Link>
                                                    </React.Fragment>
                                                )}

                                                {this.props.user.isLoading && (
                                                    <LoaderSmall/>
                                                )}
                                            </form>

                                            {this.props.user.error && (
                                                <span>{translate(this.props.user.errorMessage)}</span>
                                            )}
                                        </div>
                                    </div>
                                </form>

                                <div>
                                    <div>{this.state.is_new ? translate("create_password.success") : translate("reset_password.success")}</div>
                                    <Link to={`/login`}>{translate("btn.back_to_login")}</Link>
                                </div>

                            </section>
                        )}
                    </div>
                </div>
            </Layout>
        );
    }
}

export default connect(state => state)(ResetPasswordView);