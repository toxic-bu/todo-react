import React, { Component } from "react";
import "./add-form.css";
export default class AddForm extends Component {
    state = { label: "" };

    onLabelChange = (event) => {
        this.setState({
            label: event.target.value,
        });
    };
    onSubmit = (event) => {
        event.preventDefault();
        this.props.onAdd(this.state.label);
        this.setState({ label: "" });
    };
    render() {
        return (
            <form className="add-form d-flex" onSubmit={this.onSubmit}>
                <input
                    type="text"
                    className="form-control"
                    placeholder="type to add"
                    onChange={this.onLabelChange}
                    value={this.state.label}
                ></input>
                <button className="btn btn-outline-secondary">Add Todo</button>
            </form>
        );
    }
}
