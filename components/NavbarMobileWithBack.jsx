import { useRouter } from "next/router";
import React from "react";
import { FaChevronLeft } from "react-icons/fa";
import { BiFilterAlt } from "react-icons/bi";

export default function NavbarMobileWithBack(props) {
  const router = useRouter();

  return (
    <>
      <div className="navbar-mobile-with-back hidden md:block">
        <div className="text-center relative" style={{ padding: "16px" }}>
          <FaChevronLeft
            className="absolute left-3 top-5"
            onClick={() => router.back()}
          />
          <p className="m-auto font-semibold">{props.title}</p>
        </div>
        {props.isFilterSort && (
          <div className="p-3 flex">
            <button
              className={`select-tab-orange default-grey mr-2 flex items-center`}
              onClick={() => {
                props.dispatch(
                  props.toggleModalFilterListProjectsWMR(
                    props.modalFilterListProjectsWMR
                  )
                );
              }}
            >
              <BiFilterAlt className="mr-1" /> Filter
            </button>
            <div className="overflow-scroll flex">
              {props.optionsSort.map((item, idx) => {
                return (
                  <button
                    key={idx}
                    className={`select-tab-orange default-grey mr-2 ${
                      props.sortSelected.value == item.value ? "active" : ""
                    }`}
                    onClick={() => props.onChangeSort(item)}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
