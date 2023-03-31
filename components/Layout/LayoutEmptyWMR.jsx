import Navbar from "../Navbar";
import Footer from "../Footer";

export default function LayoutEmptyWMR({ children }) {
  return (
    <>
      <Navbar noneBtmNav={true}/>
      <main>{children}</main>

      <div className="block md:hidden">
        <Footer />
      </div>
    </>
  );
}
