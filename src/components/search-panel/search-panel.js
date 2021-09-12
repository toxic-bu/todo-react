import React, { Component } from "react";
import "./search-panel.css";

export default class SearchPanel extends Component {
    render() {
        return (
            <input
                type="text"
                className="form-control"
                placeholder="type for search"
                onChange={(event) => {
                    this.props.onSearch(event.target.value);
                }}
            ></input>
        );
    }
}
