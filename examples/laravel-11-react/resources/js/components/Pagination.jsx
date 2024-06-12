import { useNonInitialEffect } from '@/tools/useNonInitialEffect';
import React, { useMemo } from 'react';
import useState from "react-usestateref";

export default ({
  pagination,
  hidePageInput = false,
  hidePerPageSelector = false,
  hidePageSelector = false,
  hideTotal = false,
  onPaginateTo,
}) => {
  const perPageOptions = [5, 10, 25, 50, 100, 200];
  const [perPage, setPerPage] = useState(pagination.meta.per_page);
  const [currentPage, setCurrentPage, currentPageRef] = useState(pagination.meta.current_page);
  const [currentPageInput, setCurrentPageInput, currentPageInputRef] = useState(pagination.meta.current_page);
  // const [pageInputTemp, setPageInputTemp, pageInputTempRef] = useState(pagination.meta.current_page);
  const pageRange = 1;


  const pages = useMemo(() => {
    const total = pagination.meta.last_page;
    let pagesArray = [];

    if (total <= 2 * pageRange + 1) {
      return Array.from({ length: total }, (_, i) => i + 1);
    } else {
      pagesArray.push(1);

      if (currentPage <= pageRange + 1) {
        pagesArray.push(...Array.from({ length: 2 * pageRange + 1 }, (_, i) => i + 2));
      } else if (currentPage > total - pageRange) {
        pagesArray.push(...Array.from({ length: 2 * pageRange + 1 }, (_, i) => total - 2 * pageRange + i));
      } else {
        pagesArray.push(...Array.from({ length: 2 * pageRange + 1 }, (_, i) => currentPage - pageRange + i));
      }

      if (!pagesArray.includes(total)) {
        pagesArray.push(total);
      }

      for (let i = 1; i < pagesArray.length; i++) {
        if (pagesArray[i] - pagesArray[i - 1] >= 2) {
          pagesArray.splice(i, 0, '...');
        }
      }

      return pagesArray;
    }
  }, [pagination.meta.last_page, currentPage, pageRange]);

  const paginateTo = () => {
    onPaginateTo({ page: currentPage, perPage });
  };

  const handleUpdatePerPage = (e) => {
    setPerPage(Number(e.target.value));
    setCurrentPage(1);
    paginateTo();
  };

  const onBlur = () => {
    let value = currentPageInputRef.current;

    if (value == currentPageRef.current) {
      return;
    }

    if(value > pagination.meta.last_page) {
      value = pagination.meta.last_page;
    }

    setCurrentPageInput(value);
    setCurrentPage(value);
  };

  useNonInitialEffect(() => {
    paginateTo();
  }, [perPage, currentPage]);

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center">
        {!hideTotal && (
          <label htmlFor="per-page-selector" className="mr-2">
            {`Total: ${pagination.meta.total}`}
          </label>
        )}
        {!hidePerPageSelector && !hideTotal && <span className="text-black/50 py-2 dark:text-white/50 mx-4">|</span>}
        {!hidePerPageSelector && (
          <>
            <label htmlFor="per-page-selector" className="mr-2">
              Per Page:
            </label>
            <select
              id="per-page-selector"
              value={perPage}
              onChange={handleUpdatePerPage}
              className="border border-gray-300 rounded px-3 py-2 pr-8"
            >
              {perPageOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </>
        )}
      </div>
      {!hidePageSelector && (
        <div className="flex items-center">
          <label htmlFor="page-selector" className="mr-2">
            Page:
          </label>
          <button
            onClick={() => setCurrentPage(1)}
            disabled={currentPage === 1}
            className="border border-gray-300 rounded px-3 py-2 cursor-pointer"
          >
            &lt;&lt;
          </button>
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="border border-gray-300 rounded px-3 py-2 mr-3 cursor-pointer"
          >
            &lt;
          </button>
          <ul className="flex list-none border border-gray-300 rounded overflow-hidden">
            {pages.map((page) => (
              <li
                key={page}
                className={`px-3 py-2 border-r last:border-r-0 ${page === currentPage ? 'bg-blue-500 text-white cursor-pointer' : 'text-gray-700 cursor-pointer'
                  }`}
                onClick={() => typeof page === 'number' && setCurrentPage(page)}
              >
                {typeof page === 'number' ? (
                  <button className="focus:outline-none w-full h-full">{page}</button>
                ) : (
                  <span>{page}</span>
                )}
              </li>
            ))}
          </ul>
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, pagination.meta.last_page))}
            disabled={currentPage === pagination.meta.last_page}
            className="border border-gray-300 rounded px-3 py-2 ml-3 cursor-pointer"
          >
            &gt;
          </button>
          <button
            onClick={() => setCurrentPage(pagination.meta.last_page)}
            disabled={currentPage === pagination.meta.last_page}
            className="border border-gray-300 rounded px-3 py-2 cursor-pointer"
          >
            &gt;&gt;
          </button>
          {!hidePageSelector && !hidePageInput && <span className="text-black/50 py-2 dark:text-white/50 mx-4">|</span>}
          {!hidePageInput && (
            <>
              <label htmlFor="current-page-input" className="mr-2">
                Current Page:
              </label>
              <input
                id="current-page-input"
                type="number"
                value={currentPageInput}
                onChange={(e) => setCurrentPageInput(e.target.value)}
                max={pagination.meta.last_page}
                onBlur={onBlur}
                className="border border-gray-300 w-24 rounded px-3 py-2 [&::-webkit-inner-spin-button]:appearance-none [appearance:textfield]"
              />
            </>
          )}
        </div>
      )}
    </div>
  );
};
