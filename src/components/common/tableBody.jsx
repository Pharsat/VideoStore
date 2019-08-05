import React, { Component } from "react";
import TableDetail from "./tableDetail";
class TableBody extends Component {
  render() {
    const { data, columns, onDelete, onLike } = this.props;
    return (
      <tbody>
        {data.map((item, index) => (
          <TableDetail
            key={index}
            item={item}
            columns={columns}
            onDelete={onDelete}
            onLike={onLike}
          />
        ))}
      </tbody>
    );
  }
}

export default TableBody;
