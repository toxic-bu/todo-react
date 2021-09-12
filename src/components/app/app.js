import React, { Component } from "react";
import AppHeader from "../app-header";
import SearchPanel from "../search-panel";
import TodoList from "../todo-list";
import ItemStatusFilter from "../item-status-filter";
import AddForm from "../add-form";
import "./app.css";

export default class App extends Component {
    maxId = 100;
    filterOn = false;
    state = {
        todoData: [
            this.createTodoItem("Drink Coffee"),
            this.createTodoItem("Make Awesome App"),
            this.createTodoItem("Have a lunch"),
        ],
        filtered: [],
    };
    createTodoItem(label) {
        return {
            label,
            important: false,
            done: false,
            id: this.maxId++,
        };
    }

    addItem = (text) => {
        this.setState(({ todoData }) => {
            return {
                todoData: [...todoData, this.createTodoItem(text)],
            };
        });
    };
    deleteItem = (id) => {
        this.setState(({ todoData }) => {
            const idx = todoData.findIndex((el) => el.id === id);
            return {
                todoData: [...todoData.slice(0, idx), ...todoData.slice(idx + 1)],
            };
        });
    };

    toggleProperty(arr, id, propName) {
        const idx = arr.findIndex((el) => el.id === id);
        const newArray = [...arr];
        newArray[idx][propName] = !newArray[idx][propName];
        return newArray;
    }

    onToggleDone = (id) => {
        this.setState(({ todoData }) => {
            return {
                todoData: this.toggleProperty(todoData, id, "done"),
            };
        });
    };
    onToggleImportant = (id) => {
        this.setState(({ todoData }) => {
            return {
                todoData: this.toggleProperty(todoData, id, "important"),
            };
        });
    };
    onSearch = (text) => {
        this.filterOn = true;
        if (text.trim() === "") {
            this.filterOn = false;
        }
        this.setState((state) => {
            const newFiltered = state.todoData.filter((el) => el.label.toLowerCase().includes(text.toLowerCase()));
            return {
                filtered: newFiltered,
            };
        });
    };
    render() {
        const doneCount = this.state.todoData.filter((el) => el.done === true).length;
        const todoCount = this.state.todoData.length - doneCount;
        const items = this.filterOn ? this.state.filtered : this.state.todoData;
        return (
            <div className="todo">
                <AppHeader todo={todoCount} done={doneCount} />
                <div className="nav d-flex">
                    <SearchPanel onSearch={this.onSearch} />
                    <ItemStatusFilter />
                </div>
                <TodoList
                    todos={items}
                    onDeleted={this.deleteItem}
                    onToggleDone={this.onToggleDone}
                    onToggleImportant={this.onToggleImportant}
                />
                <AddForm onAdd={this.addItem} />
            </div>
        );
    }
}
