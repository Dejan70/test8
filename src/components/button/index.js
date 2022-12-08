import React, {Component} from "react";

export default class Button extends Component {

    render() {
        return (
            <React.Fragment>
                <div className={this.props.className + (!!this.props.disabled ? " disabled" : "")} onClick={() => {
                    !this.props.disabled && this.props.onClick();
                }}
                >
                    {this.props.text}
                </div>
            </React.Fragment>
        )
    }
}