import React from "react";
const ListGroup = props => {
  const { items, displayProp, valueProp, selectedItem, onItemSelect } = props;

  return (
    <ul className="list-group">
      {items.map((item, index) => (
        <li
          key={index}
          className={
            item[valueProp] === selectedItem[valueProp]
              ? "list-group-item active"
              : "list-group-item"
          }
          onClick={() => onItemSelect(item)}
          style={{ cursor: "pointer" }}
        >
          {item[displayProp]}
        </li>
      ))}
    </ul>
  );
};

ListGroup.defaultProps = {
  displayProp: "name",
  valueProp: "_id"
};

export default ListGroup;
