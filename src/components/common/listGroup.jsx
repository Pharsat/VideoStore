import React from "react";
const ListGroup = ({
  items,
  displayProp,
  valueProp,
  selectedItem,
  onItemSelect
}) => {
  return (
    <ul className="list-group">
      {items.map(item => (
        <li
          key={item[valueProp]}
          className={
            selectedItem && item[valueProp] === selectedItem[valueProp]
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
