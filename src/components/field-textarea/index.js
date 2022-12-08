import React, {Component} from "react";

export default class FieldTextarea extends Component {

    render() {
        return (
            <React.Fragment>
                <textarea
                    rows={(this.props.rows ? this.props.rows : 4)}
                    className={this.props.addClass + (this.props.errorMessage ? " is-invalid" : "")}
                    onChange={(event) => {
                        this.props.onChange(this.props.name, event.target.value);
                    }}
                    name={this.props.name}
                    value={this.props.value}
                    placeholder={this.props.placeholder}
                    disabled={this.props.disabled}
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