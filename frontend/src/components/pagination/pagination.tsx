/* eslint-disable jsx-a11y/anchor-is-valid */
import { useCallback } from 'react';
import classNames from 'classnames';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const handlePageClick = useCallback((page: number, evt: React.MouseEvent) => {
    evt.preventDefault();
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      onPageChange(page);
    }
  }, [currentPage, totalPages, onPageChange]);

  const renderPageNumbers = () => {
    const pages = [];

    // Всегда показываем первую страницу, если она не активна
    if (currentPage !== 1) {
      pages.push(
        <li key={1} className="pagination__page">
          <a
            className="link pagination__page-link"
            href="#"
            onClick={(evt) => handlePageClick(1, evt)}
          >
            1
          </a>
        </li>
      );
    }

    // Показываем предыдущую страницу, если она не первая
    if (currentPage > 2) {
      pages.push(
        <li key={currentPage - 1} className="pagination__page">
          <a
            className="link pagination__page-link"
            href="#"
            onClick={(evt) => handlePageClick(currentPage - 1, evt)}
          >
            {currentPage - 1}
          </a>
        </li>
      );
    }

    // Активная страница
    pages.push(
      <li key={currentPage} className="pagination__page pagination__page--active">
        <a
          className="link pagination__page-link"
          href="#"
          aria-current="page"
        >
          {currentPage}
        </a>
      </li>
    );

    // Показываем следующую страницу, если она не последняя
    if (currentPage < totalPages - 1) {
      pages.push(
        <li key={currentPage + 1} className="pagination__page">
          <a
            className="link pagination__page-link"
            href="#"
            onClick={(evt) => handlePageClick(currentPage + 1, evt)}
          >
            {currentPage + 1}
          </a>
        </li>
      );
    }

    // Всегда показываем последнюю страницу, если она не активна
    if (currentPage !== totalPages && totalPages > 1) {
      pages.push(
        <li key={totalPages} className="pagination__page">
          <a
            className="link pagination__page-link"
            href="#"
            onClick={(evt) => handlePageClick(totalPages, evt)}
          >
            {totalPages}
          </a>
        </li>
      );
    }

    return pages;
  };

  const prevButtonClass = classNames('pagination__page', {
    'pagination__page--prev': true,
    'hidden': currentPage === 1
  });

  const nextButtonClass = classNames('pagination__page', {
    'pagination__page--next': true,
    'hidden': currentPage === totalPages
  });

  return (
    <div className="pagination">
      <ul className="pagination__list">
        <li className={prevButtonClass}>
          <a
            className="link pagination__page-link"
            href="#"
            onClick={(e) => handlePageClick(currentPage - 1, e)}
          >
            Назад
          </a>
        </li>

        {renderPageNumbers()}

        <li className={nextButtonClass}>
          <a
            className="link pagination__page-link"
            href="#"
            onClick={(evt) => handlePageClick(currentPage + 1, evt)}
          >
            Далее
          </a>
        </li>
      </ul>
    </div>
  );
}
