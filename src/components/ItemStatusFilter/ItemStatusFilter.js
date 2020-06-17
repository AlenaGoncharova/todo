import React, { Component } from 'react';

import './ItemStatusFilter.css';

export default class ItemStatusFilter extends Component {

  state = {
    filterBy: 'all',  
  };

  buttons = [
    { name: 'all', label: 'All' },
    { name: 'active', label: 'Active' },
    { name: 'done', label: 'Done' },
  ];

  render() {
    const { filterBy, onFilterChange } = this.props;

    const buttons = this.buttons.map(({ name, label }) => {
      const isActive = filterBy === name;
      return (
        <button 
          type="button"
          className={`btn ${isActive ? 'btn-info' : 'btn-outline-secondary'}`}
          onClick={() => onFilterChange(name)}
          key={name}
        >
          {label}
        </button>
      );
    });

    return (
      <div className="btn-group">
        {buttons}
      </div>
    );
  }
}