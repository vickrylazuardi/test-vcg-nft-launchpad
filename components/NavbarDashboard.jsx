import LeftNavbar from "./LeftNavbar";
import MidNavbar from "./MidNavbar";
import RightNavbar from "./RightNavbar";
import TopNavbar from "./TopNavbar";
import BottomNavMobile from "./BottomNavMobile";

export default function Navbar() {
  return (
    <div id="navbar-container" className="fixed top-0 right-0 left-0 z-50">
      <nav>
        <TopNavbar />
        <div className="bottom-nav-container">
          <div className="container-wrapper  flex items-center justify-between">
            <LeftNavbar />
            <MidNavbar />
            <RightNavbar />
          </div>
        </div>
        <div className="bottom-action-container hidden lg:block">
          <BottomNavMobile />
        </div>
      </nav>
    </div>
  );
}
