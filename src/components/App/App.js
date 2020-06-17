import React, { Component } from 'react';

import AppHeader from '../AppHeader';
import TodoList from '../TodoList';
import SearchPanel from '../SearchPanel';
import ItemStatusFilter from '../ItemStatusFilter';

import './App.css';

export default class App extends Component {

  state = {
    todoData: [
      { label: 'Drink Coffee', important: false, id: 1 },
      { label: 'Make Awesome App', important: true, id: 2 },
      { label: 'Have a lunch', important: false, id: 3 },
    ],
  }

  deleteItem = (id) => {
    this.setState(({ todoData }) => {
      const newTodoData = todoData.filter((item) => item.id !== id);
      return {
        todoData: newTodoData,
      }
    });
  }
  
  render() {
    const { todoData } = this.state;
    return (
      <div className="todo-app">
        <AppHeader toDo={1} done={3} />
        <div className="top-panel d-flex">
          <SearchPanel />
          <ItemStatusFilter />
        </div>
  
        <TodoList
          todos={todoData}
          onDeleted={ this.deleteItem} />
      </div>
    );
  }
};