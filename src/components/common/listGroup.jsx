import React from 'react';

const ListGroup = (props) => {
  const { items, textProperty, valueProperty } = props;

  //map genre item to each <li>
  return (
    <ul className="list-group">
      {items.map((item) => (
        <li key={item[valueProperty]} className="list-group-item">
          {item[textProperty]}
        </li>
      ))}
    </ul>
  );
};

export default ListGroup;
