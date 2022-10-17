import Link from "next/link";
import React from "react";

export default function Breadcrumb(props) {
  return (
    <div className="breadcrumb-vcg mb-5" aria-label="breadcrumb">
      <ol className="breadcrumb">
        <li className="breadcrumb-item">
          <Link href="/marketplace">
            <a>
              <img src="/images/icon-home.png" alt="icon home" />
            </a>
          </Link>
        </li>
        {props.list.map((item, idx) => {
          return (
            <li
              key={idx}
              className={
                props.list.length == idx + 1
                  ? "breadcrumb-item active"
                  : "breadcrumb-item"
              }
            >
              <Link href={item.link}>
                <a>{item.title}</a>
              </Link>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
