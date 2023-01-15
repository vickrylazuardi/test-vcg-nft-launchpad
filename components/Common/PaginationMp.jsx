import React from "react";
import {
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

export function PaginationMp(props) {
  return (
    <>
      {props.page.currentPage ? (
        <div className="text-center mt-8 mb-4">
          <div id="pagination-custom" className="flex justify-center">
            <ul className="pagination">
              {/* MIN BUTTON */}
              {props.page.currentPage > 1 ? (
                <li className="page-item">
                  <a
                    // className="page-item"
                    aria-label="First"
                    onClick={() => props.pageAction(1)}
                    style={{ fontSize: "12px" }}
                  >
                    <FaAngleDoubleLeft className="inline" />
                  </a>
                </li>
              ) : (
                <li className="page-item">
                  <a
                    style={{
                      color: "#464E62",
                      cursor: "default",
                      fontSize: "12px",
                    }}
                  >
                    <FaAngleDoubleLeft className="inline" />
                  </a>
                </li>
              )}
              {props.page.currentPage > 1 ? (
                <li className="page-item">
                  <a
                    aria-label="First"
                    onClick={() => props.pageAction(props.page.currentPage - 1)}
                    style={{ fontSize: "12px" }}
                  >
                    <FaChevronLeft className="inline" />
                  </a>
                </li>
              ) : (
                <li className="page-item">
                  <a
                    style={{
                      color: "#464E62",
                      cursor: "default",
                      fontSize: "12px",
                    }}
                  >
                    <FaChevronLeft className="inline" />
                  </a>
                </li>
              )}
              {/* END MIN BUTTON */}
              {props.page.listPage.map((item, idx) => {
                return item == props.page.currentPage ? (
                  <li className="page-item active" key={idx}>
                    <a>{item}</a>
                  </li>
                ) : (
                  <li className="page-item" key={idx}>
                    <a onClick={() => props.pageAction(item)}>{item}</a>
                  </li>
                );
              })}

              {/* MAX BUTTON */}
              {props.page.currentPage < props.page.maxPage ? (
                <li className="page-item">
                  <a
                    aria-label="First"
                    onClick={() => props.pageAction(props.page.currentPage + 1)}
                    style={{ fontSize: "12px" }}
                  >
                    <FaChevronRight className="inline" />
                  </a>
                </li>
              ) : (
                <li className="page-item">
                  <a
                    style={{
                      color: "#464E62",
                      cursor: "default",
                      fontSize: "12px",
                    }}
                  >
                    <FaChevronRight className="inline" />
                  </a>
                </li>
              )}

              {props.page.currentPage < props.page.maxPage ? (
                <li className="page-item">
                  <a
                    aria-label="Last"
                    style={{ fontSize: "12px" }}
                    onClick={() => props.pageAction(props.page.maxPage)}
                  >
                    <FaAngleDoubleRight className="inline" />
                  </a>
                </li>
              ) : (
                <li className="page-item">
                  <a
                    style={{
                      color: "#464E62",
                      cursor: "default",
                      fontSize: "12px",
                    }}
                  >
                    <FaAngleDoubleRight className="inline" />
                  </a>
                </li>
              )}
              {/* END MAX BUTTON */}
            </ul>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}
