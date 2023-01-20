import { useRouter } from "next/router";
import React from "react";
import { FaChevronLeft } from "react-icons/fa";

export default function NavbarMobileWithBack(props) {
  const router = useRouter();

  return (
    <>
      <div className="navbar-mobile-with-back hidden md:block">
        <div className="text-center relative">
          <FaChevronLeft className="absolute left-0 top-1" onClick={() => router.back()} />
          <p className="m-auto font-semibold">{props.title}</p>
        </div>
      </div>
    </>
  );
}
