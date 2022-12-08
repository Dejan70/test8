import React from "react";

export default function (props) {
    let list = [];
    let pagesNum = Math.ceil(props.count / props.limit);
    let buttonLimit = (props.paginationButtonLimit) ? props.paginationButtonLimit : 3;

    for (let i = 0; i < (props.count / props.limit); ++i) {

        list.push((

            <li className={"page-item " + (((i * props.limit) === props.offset) ? "active-element " : (i > (props.paginationPage - buttonLimit - 2) && i < (props.paginationPage + buttonLimit) ? "" : "display-none"))}
                onClick={() => {
                    props.updateOffset(i * props.limit, i + 1);
                }}>
                <span className="page-link">
                    {(i + 1)}
                </span>
            </li>

        ));
    }

    return (
        <React.Fragment>
            <ul className={"pagination " + (props.addClass ? props.addClass : "justify-content-end")}>
                {(!props.hidePrevNext && props.paginationPage > 1 &&
                    <li className="page-item"
                        onClick={() => (props.paginationPage > 1) ? props.updateOffset((props.paginationPage - 2) * props.limit, props.paginationPage - 1) : ""}>
                        <a className="page-link" href="#" aria-label="Previous">
                            <span aria-hidden="true">«</span>
                            <span className="sr-only">Previous</span>
                        </a>
                    </li>
                )}

                {list}

                {(!props.hidePrevNext && props.paginationPage < pagesNum &&
                    <li className="page-item"
                        onClick={() => props.updateOffset((props.paginationPage) * props.limit, props.paginationPage + 1)}>
                        <a className="page-link" href="#" aria-label="Next">
                            <span aria-hidden="true">»</span>
                            <span className="sr-only">Next</span>
                        </a>
                    </li>
                )}

                {!props.hideCaption && (
                <div className="pagination-text">
                    {(props.count > 0 &&
                        <React.Fragment>
                            {props.offset + 1}
                            - {(props.paginationPage === pagesNum) ? props.count : (props.offset + props.limit)}
                            of&nbsp;
                        </React.Fragment>
                    )}
                    {props.count} items
                </div>
                )}
            </ul>
        </React.Fragment>
    )
}