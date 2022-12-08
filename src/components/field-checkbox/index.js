import React, {Component} from "react";

export default class FieldCheckbox extends Component {

    render() {
        return (
            <React.Fragment>
                <input type={"checkbox"}
                       name={this.props.name}
                       checked={!!this.props.value && (this.props.value !== "0")}
                       onChange={(event) => {
                           this.props.onChange(this.props.name, !!event.target.checked);
                       }}
                       disabled={this.props.disabled}
                />
                {this.props.errorMessage && (
                    <div className="field-error-text">
                        <img src="/images/forms/Error.png" alt="error icon" title={`${this.props.errorMessage}`}/>
                    </div>
                )}
            </React.Fragment>
        )
    }
}