import React, {Component} from "react";

export default class FieldText extends Component {

    render() {

        return (
            <React.Fragment>
                <input type={this.props.type}
                       onChange={(event) => {
                           this.props.onChange(this.props.name, event.target.value);
                       }}
                       name={this.props.name}
                       value={this.props.value}
                       placeholder={this.props.placeholder}
                       disabled={this.props.disabled}
                       className={this.props.addClass + (this.props.errorMessage ? " is-invalid" : "")}
                />
                {this.props.errorMessage && (
                    <div className={"invalid-feedback"}>
                        {this.props.errorLabelMessage ? this.props.errorLabelMessage : "Field required*"}
                    </div>
                )}
            </React.Fragment>
        )
    }
}