import React, { Component } from 'react';

import './SearchPanel.css';

export default class SearchPanel extends Component {

  state = {
    term: '',
  };

  onTermChange = (e) => {
    const term = e.target.value;
    this.setState({ term });
    this.props.onSearchChange(term);
  };

  render() {
    const { term } = this.state;
    return (
      <input
        type="text"
        className="form-control search-input"
        onChange={this.onTermChange}
        placeholder="type to search"
        value={term}
      />
    );
  }
};