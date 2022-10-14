import React from "react";
import FooterBottom from "./FooterBottom";
import FooterTop from "./FooterTop";
export default function Footer() {
  return (
    <footer>
      <div className="container">
        <FooterTop />
        <FooterBottom />
      </div>
    </footer>
  );
}
