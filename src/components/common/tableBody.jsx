import React, { Component } from 'react';
import _ from 'lodash';

class TableBody extends Component {
  //if item in column has a content property (like or delete button), render it by running the function (content is a function that takes a movie item), otherwise if content is not a property (such as genre or title) then render the property of the current item
  renderCell = (item, column) => {
    if (column.content) return column.content(item);
    return _.get(item, column.path);
  };

  createKey = (item, column) => {
    return item._id + (column.path || column.key);
  };

  render() {
    const { data, columns } = this.props;
    //returning the body of the table
    return (
      <tbody>
        {data.map((item) => (
          <tr key={item._id}>
            {columns.map((column) => (
              <td key={this.createKey(item, column)}>
                {this.renderCell(item, column)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    );
  }
}

export default TableBody;
