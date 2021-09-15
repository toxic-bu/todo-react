import React, { Component } from "react";
import AppHeader from "../app-header";
import SearchPanel from "../search-panel";
import TodoList from "../todo-list";
import ItemStatusFilter from "../item-status-filter";
import AddForm from "../add-form";
import "./app.css";

export default class App extends Component {
    maxId = 100;
    state = {
        todoData: [
            this.createTodoItem("Drink Coffee"),
            this.createTodoItem("Make Awesome App"),
            this.createTodoItem("Have a lunch"),
        ],
        filterBtns: [
            { btnLabel: "All", active: true, id: 1 },
            { btnLabel: "Active", active: false, id: 2 },
            { btnLabel: "Done", active: false, id: 3 },
        ],
        searchText: "",
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
        this.setState({ searchText: text });
    };
    onToggleBtn = (id) => {
        this.setState(({ filterBtns }) => {
            const btnToggled = filterBtns.map((el) =>
                el.id === id ? { ...el, active: true } : { ...el, active: false }
            );

            return {
                filterBtns: btnToggled,
            };
        });
    };
    search = (dataArray, str, btns) => {
        const btn = btns.findIndex((el) => el.active === true);
        let filtered = dataArray.filter((item) => item.label.toLowerCase().includes(str.toLowerCase()));
        if (btn === 1) {
            filtered = filtered.filter((el) => el.done === false);
        }
        if (btn === 2) {
            filtered = filtered.filter((el) => el.done === true);
        }

        return filtered;
    };

    render() {
        const { todoData, searchText, filterBtns } = this.state;
        const visibleItems = this.search(todoData, searchText, filterBtns);
        const doneCount = this.state.todoData.filter((el) => el.done === true).length;
        const todoCount = this.state.todoData.length - doneCount;
        return (
            <div className="todo">
                <AppHeader todo={todoCount} done={doneCount} />
                <div className="nav d-flex">
                    <SearchPanel onSearch={this.onSearch} />
                    <ItemStatusFilter btns={this.state.filterBtns} onToggleBtn={this.onToggleBtn} />
                </div>
                <TodoList
                    todos={visibleItems}
                    onDeleted={this.deleteItem}
                    onToggleDone={this.onToggleDone}
                    onToggleImportant={this.onToggleImportant}
                />
                <AddForm onAdd={this.addItem} />
            </div>
        );
    }
}
