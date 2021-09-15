import React, { Component } from "react";
import "./item-status-filter.js";

export default class ItemStatusFilter extends Component {
    render() {
        const element = this.props.btns.map((item) => {
            const { btnLabel, active, id } = item;
            let classNames = "btn btn-outline-secondary";
            if (active) {
                classNames += " active";
            }
            return (
                <button key={id} className={classNames} onClick={() => this.props.onToggleBtn(id)}>
                    {btnLabel}
                </button>
            );
        });

        return <div className="btn-group">{element}</div>;
    }
}
