import React, { useState } from "react";
import { BsArrowLeftSquareFill, BsArrowRightSquareFill } from "react-icons/bs";

export const usePagination = (initalPage: number) => {
  const [page, setPage] = useState(initalPage);

  const onNextPage = () => setPage((current) => current + 1);
  const onPrevPage = () => setPage((current) => current - 1);

  const updatePage = (newPage: number) => setPage(newPage);

  return {
    page,
    onNextPage,
    onPrevPage,
    updatePage,
  };
};

interface IPagination {
  page: number;
  totalPages: number;
  onPreviousPageClick: () => void;
  onNextPageClick: () => void;
}

export const Pagination: React.FC<IPagination> = ({
  page,
  totalPages,
  onPreviousPageClick,
  onNextPageClick,
}) => {
  return (
    <div className=" text-center">
      <div className="inline-grid grid-cols-3 md:w-6/12  justify-center items-center mx-auto  mt-10 pb-5">
        <div>
          {page > 1 ? (
            <button
              onClick={onPreviousPageClick}
              className=" basis-1/3 focus:outline-none font-medium text-2xl"
            >
              <BsArrowLeftSquareFill />
            </button>
          ) : (
            <div></div>
          )}
        </div>
        <span className="basis-1/3">
          Page {page} of {totalPages}
        </span>
        <div>
          {page !== totalPages ? (
            <button
              onClick={onNextPageClick}
              className=" basis-1/3 focus:outline-none font-medium text-2xl"
            >
              <BsArrowRightSquareFill />
            </button>
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </div>
  );
};
