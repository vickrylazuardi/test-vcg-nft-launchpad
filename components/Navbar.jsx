import LeftNavbar from "./LeftNavbar";
import MidNavbar from "./MidNavbar";
import RightNavbar from "./RightNavbar";
import TopNavbar from "./TopNavbar";
import { isDesktop } from "react-device-detect";

export default function Navbar() {
  return (
    <div id="navbar-container" className="fixed top-0 right-0 left-0 z-50">
      <nav>
        {isDesktop && <TopNavbar />}
        <div className="bottom-nav-container">
          <div className="container-wrapper  flex items-center justify-between">
            <LeftNavbar />
            <MidNavbar />
            <RightNavbar />
          </div>
        </div>
      </nav>
    </div>
  );
}
