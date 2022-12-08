import React from "react";

export default (props) => (
    <div className={`action-container ${props.addClass}`}>
        <div className="action-loader"><img className="loading-img" src="/images/loader/LoaderBigNew.gif"
                                            alt="loading"/></div>
    </div>
)