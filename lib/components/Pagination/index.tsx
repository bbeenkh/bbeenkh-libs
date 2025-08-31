/**
 * @file: pagination/index.tsx
 * @author: chad / chad@imnotpizzalib.com
 * @since: 2024.02.13 ~
 * @description: page indicator 컴포넌트
 */

import { useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';

import {
  AnglesLeftSolid,
  ChevronLeftSolid,
  ChevronRightSolid,
  AnglesRightSolid,
} from '../Icons';

interface IPagination {
  className?: string;
  totalItems: number;
  displayPages: number;
  pageCount: number;
  setPage: (page: number) => void;
}

/**
 * Pagination Component
 * @param {string} className css class
 * @param {number} totalItems 총 아이템(게시글) 수
 * @param {number} displayPages 한 페이지에 보여줄 아이템(게시글) 수
 * @param {number} pageCount 표시할 페이지 버튼 수
 * @param {function} setPage 현재 선택 된 페이지 emit (page: number) => void;
 */
export default function Pagination({
  className,
  totalItems = 1,
  displayPages = 10,
  pageCount = 5,
  setPage,
}: IPagination) {
  const [currentPage, setCurrentPage] = useState<number>(1);

  const totalDisplayPages = Math.ceil(totalItems / displayPages);

  /** 페이지 점프 */
  const jumpPageCount = (calcOption: 'prev' | 'next') => {
    const calcPageCount =
      calcOption === 'next'
        ? currentPage + pageCount - 1
        : currentPage - pageCount - 1;

    return Math.floor(calcPageCount / pageCount) * pageCount + 1;
  };

  /** 페이지 버튼 클릭 */
  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  /** 페이지 번호 버튼 생성 */
  const renderPageNumbers = () => {
    const pages = [];

    for (let page = 1; page <= totalDisplayPages; page++) {
      pages.push(
        <button
          key={page}
          aria-label={`pg-${page}`}
          className={twMerge(
            'ods-w-7 ods-h-7 ods-rounded-lg ods-text-title4',
            currentPage === page
              ? 'ods-bg-primary ods-text-gray-100'
              : 'ods-text-black',
          )}
          disabled={currentPage === page}
          onClick={() => onPageChange(page)}
        >
          <span className="ods-leading-6">{page}</span>
        </button>,
      );
    }

    return pages;
  };

  /** 페이지 갯수 시작/끝에 맞춰 랜더링 */
  const renderPagination = () => {
    const startPage = Math.floor((currentPage - 1) / pageCount) * pageCount + 1;
    const endPage = Math.min(totalDisplayPages, startPage + (pageCount - 1));

    return <>{renderPageNumbers().slice(startPage - 1, endPage)}</>;
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [totalItems]);

  useEffect(() => {
    window.scrollTo(0, 0);
    setPage(currentPage);
  }, [currentPage]);

  return (
    <div
      className={twMerge(
        'ods-flex ods-justify-center ods-items-center ods-gap-xs',
        className,
      )}
    >
      {/* double prev 버튼 */}
      {totalDisplayPages > pageCount && (
        <button
          disabled={1 > jumpPageCount('prev')}
          onClick={() => setCurrentPage(jumpPageCount('prev'))}
          aria-label="pg-first"
        >
          <AnglesLeftSolid
            className={twMerge(
              1 > jumpPageCount('prev')
                ? 'ods-fill-gray-200'
                : 'ods-fill-caption ods-cursor-pointer',
            )}
          />
        </button>
      )}
      {/* prev 버튼 */}
      {totalDisplayPages > 1 && (
        <button
          aria-label="pg-prev"
          disabled={currentPage <= 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          <ChevronLeftSolid
            className={twMerge(
              currentPage <= 1
                ? 'ods-fill-gray-200'
                : 'ods-fill-caption ods-cursor-pointer',
            )}
          />
        </button>
      )}

      {/* page */}
      {renderPagination()}

      {/* prev 버튼 */}
      {totalDisplayPages > 1 && (
        <button
          aria-label="pg-next"
          disabled={currentPage >= totalDisplayPages}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          <ChevronRightSolid
            className={twMerge(
              currentPage >= totalDisplayPages
                ? 'ods-fill-gray-200'
                : 'ods-fill-caption ods-cursor-pointer',
            )}
          />
        </button>
      )}
      {/* double next 버튼 */}
      {totalDisplayPages > pageCount && (
        <button
          aria-label="pg-last"
          disabled={totalDisplayPages < jumpPageCount('next')}
          onClick={() => setCurrentPage(jumpPageCount('next'))}
        >
          <AnglesRightSolid
            className={twMerge(
              totalDisplayPages < jumpPageCount('next')
                ? 'ods-fill-gray-200'
                : 'ods-fill-caption ods-cursor-pointer',
            )}
          />
        </button>
      )}
    </div>
  );
}
