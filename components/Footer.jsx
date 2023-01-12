import React from "react";
import FooterBottom from "./FooterBottom";
import FooterTop from "./FooterTop";
export default function Footer() {
  return (
    <footer className="pb-2 md:pb-20">
      <div className="container">
        <FooterTop />
        <FooterBottom />
      </div>
    </footer>
  );
}
