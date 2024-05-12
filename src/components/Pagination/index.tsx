import React from 'react';
import ReactPaginate from 'react-paginate';
import styles from './pagination.module.scss';

type PaginationProps = {
  pageCount: number;
  onChangePage: (page: number) => void;
};

const Pagination: React.FC<PaginationProps> = ({ pageCount, onChangePage }) => {
  return (
    <ReactPaginate
      className={styles.root}
      breakLabel="..."
      nextLabel=">"
      onPageChange={(event: any) => {
        onChangePage(event.selected + 1);
        // console.log('event', event);
      }}
      pageRangeDisplayed={1}
      pageCount={3}
      forcePage={pageCount - 1}
      previousLabel="<"
      renderOnZeroPageCount={null}
    />
  );
};

export default Pagination;
