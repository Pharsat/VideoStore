import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class TableHeader extends Component {
  raiseSort = path => {
    const sortColumn = { ...this.props.sortColumn };
    if (sortColumn.path === path) {
      sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
    } else {
      sortColumn.path = path;
      sortColumn.order = "asc";
    }
    this.props.onSort(sortColumn);
  };

  renderSortIcon = column => {
    const sortColumn = { ...this.props.sortColumn };
    if (column.path !== sortColumn.path) return null;
    if (sortColumn.order === "asc") {
      return (
        <FontAwesomeIcon
          size="sm"
          icon="sort-up"
          style={{ cursor: "pointer" }}
        />
      );
    } else {
      return (
        <FontAwesomeIcon
          size="sm"
          icon="sort-down"
          style={{ cursor: "pointer" }}
        />
      );
    }
  };

  render() {
    return (
      <thead>
        <tr>
          {this.props.columns.map(column => (
            <th
              key={column.path || column.key}
              onClick={() => this.raiseSort(column.path)}
              className="clickable"
            >
              {column.label} {this.renderSortIcon(column)}
            </th>
          ))}
        </tr>
      </thead>
    );
  }
}

export default TableHeader;
