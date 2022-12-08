import React, {Component} from "react";

export default class FieldSelect extends Component {

    render() {
        const pairs = this.props.values ? this.props.values : {};

        let values = Object.keys(pairs).sort((a, b) => {
            return (pairs[a] == pairs[b]) ? 0 : ((pairs[a] > pairs[b]) ? 1 : -1);
        }).map((key, i) => (
            <option key={i} value={key}>{pairs[key]}</option>
        ));

        if (this.props.all) {
            values.unshift((
                <option key={-1} value={""}>{this.props.all}</option>
            ))
        } else if (!this.props.value || (this.props.value === 0) || (this.props.value === "0")) {
            values.unshift((
                <option key={-1} value={""}>select an option</option>
            ))
        }

        const selectStyle = {
            backgroundImage: "url('/images/icons/select-arrows.png')"
        };

        return (
            <React.Fragment>
                <select className={this.props.addClass + (this.props.errorMessage ? " is-invalid" : "")}
                        style={selectStyle}
                        disabled={this.props.disabled}
                        onChange={(event) => {
                            this.props.onChange(this.props.name, event.target.value);
                        }} name={this.props.name} value={this.props.value}>
                    {values}
                    {this.props.children}
                </select>
                {this.props.errorMessage && (
                    <div className={"invalid-feedback"}>
                        {this.props.errorLabelMessage ? this.props.errorLabelMessage : "Field required*"}
                    </div>
                )}
            </React.Fragment>
        )
    }
}