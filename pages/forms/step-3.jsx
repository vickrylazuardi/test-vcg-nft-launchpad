import React, { useState } from "react";
import Table1 from "./step3-table-1";
import Table2 from "./step3-table-2";
import Table3 from "./step3-table-3";
import Table4 from "./step3-table-4";

export default function Step3(props) {
  
  return (
    <div className="">
      <p className="text-lg font-bold">Project Detail</p>
      <div className="mt-4 py-3 flex" style={{ overflowX: "auto" }}>
        <button
          style={{ padding: "10px 30px", whiteSpace: "nowrap" }}
          className={`btn ${
            props.selected == 1 ? "btn-orange-light" : "btn-gray"
          } text-sm mr-3`}
          onClick={() => props.setSelected(1)}
        >
          Team Member
        </button>
        {/* <button
          style={{ padding: "10px 30px", whiteSpace: "nowrap" }}
          className={`btn ${
            props.selected == 2 ? "btn-orange-light" : "btn-gray"
          } text-sm mr-3`}
          onClick={() => props.setSelected(2)}
        >
          Features
        </button> */}
        <button
          style={{ padding: "10px 30px", whiteSpace: "nowrap" }}
          className={`btn ${
            props.selected == 3 ? "btn-orange-light" : "btn-gray"
          } text-sm mr-3`}
          onClick={() => props.setSelected(3)}
        >
          Items & Boxes
        </button>
      </div>
      <div className="mt-10 py-3" style={{ overflowX: "auto" }}>
        {props.selected == 1 && <Table1 list={props.list} setList={props.setList} />}
        {/* {props.selected == 2 && <Table2 list={props.list} setList={props.setList} />} */}
        {props.selected == 3 && (
          <>
            <div>
              <p
                style={{ color: "#9AA4BF" }}
                className="text-sm font-semibold mb-4"
              >
                Items
              </p>
              <Table3 list={props.list} setList={props.setList} />
            </div>
            <div className="mt-10">
              <p
                style={{ color: "#9AA4BF" }}
                className="text-sm font-semibold mb-4"
              >
                Boxes
              </p>
              <Table4 list={props.list} setList={props.setList} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
