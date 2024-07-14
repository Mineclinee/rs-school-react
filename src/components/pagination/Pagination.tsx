import React from 'react';

type PaginationProps = {
  currentPage: number;
  totalCount: number;
  onPageChange: (page: number) => void;
};

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalCount,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalCount / 10);
  const maxVisiblePages = 10;

  const handleClick = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const getVisiblePages = () => {
    let startPage = Math.max(currentPage - Math.floor(maxVisiblePages / 2), 1);
    const endPage = Math.min(startPage + maxVisiblePages - 1, totalPages);

    if (endPage - startPage < maxVisiblePages - 1) {
      startPage = Math.max(endPage - maxVisiblePages + 1, 1);
    }

    const pages = [];
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <div className="app__pagination">
      <button
        className="app__pagination--previous btn-reset primary-btn primary-btn--sm"
        onClick={() => handleClick(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      {getVisiblePages().map((page) => (
        <button
          key={page}
          onClick={() => handleClick(page)}
          className={
            currentPage === page
              ? 'btn-reset app__pagination-item app__pagination-item--active'
              : 'btn-reset app__pagination-item'
          }
        >
          {page}
        </button>
      ))}
      <button
        className="app__pagination--next btn-reset primary-btn primary-btn--sm"
        onClick={() => handleClick(currentPage + 1)}
        disabled={currentPage === totalPages || totalCount === 0}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
