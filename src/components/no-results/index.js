import React from "react";

export default function (props) {

    return (
        <div className={"no-result-label " + props.addClass}>{props.text}</div>
    )
}