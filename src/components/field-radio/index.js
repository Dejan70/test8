import React, {Component} from "react";

export default class FieldRadio extends Component {

    render() {

        return (
            <React.Fragment>
                <input type={"radio"}
                       onChange={(event) => {
                           this.props.onChange(this.props.name, event.target.value);
                       }}
                       checked={!!this.props.value}
                       name={this.props.name}
                       value={!!this.props.value}

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