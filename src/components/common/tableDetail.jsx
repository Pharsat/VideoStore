import React, { Component } from "react";
import _ from "lodash";

class TableDetail extends Component {
  renderCell = (item, column) => {
    if (column.content) return column.content(item);
    return _.get(item, column.path);
  };
  render() {
    const { item, columns } = this.props;
    return (
      <tr>
        {columns.map((column, index) => (
          <td key={index}>{this.renderCell(item, column)}</td>
        ))}
      </tr>
    );
  }
}

export default TableDetail;
