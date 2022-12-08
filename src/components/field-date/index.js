import React, {Component} from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {toBackDateTime} from "../../util/util";
import moment from "moment";

export default class FieldDate extends Component {

    render() {

        return (
            <React.Fragment>
                <DatePicker
                    selected={moment(this.props.value).isValid() ? moment(this.props.value).toDate() : null}
                    onChange={(date) => {
                        this.props.onChange(this.props.name, !!date ? toBackDateTime(date) : "");
                    }}
                    minDate={this.props.minDate ? moment(this.props.minDate).toDate() : null}
                    maxDate={this.props.maxDate ? moment(this.props.maxDate).toDate() : null}
                    disabled={this.props.disabled}
                    showTimeSelect={true}
                    timeFormat="h:mm aa"
                    dateFormat="MM/dd/yy h:mm aa"
                    timeIntervals={15}
                    timeCaption="time"
                    popperPlacement={this.props.placement ? this.props.placement : "bottom-start"}
                    className={"datepickerIcon " + this.props.addClass + (this.props.errorMessage ? " is-invalid" : "")}
                />
                {this.props.errorMessage && (
                    <div className={"invalid-feedback display-block"}>
                        {this.props.errorLabelMessage ? this.props.errorLabelMessage : "Field required*"}
                    </div>
                )}
            </React.Fragment>
        )
    }
}

