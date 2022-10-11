import React from "react";

export function Pagination(props) {
  return (
    <>
      {
        props.page.currentPage ?
        <div className="col-12 text-center mt-4 mb-4">
          <div id="pagination-custom" aria-label="Page navigation example">
            <ul className="pagination">
              {
                props.page.currentPage > 1 ?
                <li className="page-item">
                  <a 
                    className="page-link" 
                    aria-label="First"
                    style={{cursor: "pointer"}}
                    onClick={() => props.pageAction(1)}
                  >
                    <span aria-hidden="true">«</span>
                  </a>
                </li> : 
                ""
              }
              {
                props.page.listPage.map((item) => {
                  return (
                    <li key={item} className="page-item">
                      {
                        item == props.page.currentPage ?
                        <a 
                          className="page-link"
                          style={{color: "aquamarine", borderColor: "aquamarine", cursor: "pointer"}}
                        >
                          {item}
                        </a> :
                        <a 
                          className="page-link"
                          style={{cursor: "pointer"}}
                          onClick={() => props.pageAction(item)}
                        >
                          {item}
                        </a>
                      }
                    </li>
                  )
                })
              }
              {
                props.page.currentPage < props.page.maxPage ?
                <li className="page-item">
                  <a 
                    className="page-link" 
                    aria-label="Last"
                    style={{cursor: "pointer"}}
                    onClick={() => props.pageAction(props.page.maxPage)}
                  >
                    <span aria-hidden="true">»</span>
                  </a>
                </li> :
                ""
              }
            </ul>
          </div>
        </div> :
        ""
      }
    </>
  )
};
