/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

const Pagination = (props) => {
  //refactoring out props
  const { itemsCount, pageSize, currentPage, onPageChange } = props;
  //calculating number of pages needed
  const pagesCount = Math.ceil(itemsCount / pageSize);
  //if only one page as rounded, don't show the page viewer at the bottom
  if (pagesCount === 1) return null;
  //lodash is used to generate an array with the page range and we will use this to map it to a list item
  const pages = _.range(1, pagesCount + 1);

  return (
    <nav>
      <ul className="pagination">
        {pages.map((page) => (
          <li
            key={page}
            //active page highlighter
            className={page === currentPage ? 'page-item active' : 'page-item'}
          >
            <a className="page-link" onClick={() => onPageChange(page)}>
              {page}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

//TypeChecking with PropTypes
//add props for each component and whether they are required with their respective types -- this helps catch errors related to types
Pagination.propTypes = {
  itemsCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired
};

export default Pagination;
