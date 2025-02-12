import { usePagination } from "@webeetle/react-headless-hooks";
import './Paginator.css'
import { KeyboardArrowLeft, KeyboardArrowRight, KeyboardDoubleArrowLeft, KeyboardDoubleArrowRight } from "@mui/icons-material";
import { useEffect } from "react";

interface Props {
  numPages: number,
  activePage: number,
  setCurrentPage: (pageNum: number) => void;
}

export default function Paginator({numPages = 5, activePage = 1, setCurrentPage}: Props) {

  const {
    currentPage,
    goToPage,
    isFirstPage,
    isLastPage,
    canGoToPrevPage,
    canGoToNextPage,
    triggerGoToPrevPage,
    triggerGoToNextPage,
    triggerGoToFirstPage,
    triggerGoToLastPage
  } = usePagination({ numPages, activePage });

  useEffect(() => {
    setCurrentPage(currentPage)
  }, [currentPage, setCurrentPage])

  const pageItems = [];
  pageItems.push(
    <li key={"first"} className={`page-item navigation ${isFirstPage && "disabled"}`} {...triggerGoToFirstPage}>
        <KeyboardDoubleArrowLeft />
        First
    </li>
  );
  pageItems.push(
    <li key={"prev"} className={`page-item navigation ${canGoToPrevPage || "disabled"}`} {...triggerGoToPrevPage}>
        <KeyboardArrowLeft />
        Previous
    </li>
  );
  for (let i = 1; i <= numPages; i++) {
    pageItems.push(
      <li key={i} className={`page-item ${currentPage === i ? "active" : ""}`} onClick={() => goToPage(i)}>
          {i}
      </li>
    );
  }
  pageItems.push(
    <li key={"next"} className={`page-item navigation ${canGoToNextPage || "disabled"}`} {...triggerGoToNextPage}>
        Next
        <KeyboardArrowRight />
    </li>
  );
  pageItems.push(
    <li key={"last"} className={`page-item navigation ${isLastPage && "disabled"}`}  {...triggerGoToLastPage}>
        Last
        <KeyboardDoubleArrowRight />
    </li>
  );

  return (
    <div className="paginator-container">
      <div className="paginator-content">
        {pageItems}
      </div>
    </div>
  );
}