import React, { Component } from 'react';

import AppHeader from '../AppHeader';
import TodoList from '../TodoList';
import SearchPanel from '../SearchPanel';
import ItemStatusFilter from '../ItemStatusFilter';
import ItemAddForm from '../ItemAddForm';

import './App.css';

export default class App extends Component {

  maxId = 100;

  state = {
    todoData: [
      this.createTodoItem('Drink Coffee'),
      this.createTodoItem('Make Awesome App'),
      this.createTodoItem('Have a lunch'),
    ],
    term: '',
  }

  createTodoItem(label) {
    return {
      label,
      important: false,
      done: false,
      id: this.maxId += 1,
    }
  }

  deleteItem = (id) => {
    this.setState(({ todoData }) => {
      const newTodoData = todoData.filter((item) => item.id !== id);
      return {
        todoData: newTodoData,
      }
    });
  };

  addItem = (text) => {
    const newItem = this.createTodoItem(text);

    this.setState(({ todoData }) => {
      const newTodoData = [...todoData, newItem];
      return {
        todoData: newTodoData,
      }
    });
  };

  toggleProperty = (arr, id, propName) => {
    const idx = arr.findIndex((el) => el.id === id);

    const oldItem = arr[idx];
    const newItem = {...oldItem, [propName]: !oldItem[propName]};

    return [...arr.slice(0, idx), newItem, ...arr.slice(idx + 1)];
  };

  onToggleImportant = (id) => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProperty(todoData, id, 'important'),
      }
    });
  };

  onToggleDone = (id) => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProperty(todoData, id, 'done'),
      }
    });
  };

  onSearchChange = (term) => {
    this.setState({ term });
  }

  search = (items, term) => {
    if (term.length === 0) {
      return items;
    }

    return items.filter(({ label }) => label.toLowerCase().includes(term.toLowerCase()));
  };

  render() {
    const { todoData, term } = this.state;
    const visibleItems = this.search(todoData, term);
    const doneCount = todoData.filter((item) => item.done).length;
    const todoCount = todoData.length - doneCount;

    return (
      <div className="todo-app">
        <AppHeader toDo={todoCount} done={doneCount} />
        <div className="top-panel d-flex">
          <SearchPanel onSearchChange={this.onSearchChange}/>
          <ItemStatusFilter />
        </div>
  
        <TodoList
          todos={visibleItems}
          onDeleted={ this.deleteItem}
          onToggleImportant={this.onToggleImportant}
          onToggleDone={this.onToggleDone}
        />
        
        <ItemAddForm onItemAdded={this.addItem}/>
      </div>
    );
  }
};