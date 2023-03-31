import Navbar from "../Navbar";
import Footer from "../Footer";

export default function LayoutNoFooterWMR({ children }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>

      <div className="block md:hidden">
        <Footer />
      </div>
    </>
  );
}
